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

    test('consolidate line items within the cart', () => {
        const product = new Product('almonds', 7.99);
        const product2 = new Product('grapes', 2.39);
        const product3 = new Product('butter', 3.99);
        const lineItem = new ShoppingCartLineItem(product, 1);
        const lineItem2 = new ShoppingCartLineItem(product2, 4.32);
        const lineItem3 = new ShoppingCartLineItem(product3, 2);
        const lineItem4 = new ShoppingCartLineItem(product2, 2.1);
        const cart = new ShoppingCart();

        cart.add(lineItem);
        cart.add(lineItem2);
        cart.add(lineItem3);
        cart.add(lineItem4);

        expect(cart.cart).toHaveLength(4);

        const consolidateItems = cart.consolidateLineItems();

        expect(Object.keys(consolidateItems)).toHaveLength(3);
        expect(consolidateItems['grapes'].lineItem.quantity).toEqual(6.42);
    });
});