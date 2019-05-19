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

    test('calculates the correct number of regularly-priced items without a limit applied', () => {
        const product = new Product('yogurt', 2.99);
        const lineItem = new ShoppingCartLineItem(product, 6);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        let total = strategy.getRegularPricedItemsQty(lineItem);

        expect(total).toBe(0);

        lineItem.quantity = 11;

        total = strategy.getRegularPricedItemsQty(lineItem);

        expect(total).toEqual(2);
    });

    test('calculates the correct number of regularly-priced items with a limit applied', () => {
        const product = new Product('yogurt', 2.99);
        const lineItem = new ShoppingCartLineItem(product, 6);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5, 6);

        let qty = strategy.getRegularPricedItemsQty(lineItem);

        expect(qty).toEqual(0);

        lineItem.quantity = 11;

        qty = strategy.getRegularPricedItemsQty(lineItem);

        expect(qty).toEqual(5);
    });

    test('calculates the number of specials that are present within the line item without a limit applied', () => {
        const product = new Product('yogurt', 2.99);
        const lineItem = new ShoppingCartLineItem(product, 6);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        let qty = strategy.getNumSpecials(lineItem);

        expect(qty).toEqual(2);

        lineItem.quantity = 14;

        qty = strategy.getNumSpecials(lineItem);

        expect(qty).toEqual(4);
    });

    test('calculates the number of specials that are present within the line item with a limit applied', () => {
        const product = new Product('yogurt', 2.99);
        const lineItem = new ShoppingCartLineItem(product, 5);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5, 6);

        let qty = strategy.getNumSpecials(lineItem);

        expect(qty).toEqual(1);

        lineItem.quantity = 14;

        qty = strategy.getNumSpecials(lineItem);

        expect(qty).toEqual(2);
    });

    test('calculates the correct final line item price without a limit applied', () => {
        const product = new Product('yogurt', 2.99);
        const lineItem = new ShoppingCartLineItem(product, 5);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        let total = strategy.apply(lineItem);

        expect(total).toEqual(10.98);

        lineItem.quantity = 13;

        total = strategy.apply(lineItem);

        expect(Number(total.toFixed(2))).toEqual(22.99);
    });

    test('calculates the correct final line item price with a limit applied', () => {
        const product = new Product('yogurt', 2.99);
        const lineItem = new ShoppingCartLineItem(product, 5);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5, 6);

        let total = strategy.apply(lineItem);

        expect(total).toEqual(10.98);

        lineItem.quantity = 13;

        total = strategy.apply(lineItem);

        expect(Number(total.toFixed(2))).toEqual(30.93);
    });

    test('throws error when applying special to an invalid line item', () => {
        const product = new Product('yogurt', 2.99);
        const lineItem = new ShoppingCartLineItem(product, 2);
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        expect(() => {
            strategy.apply(lineItem);
        }).toThrowError();
    })
});