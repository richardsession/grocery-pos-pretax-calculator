'use strict';

import ProductRuleQuantitySpecialStrategy from '../../src/ProductRuleQuantitySpecialStrategy';
import ShoppingCartLineItem from '../../src/ShoppingCartLineItem';
import Product from '../../src/Product';

describe('ProductRuleQuantitySpecialStrategy class', () => {
    beforeEach(() => {

    });

    test('object properties are set correctly', () => {
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        expect(strategy.quantity).toEqual(3);
        expect(strategy.price).toEqual(5);
        expect(strategy.limit).toBeNull();
    });

    test('throws error if quantity is less than 0', () => {
        expect(() => {
            const strategy = new ProductRuleQuantitySpecialStrategy(-3, 5);
        }).toThrowError();
    });

    test('throws error if price is less than 0', () => {
        expect(() => {
            const strategy = new ProductRuleQuantitySpecialStrategy(3, -5);
        }).toThrowError();
    });

    test('throws error if limit is less than 0', () => {
        expect(() => {
            const strategy = new ProductRuleQuantitySpecialStrategy(3, 5, -1);
        }).toThrowError();
    });

    test('the line item qualifies for the special', () => {
        const product = new Product('yogurt', 1.19);
        const lineItem = new ShoppingCartLineItem(product, 3);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        let qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(true);

        lineItem.quantity = 4;

        qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(true);
    });

    test('the line item does not qualify for the special', () => {
        const product = new Product('yogurt', 1.19);
        const lineItem = new ShoppingCartLineItem(product, 2);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        const qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(false);
    });

    test('can apply the special to multiple combinations of the special\'s rule without a limit', () => {
        const product = new Product('yogurt', 2.99);
        const lineItem = new ShoppingCartLineItem(product, 6);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        const total = strategy.calculateMultiplePrice(lineItem);

        expect(total).toBe(10);
    });

    test('can apply the special to multiple combinations of the special\'s rule without a limit', () => {
        const product = new Product('yogurt', 2.99);
        const lineItem = new ShoppingCartLineItem(product, 5);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        const total = strategy.calculateMultiplePrice(lineItem);

        expect(total).toBeUndefined();
    });
});