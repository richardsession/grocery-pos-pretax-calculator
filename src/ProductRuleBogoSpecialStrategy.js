'use strict';

/**
 * Buy one, get one special for products
 * E.g., Buy 2, get 1 for half off.
 */
export default class ProductRuleBogoSpecialStrategy
{
    constructor (qtyNeeded, qtyDiscounted, discount, limit = null) {
        this.checkValueIsPositive('quantity needed', qtyNeeded);
        this.checkValueIsPositive('discount quantity', qtyDiscounted);
        this.checkValueIsPositive('discount', discount);
        this.checkValueIsPositive('limit', limit);

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

    qualifies (lineItem) {
        return (lineItem.quantity <= this.qtyNeeded);
    }

    checkValueIsPositive (label, value) {
        if(value < 0) {
            throw new Error(label + ' cannot have a value less than 0');
        }
    }
}