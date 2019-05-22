'use strict';

import { validate } from './libs/validation';
require('./validation_schemas');

/**
 * Buy one, get one special for products. Also applies a limit to the special.
 * E.g., Buy 2, get 1 for half off.
 */
export default class ProductRuleBogoSpecialStrategy
{
    static VALIDATION_SCHEMA_NAME = 'ProductRuleBogoSpecialStrategySchema';

    #_qtyNeeded;
    #_qtyDiscounted;
    #_discount;
    #_limit;

    /**
     * Constructor
     * 
     * @param number qtyNeeded      The quantity needed for the special (an integer)
     * @param number qtyDiscounted  The quantity that should have the discount applied do it (an integer)
     * @param number discount       The amount of the discount (a percentage)
     * @param number limit          The total number of products that can apply to this special
     */
    constructor (qtyNeeded, qtyDiscounted, discount, limit = null) {
        validate(ProductRuleBogoSpecialStrategy.VALIDATION_SCHEMA_NAME, {
			_qtyNeeded: qtyNeeded,
            _qtyDiscounted: qtyDiscounted,
            _discount: discount,
        });
        
        this.validateLimit(limit, qtyNeeded + qtyDiscounted);

        this.#_qtyNeeded = qtyNeeded;
        this.#_qtyDiscounted = qtyDiscounted;
        this.#_discount = discount;
        this.#_limit = limit;
    }

    get qtyNeeded () {
        return this.#_qtyNeeded;
    }

    set qtyNeeded (qtyNeeded) {
        validate(ProductRuleBogoSpecialStrategy.VALIDATION_SCHEMA_NAME, {
            _qtyNeeded: qtyNeeded,
            _qtyDiscounted: this.qtyDiscounted,
            _discount: this.discount,
        });

        this.#_qtyNeeded = qtyNeeded
    }

    get qtyDiscounted () {
        return this.#_qtyDiscounted;
    }

    set gtyDiscounted (qtyDiscounted) {
        validate(ProductRuleBogoSpecialStrategy.VALIDATION_SCHEMA_NAME, {
            _qtyDiscounted: qtyDiscounted,
            _discount: this.discount,
            _qtyNeeded: this.qtyNeeded,
        });

        this.#_qtyDiscounted = qtyDiscounted;
    }

    get discount () {
        return this.#_discount;
    }

    set discount(discount) {
        validate(ProductRuleBogoSpecialStrategy.VALIDATION_SCHEMA_NAME, {
            _discount: discount,
            _qtyDiscounted: this.qtyDiscounted,
            _qtyNeeded: this.qtyNeeded,
        });

        this.#_discount = discount;
    }

    get limit () {
        return this.#_limit;
    }

    set limit (limit) {
        this.validateLimit(limit, this.qtyDiscounted + this.qtyNeeded);

        this.#_limit = limit;
    }

    /**
     * Applies the special to the line item
     * 
     * @param ShoppingCartLineItem lineItem 
     * @returns number
     * @throws Error
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

    /**
     * Make sure limit is evenly-divisible by (qtyNeeded + qtyDiscounted), positive and is an integer
     * 
     * @param number limit 
     * @param number specialTotal 
     * @returns void
     * @throws Error
     */
    validateLimit (limit, specialTotal) {
        if(limit && limit < 0 && (limit % specialTotal === 0) && limit % 1 === 0) {
            throw new Error('The limit parameter is invalid');
        }
    }
}