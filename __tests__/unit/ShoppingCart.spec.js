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

    test('shopping cart calculates the correct pre-tax total of the line items without any specials or markdowns applied', () => {
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

        const total = cart.getPreTaxTotal();

        expect(Number(total.toFixed(2))).toEqual(31.31);
    });

    test('shopping cart calculates the correct pre-tax total of the line items with markdowns applied', () => {
        const product = new Product('almonds', 7.99);
        const product2 = new Product('grapes', 2.39);
        const lineItem = new ShoppingCartLineItem(product, 1);
        const lineItem2 = new ShoppingCartLineItem(product2, 4.32);
        const cart = new ShoppingCart();

        product.markdown = new ProductRuleMarkdownStrategy(0.49);

        cart.add(lineItem);
        cart.add(lineItem2);

        const total = cart.getPreTaxTotal();

        expect(Number(total.toFixed(2))).toEqual(17.82);
    });

    test('shopping cart calculates the correct pre-tax total of the line items with specials applied', () => {
        const product = new Product('almonds', 7.99);
        const product2 = new Product('grapes', 2.39);
        const lineItem = new ShoppingCartLineItem(product, 4);
        const lineItem2 = new ShoppingCartLineItem(product2, 4.32);
        const cart = new ShoppingCart();

        product.special = new ProductRuleBogoSpecialStrategy(2, 1, 0.3);

        cart.add(lineItem);
        cart.add(lineItem2);

        const total = cart.getPreTaxTotal();

        expect(Number(total.toFixed(2))).toEqual(39.89);
    });

    test('shopping cart calculates the correct pre-tax total of the line items with specials applied when product is removed', () => {
        const product = new Product('almonds', 7.99);
        const product2 = new Product('grapes', 2.39);
        const lineItem = new ShoppingCartLineItem(product, 4);
        const lineItem2 = new ShoppingCartLineItem(product2, 4.32);
        const cart = new ShoppingCart();

        product.special = new ProductRuleBogoSpecialStrategy(2, 1, 0.3);

        cart.add(lineItem);
        cart.add(lineItem2);

        let total = cart.getPreTaxTotal();

        expect(Number(total.toFixed(2))).toEqual(39.89);

        cart.remove(0);

        total = cart.getPreTaxTotal();

        expect(Number(total.toFixed(2))).toEqual(10.32);

        cart.remove(0);

        total = cart.getPreTaxTotal();

        expect(total).toEqual(0);
    });
});