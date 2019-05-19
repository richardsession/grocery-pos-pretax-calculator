'use strict';

import ShoppingCartLineItem from '../../src/ShoppingCartLineItem';
import Product from '../../src/Product';

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

    test('line item total for weighted product is correct without any specials or markdowns applied', () => {
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
});