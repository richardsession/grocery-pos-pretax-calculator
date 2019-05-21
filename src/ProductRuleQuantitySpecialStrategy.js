'use strict';

/**
 * Quantity special for products.
 * E.g., 3 for $5, 6 for $10, etc.
 */
export default class ProductRuleQuantitySpecialStrategy
{
    constructor (quantity, price, limit = null) {
        this.checkValueIsPositive('quantity', quantity);
        this.checkValueIsPositive('price', price);

        if(limit) {
            this.checkValueIsPositive('limit', limit);
        }

        this._quantity = quantity;
        this._price = price;
        this._limit = limit;
    }

    get quantity () {
        return this._quantity;
    }

    set quantity (quantity) {
        this._quantity = quantity;
    }

    get price () {
        return this._price;
    }

    set price (price) {
        this._price = price;
    }

    get limit () {
        return this._limit;
    }

    set limit (limit) {
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
            throw new Error('Unable to apply the quantity special for product: ' + lineItem.product.id);
        }

        const regularPricedItemsTotal = this.getRegularPricedItemsQty(lineItem) * lineItem.product.price;
        const salePricedItemsTotal = this.getNumSpecials(lineItem) * this.price;

        return regularPricedItemsTotal + salePricedItemsTotal;
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
        return (lineItem.quantity >= this.quantity);
    }

    /**
     * Calculates the quantity of items that should be computed using the MSRP
     * 
     * @param ShoppingCartLineItem lineItem 
     * @returns number
     */
    getRegularPricedItemsQty (lineItem) {
        if(this.limit && lineItem.quantity > this.limit) {
            return lineItem.quantity - this.limit;
        }

        return lineItem.quantity % this.quantity;
    }

    /**
     * Calculates the number of specials that are present with the quantity
     * 
     * @param ShoppingCartLineItem lineItem 
     * @returns number
     */
    getNumSpecials (lineItem) {
        if(this.limit && lineItem.quantity >= this.limit) {
            return this.limit / this.quantity;
        }

        return Math.floor(lineItem.quantity / this.quantity);
    }
}