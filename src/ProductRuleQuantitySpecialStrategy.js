'use strict';

import { validate } from './libs/validation';
require('./validation_schemas');

/**
 * Quantity special for products.
 * E.g., 3 for $5, 6 for $10, etc.
 */
export default class ProductRuleQuantitySpecialStrategy
{
    static VALIDATION_SCHEMA_NAME = 'ProductRuleQuantitySpecialStrategySchema';

    #_quantity;
    #_price;
    #_limit;

    /**
     * Constructor
     * 
     * @param number quantity   The number of products that could trigger this special
     * @param number price      The total price for the collection of products in the {quantity}
     * @param number limit      The total number of products that can be included in the special
     */
    constructor (quantity, price, limit = null) {
        validate(ProductRuleQuantitySpecialStrategy.VALIDATION_SCHEMA_NAME, {
			_quantity: quantity,
			_price: price
        });

        this.validateLimit(limit);
        
        this.#_quantity = quantity;
        this.#_price = price;
        this.#_limit = limit;
    }

    get quantity () {
        return this.#_quantity;
    }

    set quantity (quantity) {
        validate(ProductRuleQuantitySpecialStrategy.VALIDATION_SCHEMA_NAME, {
			_quantity: quantity,
			_price: this.price
        });

        this.#_quantity = quantity;
    }

    get price () {
        return this.#_price;
    }

    set price (price) {
        validate(ProductRuleQuantitySpecialStrategy.VALIDATION_SCHEMA_NAME, {
			_price: price,
			_quantity: this.quantity,
        });

        this.#_price = price;
    }

    get limit () {
        return this.#_limit;
    }

    set limit (limit) {
        this.validateLimit(limit);

        this.#_limit = limit;
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

    /**
     * Make sure limit is positive and is an integer
     * 
     * @param number limit 
     * @returns void
     * @throws Error
     */
    validateLimit (limit) {
        if(limit && limit < 0 && limit % 1 === 0) {
            throw new Error('The limit parameter must be an integer and greater than 0');
        }
    }
}