'use strict';

import Product from '../../src/Product';
import ProductRuleMarkdownStrategy from '../../src/ProductRuleMarkdownStrategy';
import ProductRuleMarkdownPercentageStrategy from '../../src/ProductRuleMarkdownPercentageStrategy';
import ProductRuleQuantitySpecialStrategy from '../../src/ProductRuleQuantitySpecialStrategy';
import ProductRuleBogoSpecialStrategy from '../../src/ProductRuleBogoSpecialStrategy';

describe('Product class', () => {
    let product;

    beforeEach(() => {
        product = new Product('bananas', 0.69);
    });

    test('can retrieve the correct id of the product', () => {
        expect(product.id).toEqual('bananas');
    });

    test('can retrieve the correct price of the product', () => {
        expect(product.price).toEqual(0.69);
    });

    test('setting price to negative number during instantiation throws error', () => {
        expect(() => {
            const product = new Product('bananas', -0.56);
        }).toThrowError();
    });

    test('changing price to negative number after object instantiation throws error', () => {
        expect(() => {
            product.price = -0.58;
        }).toThrowError();
    });

    test('sets markdown strategy correctly', () => {
        expect(product.markdown).toBeNull();

        product.markdown = new ProductRuleMarkdownStrategy(0.99);

        expect(product.markdown.markdown).toBe(0.99);
    });

    test('sets special strategy correctly', () => {
        expect(product.special).toBeNull();

        product.special = new ProductRuleBogoSpecialStrategy(2, 1, 0.5);

        expect(product.special.qtyNeeded).toEqual(2);
        expect(product.special.qtyDiscounted).toEqual(1);
        expect(product.special.discount).toEqual(0.5);
    });
});