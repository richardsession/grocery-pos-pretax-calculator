'use strict';

/**
 * Buy one, get one special for products. Also applies a limit to the special.
 * E.g., Buy 2, get 1 for half off.
 * 
 * TODO: Make sure limit is evenly-divisible by (qtyNeeded + qtyDiscounted)
 */
export default class ProductRuleBogoSpecialStrategy
{
    constructor (qtyNeeded, qtyDiscounted, discount, limit = null) {
        this.checkValueIsPositive('quantity needed', qtyNeeded);
        this.checkValueIsPositive('discount quantity', qtyDiscounted);
        this.checkValueIsPositive('discount', discount);

        if(limit) {
            this.checkValueIsPositive('limit', limit);
        }

        this._qtyNeeded = qtyNeeded;
        this._qtyDiscounted = qtyDiscounted;
        this._discount = discount;
        this._limit = limit;
    }

    get qtyNeeded () {
        return this._qtyNeeded;
    }

    set qtyNeeded (qtyNeeded) {
        this.checkValueIsPositive('quantity needed', qtyNeeded);

        this._qtyNeeded = qtyNeeded
    }

    get qtyDiscounted () {
        return this._qtyDiscounted;
    }

    set gtyDiscounted (qtyDiscounted) {
        this.checkValueIsPositive('discount quantity', qtyDiscounted);

        this._qtyDiscounted = qtyDiscounted;
    }

    get discount () {
        return this._discount;
    }

    set discount(discount) {
        this.checkValueIsPositive('discount', discount);

        this._discount = discount;
    }

    get limit () {
        return this._limit;
    }

    set limit (limit) {
        this.checkValueIsPositive('limit', limit);

        this._limit = limit;
    }

    /**
     * Applies the special to the line item
     * 
     * @param ShoppingCartLineItem lineItem 
     * @returns number
     */
    apply (lineItem) {
        if(!this.qualifies(lineItem)) {
            throw new Error('Unable to apply the BOGO special on product: ' + lineItem.product.id);
        }
        
        const discountedItemsQty = this.getDiscountedItemsQty(lineItem);
        const fullPriceItemsQty = lineItem.quantity - discountedItemsQty;

        const discountedItemsPricing = this.getDiscountedItemsPricing(lineItem);
        const discountedItemsTotalPrice = discountedItemsPricing * discountedItemsQty;
        const fullPriceItemsTotalPrice = lineItem.product.price * fullPriceItemsQty;

        return discountedItemsTotalPrice + fullPriceItemsTotalPrice;
    }

    checkValueIsPositive (label, value) {
        if(value < 0) {
            throw new Error(label + ' cannot have a value less than 0');
        }
    }

    /**
     * Determines if the special should be applied
     * 
     * @param ShoppingCartLineItem lineItem 
     * @returns boolean
     */
    qualifies (lineItem) {
        return (lineItem.quantity > this.qtyNeeded);
    }

    /**
     * Calculates the number of items that should have the discount applied to them
     * 
     * @param ShoppingCartLineItem lineItem 
     * @return number
     */
    getDiscountedItemsQty (lineItem) {
        if(this.limit) {
            return this.limit / (this.qtyNeeded + this.qtyDiscounted);
        } 
        
        return Math.floor(lineItem.quantity / (this.qtyNeeded + this.qtyDiscounted));
    }

    /**
     * Calculates the discounted pricing for the items that should be discounted
     * 
     * @param ShoppingCartLineItem lineItem 
     * @returns number
     */
    getDiscountedItemsPricing (lineItem) {
        return lineItem.product.price - (lineItem.product.price * this.discount);
    }
}