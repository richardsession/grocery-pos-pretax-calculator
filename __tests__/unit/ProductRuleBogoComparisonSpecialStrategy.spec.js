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
    });

    test('throws error when instantiating an object with a negative quantity needed', () => {
        expect(() => {
            const strategy = new ProductRuleBogoComparisionSpecialStrategy(-2, 1, 0.5);
        }).toThrow();
    });

    test('throws error when instantiating an object with a negative quantity that is discounted', () => {
        expect(() => {
            const strategy = new ProductRuleBogoComparisionSpecialStrategy(2, -1, 0.5);
        }).toThrow();
    });

    test('throws error when instantiating an object with a negative discount amount', () => {
        expect(() => {
            const strategy = new ProductRuleBogoComparisionSpecialStrategy(2, 1, -0.5);
        }).toThrow();
    });

    test('determine if the special should be applied', () => {
        const product = new Product('tomatoes', 0.49);
        const lineItem = new ShoppingCartLineItem(product, 2.3);
        const strategy = new ProductRuleBogoComparisionSpecialStrategy(3, 2, 0.5);

        let qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(false);

        lineItem.quantity = 3;

        qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(true);

        lineItem.quantity = 3.1;

        qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(true);

        lineItem.quantity = 5;

        qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(true);

        lineItem.quantity = 6.1;

        qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(false);
    });

    test('throws error when applying the special to a line item that does not qualify for it', () => {
        const product = new Product('tomatoes', 0.49);
        const lineItem = new ShoppingCartLineItem(product, 2.3);
        const strategy = new ProductRuleBogoComparisionSpecialStrategy(3, 2, 0.5);

        expect(() => {
            strategy.apply(lineItem);
        }).toThrowError();

        lineItem.quantity = 6;

        expect(() => {
            strategy.apply(lineItem);
        }).toThrowError();
    });

    test('calculates the correct total for the line item', () => {
        const product = new Product('tomatoes', 0.49);
        const lineItem = new ShoppingCartLineItem(product, 4);
        const strategy = new ProductRuleBogoComparisionSpecialStrategy(3, 2, 0.5);

        let total = strategy.apply(lineItem);

        expect(Number(total.toFixed(2))).toEqual(1.71);

        lineItem.quantity = 3.1;

        total = strategy.apply(lineItem);

        expect(Number(total.toFixed(2))).toEqual(1.49);
    });
});