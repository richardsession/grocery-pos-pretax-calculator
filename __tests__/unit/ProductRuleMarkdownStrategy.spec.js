'use strict';

import ProductRuleMarkdownStrategy from '../../src/ProductRuleMarkdownStrategy';
import ShoppingCartLineItem from '../../src/ShoppingCartLineItem';
import Product from '../../src/Product';

describe('ProductRuleMarkdownStrategy class', () => {
    test('markdown price is set correctly', () => {
        const strategy = new ProductRuleMarkdownStrategy(0.35);

        expect(strategy.markdown).toEqual(0.35);
    });

    test('throws error when the markdown price is less than 0', () => {
        expect(() => {
            const strategy = new ProductRuleMarkdownStrategy(-0.35);
        }).toThrowError();
    });

    test('can set markdown price after object construction', () => {
        const strategy = new ProductRuleMarkdownStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);

        strategy.markdown = 0.75;

        expect(strategy.markdown).toEqual(0.75);
    });

    test('throws error when setting markdown price to negative number after object construction', () => {
        const strategy = new ProductRuleMarkdownStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);

        expect(() => {
            strategy.markdown = -0.75;
        }).toThrowError();

        expect(strategy.markdown).toEqual(0.5);
    });

    test('markdown price is correct for unit-price based product', () => {
        const product = new Product('can of soup', 1.99);
        const lineItem = new ShoppingCartLineItem(product, 2);
        const strategy = new ProductRuleMarkdownStrategy(0.39);

        const total = strategy.apply(lineItem);

        expect(total).toEqual(1.60);
    });

    test('markdown price is correct for weight-based product', () => {
        const product = new Product('lettuce', 0.59);
        const lineItem = new ShoppingCartLineItem(product, 2.442);
        const strategy = new ProductRuleMarkdownStrategy(0.39);

        const total = strategy.apply(lineItem);

        expect(total).toEqual(0.59 - 0.39);
    });

    test('throws error when markdown price is too high', () => {
        const product = new Product('lettuce', 0.59);
        const lineItem = new ShoppingCartLineItem(product, 2.442);
        const strategy = new ProductRuleMarkdownStrategy(0.6);

        expect(() => {
            const total = strategy.apply(lineItem);
        }).toThrowError();
    });
});