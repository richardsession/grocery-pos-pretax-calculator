'use strict';

import ProductRuleBogoComparisionSpecialStrategy from '../../src/ProductRuleBogoComparisonSpecialStrategy';
import ShoppingCartLineItem from '../../src/ShoppingCartLineItem';
import Product from '../../src/Product';

describe('ProductRuleBogoComparisionSpecialStrategy', () => {
    beforeEach(() => {

    });

    test('object properties are set correctly', () => {
        const strategy = new ProductRuleBogoComparisionSpecialStrategy(2, 1, 0.5);

        expect(strategy.qtyNeeded).toEqual(2);
        expect(strategy.qtyDiscounted).toEqual(1);
        expect(strategy.discount).toEqual(0.5);
        expect(strategy.limit).toBeNull();
    });

    test('throws error when instantiating an object with a negative quantity needed', () => {
        expect(() => {
            const strategy = new ProductRuleBogoComparisionSpecialStrategy(-2, 1, 0.5);
        }).toThrowError();
    });

    test('throws error when instantiating an object with a negative quantity that is discounted', () => {
        expect(() => {
            const strategy = new ProductRuleBogoComparisionSpecialStrategy(2, -1, 0.5);
        }).toThrowError();
    });

    test('throws error when instantiating an object with a negative discount amount', () => {
        expect(() => {
            const strategy = new ProductRuleBogoComparisionSpecialStrategy(2, 1, -0.5);
        }).toThrowError();
    });

});