'use strict';

import ProductRuleMarkdownPercentageStrategy from '../../src/ProductRuleMarkdownPercentageStrategy';
import ShoppingCartLineItem from '../../src/ShoppingCartLineItem';
import Product from '../../src/Product';

describe('ProductRuleMarkdownPercentageStrategy class', () => {
    beforeEach(() => {

    });

    test('sets correct markdown percentage', () => {
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);
    });

    test('throws error if markdown is greater than 1', () => {
        expect(() => {
            const strategy = new ProductRuleMarkdownPercentageStrategy(1.1);
        }).toThrow();
    });

    test('throws error if markdown is less than 0', () => {
        expect(() => {
            const strategy = new ProductRuleMarkdownPercentageStrategy(-0.1);
        }).toThrow();
    });

    test('throws error if markdown is not a number', () => {
        expect(() => {
            const strategy = new ProductRuleMarkdownPercentageStrategy('10%');
        }).toThrow();
    });

    test('markdown percentage set correctly after instantiation', () => {
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);

        strategy.markdown = 0.6;

        expect(strategy.markdown).toEqual(0.6);
    });

    test('throws error when markdown percentage set incorrectly after instantiation', () => {
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);

        expect(() => {
            strategy.markdown = -0.6;
        }).toThrow();

        expect(() => {
            strategy.markdown = 1.0544;
        }).toThrow();

        expect(() => {
            strategy.markdown = '25%';
        }).toThrow();
    });

    test('markdown percentage is correct for unit-price based product', () => {
        const product = new Product('can of soup', 1.99);
        const lineItem = new ShoppingCartLineItem(product, 2);
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.39);

        const total = strategy.apply(lineItem);

        expect(total).toEqual(1.2139);
    });

    test('markdown percentage is correct for weight-based product', () => {
        const product = new Product('lettuce', 0.59);
        const lineItem = new ShoppingCartLineItem(product, 2.442);
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.39);

        const total = strategy.apply(lineItem);

        expect(total).toEqual(0.3599);
    });

    test('throws error when markdown percentage is greater than 1', () => {
        const product = new Product('lettuce', 0.59);
        const lineItem = new ShoppingCartLineItem(product, 2.442);
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.39);

        expect(strategy.markdown).toEqual(0.39);

        expect(() => {
            strategy.markdown = 1.492;
        }).toThrow();
    });

    test('throws error when markdown percentage is less than 0', () => {
        const product = new Product('lettuce', 0.59);
        const lineItem = new ShoppingCartLineItem(product, 2.442);
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.39);

        expect(strategy.markdown).toEqual(0.39);

        expect(() => {
            strategy.markdown = -0.485;
        }).toThrow();
    });

    test('throws error when markdown percentage is not a number', () => {
        const product = new Product('lettuce', 0.59);
        const lineItem = new ShoppingCartLineItem(product, 2.442);
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.39);

        expect(strategy.markdown).toEqual(0.39);

        expect(() => {
            strategy.markdown = '10%';
        }).toThrow();
    });
});