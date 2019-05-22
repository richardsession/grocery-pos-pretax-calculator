'use strict';

import { validate } from './libs/validation';
require('./validation_schemas');

/**
 * Buy one, get one of equal or lesser value special for weighted products
 * E.g., Buy 2 lbs, get 1 lb for half off.
 * 
 * Design Choice:
 * If the total quantity of the line item is between qtyNeeded and qtyNeeded + qtyDiscounted, then
 * apply the special. Otherwise, the line item does not qualify for the special.
 * 
 * TODO: qtyDiscounted <= qtyNeeded
 * 
 */
export default class ProductRuleBogoComparisonSpecialStrategy
{
    static VALIDATION_SCHEMA_NAME = 'ProductRuleBogoComparisonSpecialStrategySchema';

    #_qtyNeeded;
    #_qtyDiscounted;
    #_discount;

    /**
     * Constructor
     * 
     * @param number qtyNeeded      The quantity needed for the special (an integer)
     * @param number qtyDiscounted  The quantity that should have the discount applied do it (an integer)
     * @param number discount       The amount of the discount (a percentage)
     */
    constructor (qtyNeeded, qtyDiscounted, discount) {
        validate(ProductRuleBogoComparisonSpecialStrategy.VALIDATION_SCHEMA_NAME, {
			_qtyNeeded: qtyNeeded,
            _qtyDiscounted: qtyDiscounted,
            _discount: discount
        });
        
        this.#_qtyNeeded = qtyNeeded;
        this.#_qtyDiscounted = qtyDiscounted;
        this.#_discount = discount;
    }

    get qtyNeeded () {
        return this.#_qtyNeeded;
    }

    set qtyNeeded (qtyNeeded) {
        validate(ProductRuleBogoComparisonSpecialStrategy.VALIDATION_SCHEMA_NAME, {
            _qtyNeeded: qtyNeeded,
            _qtyDiscounted: this.gtyDiscounted,
            _discount: this.discount,
        });

        this.#_qtyNeeded = qtyNeeded
    }

    get qtyDiscounted () {
        return this.#_qtyDiscounted;
    }

    set gtyDiscounted (qtyDiscounted) {
        validate(ProductRuleBogoComparisonSpecialStrategy.VALIDATION_SCHEMA_NAME, {
            _qtyDiscounted: qtyDiscounted,
            _qtyNeeded: this.qtyNeeded,
            _discount: this.discount,
        });

        this.#_qtyDiscounted = qtyDiscounted;
    }

    get discount () {
        return this.#_discount;
    }

    set discount(discount) {
        validate(ProductRuleBogoComparisonSpecialStrategy.VALIDATION_SCHEMA_NAME, {
            _discount: discount,
            _qtyDiscounted: this.qtyDiscounted,
            _qtyNeeded: this.qtyNeeded,
        });

        this.#_discount = discount;
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