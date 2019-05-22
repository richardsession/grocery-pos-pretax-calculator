'use strict';

import ProductRuleBogoSpecialStrategy from '../../src/ProductRuleBogoSpecialStrategy';
import ShoppingCartLineItem from '../../src/ShoppingCartLineItem';
import Product from '../../src/Product';

describe('ProductRuleBogoSpecialStrategy', () => {
    beforeEach(() => {

    });

    test('object properties are set correctly', () => {
        const strategy = new ProductRuleBogoSpecialStrategy(2, 1, 0.5);

        expect(strategy.qtyNeeded).toEqual(2);
        expect(strategy.qtyDiscounted).toEqual(1);
        expect(strategy.discount).toEqual(0.5);
        expect(strategy.limit).toBeNull();
    });

    test('throws error when instantiating an object with a negative quantity needed', () => {
        expect(() => {
            const strategy = new ProductRuleBogoSpecialStrategy(-2, 1, 0.5);
        }).toThrow();
    });

    test('throws error when instantiating an object with a negative quantity that is discounted', () => {
        expect(() => {
            const strategy = new ProductRuleBogoSpecialStrategy(2, -1, 0.5);
        }).toThrow();
    });

    test('throws error when instantiating an object with a negative discount amount', () => {
        expect(() => {
            const strategy = new ProductRuleBogoSpecialStrategy(2, 1, -0.5);
        }).toThrow();
    });

    test('limit quantity is set correct', () => {
        const strategy = new ProductRuleBogoSpecialStrategy(2, 1, 0.5);

        expect(strategy.limit).toBeNull();

        strategy.limit = 6;

        expect(strategy.limit).toEqual(6);
    });

    test('throws error when limit is a negative number', () => {
        const strategy = new ProductRuleBogoSpecialStrategy(2, 1, 0.5);

        expect(strategy.limit).toBeNull();

        expect(() => {
            const strategy = new ProductRuleBogoSpecialStrategy(2, 1, 0.5, -6);
        }).toThrowError();

        expect(() => {
            strategy.limit = -6;
        }).toThrowError();
    });

    test('product does not qualify for the special', () => {
        const product = new Product('chips', 2.29);
        const lineItem = new ShoppingCartLineItem(product, 3);
        const strategy = new ProductRuleBogoSpecialStrategy(3, 2, 0.5);

        const qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(false);
    });

    test('product does qualify for the special', () => {
        const product = new Product('chips', 2.29);
        const lineItem = new ShoppingCartLineItem(product, 5);
        const strategy = new ProductRuleBogoSpecialStrategy(3, 2, 0.5);

        const qualifies = strategy.qualifies(lineItem);

        expect(qualifies).toBe(true);
    });

    test('correct number of discounted items without a limit applied', () => {
        const product = new Product('chips', 2.29);
        const lineItem = new ShoppingCartLineItem(product, 8);
        const strategy = new ProductRuleBogoSpecialStrategy(2, 1, 0.5);

        const qty = strategy.getDiscountedItemsQty(lineItem);

        expect(qty).toEqual(2); 
    });

    test('correct number of discounted items with a limit applied', () => {
        const product = new Product('chips', 2.29);
        const lineItem = new ShoppingCartLineItem(product, 12);
        const strategy = new ProductRuleBogoSpecialStrategy(3, 1, 0.5, 8);

        const qty = strategy.getDiscountedItemsQty(lineItem);

        expect(qty).toEqual(2); 
    });

    test('correct pricing for discounted items', () => {
        const product = new Product('chips', 2.29);
        const lineItem = new ShoppingCartLineItem(product, 12);
        const strategy = new ProductRuleBogoSpecialStrategy(3, 1, 0.5, 8);

        const price = strategy.getDiscountedItemsPricing(lineItem);

        expect(price).toEqual(1.145); 
    });

    test('throws error when applying special to unqualified line item', () => {
        const product = new Product('chips', 2.29);
        const lineItem = new ShoppingCartLineItem(product, 3);
        const strategy = new ProductRuleBogoSpecialStrategy(3, 1, 0.5, 8);

        expect(() => {
            const price = strategy.apply(lineItem);
        }).toThrowError();
    });

    test('price is correct when special is applied without a limit', () => {
        const product = new Product('chips', 2.29);
        const lineItem = new ShoppingCartLineItem(product, 22);
        const strategy = new ProductRuleBogoSpecialStrategy(3, 1, 0.5);

        const total = strategy.apply(lineItem);

        expect(total).toEqual(44.655);
    });

    test('price is correct when special is applied with a limit', () => {
        const product = new Product('chips', 2.29);
        const lineItem = new ShoppingCartLineItem(product, 20);
        const strategy = new ProductRuleBogoSpecialStrategy(3, 1, 0.5, 8);

        const total = strategy.apply(lineItem);

        expect(total).toEqual(43.51);
    });

    test('can set discount after instantiation', () => {
        const product = new Product('chips', 2.29);
        const lineItem = new ShoppingCartLineItem(product, 20);
        const strategy = new ProductRuleBogoSpecialStrategy(3, 1, 0.5, 8);

        strategy.discount = 0.4;

        expect(strategy.discount).toEqual(0.4);

        expect(() => {
            strategy.discount = -1;
        }).toThrow();
    });
});