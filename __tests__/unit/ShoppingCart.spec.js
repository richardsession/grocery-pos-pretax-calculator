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

    test('adds line item to shopping cart', () => {
        const product = new Product('gummy bears', 2.19);
        const lineItem = new ShoppingCartLineItem(product, 2);
        const cart = new ShoppingCart();

        cart.add(lineItem);

        expect(cart.cart).toHaveLength(1);
        expect(cart.cart[0]).toEqual(lineItem);
    });


});