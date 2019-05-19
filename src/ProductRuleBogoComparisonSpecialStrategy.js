'use strict';

/**
 * Buy one, get one of equal or lesser value special for weighted products
 * E.g., Buy 2 lbs, get 1 lb for half off.
 * 
 * Design Choice:
 * If the total quantity of the line item is between qtyNeeded and qtyNeeded + qtyDiscounted, then
 * apply the special. Otherwise, the line item does not qualify for the special.
 * 
 */
export default class ProductRuleBogoComparisoinSpecialStrategy
{
    constructor (qtyNeeded, qtyDiscounted, discount) {
        this.checkValueIsPositive('quantity needed', qtyNeeded);
        this.checkValueIsPositive('discount quantity', qtyDiscounted);
        this.checkValueIsPositive('discount', discount);

        this._qtyNeeded = qtyNeeded;
        this._qtyDiscounted = qtyDiscounted;
        this._discount = discount;
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

        const discountQty = lineItem.quantity - this.qtyNeeded;
        const discountTotal = discountQty * (lineItem.product.price - (lineItem.product.price * this.discount));
        const regularPriceTotal = lineItem.product.price * this.qtyNeeded;

        return discountTotal + regularPriceTotal;
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
        return this.qtyNeeded <= lineItem.quantity && lineItem.quantity <= (this.qtyNeeded + this.qtyDiscounted);
    }
}