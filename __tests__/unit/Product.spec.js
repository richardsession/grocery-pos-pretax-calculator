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
});