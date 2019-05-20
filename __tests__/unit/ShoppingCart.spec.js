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

    test('removes line item from the shopping cart', () => {
        const product = new Product('almonds', 7.99);
        const product2 = new Product('grapes', 2.39);
        const lineItem = new ShoppingCartLineItem(product, 1);
        const lineItem2 = new ShoppingCartLineItem(product2, 4.32);
        const cart = new ShoppingCart();

        cart.add(lineItem);
        cart.add(lineItem2);

        expect(cart.cart).toHaveLength(2);
        
        cart.remove(0);

        expect(cart.cart).toHaveLength(1);
        expect(cart.cart[0]).toEqual(lineItem2);
    });
});