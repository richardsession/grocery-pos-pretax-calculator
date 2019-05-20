'use strict';

import ShoppingCart from '../../src/ShoppingCart';
import ShoppingCartLineItem from '../../src/ShoppingCartLineItem';
import Product from '../../src/Product';
import ProductRuleMarkdownStrategy from '../../src/ProductRuleMarkdownStrategy';
import ProductRuleMarkdownPercentageStrategy from '../../src/ProductRuleMarkdownPercentageStrategy';
import ProductRuleBogoSpecialStrategy from '../../src/ProductRuleBogoSpecialStrategy';
import ProductRuleBogoComparisionSpecialStrategy from '../../src/ProductRuleBogoComparisonSpecialStrategy';

describe('ShoppingCart class', () => {
    beforeEach(() => {

    });

    test('object properties are set correctly', () => {
        const cart = new ShoppingCart();

        expect(cart.cart).toEqual([]);

        cart.cart = [];

        expect(cart.cart).toEqual([]);
    });
});