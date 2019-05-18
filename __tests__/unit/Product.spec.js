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

    test('price checking function throws error when passed a negative number', () => {
        expect(() => {
            product.checkPrice(-0.45);
        }).toThrowError();
    });
});