'use strict';

import ShoppingCartLineItem from '../../src/ShoppingCartLineItem';
import Product from '../../src/Product';
import ProductRuleMarkdownStrategy from '../../src/ProductRuleMarkdownStrategy';
import ProductRuleMarkdownPercentageStrategy from '../../src/ProductRuleMarkdownPercentageStrategy';
import ProductRuleBogoSpecialStrategy from '../../src/ProductRuleBogoSpecialStrategy';
import ProductRuleBogoComparisionSpecialStrategy from '../../src/ProductRuleBogoComparisonSpecialStrategy';

describe('ShoppingCartLineItem class', () => {
    beforeEach(() => {

    });

    test('object properties are set correctly', () => {
        const product = new Product('bananas', 0.69);
        const lineItem = new ShoppingCartLineItem(product, 3);

        expect(lineItem.product).toEqual(product);
        expect(lineItem.quantity).toEqual(3);
    });

    test('throws error if quantity is less than 0', () => {
        const product = new Product('bananas', 0.69);
        
        expect(() => {
            const lineItem = new ShoppingCartLineItem(product, -3);
        }).toThrowError();
    });

    test('throws error if quantity is less than 0 after object instantiation', () => {
        const product = new Product('bananas', 0.69);
        const lineItem = new ShoppingCartLineItem(product, 3);

        expect(lineItem.quantity).toEqual(3);

        expect(() => {
            lineItem.quantity = -3;
        }).toThrowError();
    });

    /* test('determines if product is a weighted product or not', () => {
        const product = new Product('bananas', 0.69);
        const lineItem = new ShoppingCartLineItem(product, 1.495);

        let isWeightedProduct = lineItem.containsWeightedProduct();

        expect(isWeightedProduct).toBe(true);

        lineItem.quantity = 2;

        isWeightedProduct = lineItem.containsWeightedProduct();

        expect(isWeightedProduct).toBe(false);
    }); */

    test('line item total for weight-based product is correct without any specials or markdowns applied', () => {
        const product = new Product('bananas', 0.69);
        const lineItem = new ShoppingCartLineItem(product, 1.495);

        const total = lineItem.getTotal();

        expect(total).toEqual(1.03155);
    });

    test('line item total for unit-price based product is correct without any specials or markdowns applied', () => {
        const product = new Product('cookies', 3.99);
        const lineItem = new ShoppingCartLineItem(product, 3);

        const total = lineItem.getTotal();

        expect(total).toEqual(11.97);
    });

    test('line item total for weight-based product is correct with markdown applied', () => {
        const product = new Product('bananas', 0.69);
        const lineItem = new ShoppingCartLineItem(product, 1.495);
        product.markdown = new ProductRuleMarkdownStrategy(0.20);

        const total = Number(lineItem.getTotal().toPrecision(2));

        expect(total).toEqual(0.73);
    });

    test('line item total for unit-price based product is correct with markdown applied', () => {
        const product = new Product('hummus', 4.29);
        const lineItem = new ShoppingCartLineItem(product, 2);
        product.markdown = new ProductRuleMarkdownStrategy(0.59);

        const total = Number(lineItem.getTotal().toFixed(2));

        expect(total).toEqual(7.4);
    });

    test('line item total for weight-based product is correct with percentage-based markdown applied', () => {
        const product = new Product('bananas', 0.69);
        const lineItem = new ShoppingCartLineItem(product, 1.495);
        product.markdown = new ProductRuleMarkdownPercentageStrategy(0.20);

        const total = Number(lineItem.getTotal().toFixed(2));

        expect(total).toEqual(0.83);
    });

    test('line item total for unit-price based product is correct with percentage-based markdown applied', () => {
        const product = new Product('hummus', 4.29);
        const lineItem = new ShoppingCartLineItem(product, 2);
        product.markdown = new ProductRuleMarkdownPercentageStrategy(0.59);

        const total = Number(lineItem.getTotal().toFixed(2));

        expect(total).toEqual(3.52);
    });

    test('line item total for weight-based product is correct with qualified BOGO special applied and markdown applied', () => {
        const product = new Product('oranges', 4.29);
        const lineItem = new ShoppingCartLineItem(product, 2.34);
        
        product.markdown = new ProductRuleMarkdownPercentageStrategy(0.59);
        product.special = new ProductRuleBogoComparisionSpecialStrategy(2, 1, 0.5);

        const total = Number(lineItem.getTotal().toFixed(2));

        expect(total).toEqual(9.31);
    });

    test('line item total for unit-price based product is correct with qualified BOGO special applied and markdown applied', () => {
        const product = new Product('tissue', 1.49);
        const lineItem = new ShoppingCartLineItem(product, 4);
        
        product.markdown = new ProductRuleMarkdownPercentageStrategy(0.59);
        product.special = new ProductRuleBogoSpecialStrategy(2, 1, 0.5);

        const total = Number(lineItem.getTotal().toFixed(2));

        expect(total).toEqual(5.21);
    });

    test('line item total for unit-price based product is correct with qualified BOGO special and limit applied', () => {
        const product = new Product('tissue', 1.49);
        const lineItem = new ShoppingCartLineItem(product, 10);
        
        product.markdown = new ProductRuleMarkdownPercentageStrategy(0.59);
        product.special = new ProductRuleBogoSpecialStrategy(2, 1, 0.5, 6);

        const total = Number(lineItem.getTotal().toFixed(2));

        expect(total).toEqual(13.41);
    });


    test('line item total for weight-based product is correct with unqualified BOGO special applied and markdown applied', () => {
        const product = new Product('oranges', 4.29);
        const lineItem = new ShoppingCartLineItem(product, 3.48);
        
        product.markdown = new ProductRuleMarkdownPercentageStrategy(0.50);
        product.special = new ProductRuleBogoComparisionSpecialStrategy(2, 1, 0.5);

        const total = Number(lineItem.getTotal().toFixed(2));

        expect(total).toEqual(7.46);
    });

    test('line item total for unit-price based product is correct with unqualified BOGO special applied and markdown applied', () => {
        const product = new Product('tissue', 1.49);
        const lineItem = new ShoppingCartLineItem(product, 4);
        
        product.markdown = new ProductRuleMarkdownPercentageStrategy(0.59);
        product.special = new ProductRuleBogoSpecialStrategy(5, 1, 0.5);

        const total = Number(lineItem.getTotal().toFixed(2));

        expect(total).toEqual(2.44);
    });
});