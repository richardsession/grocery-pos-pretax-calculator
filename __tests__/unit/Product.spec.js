'use strict';

import Product from '../../src/Product';

describe('Product class', () => {
    beforeEach(() => {
        
    });

    test('can retrieve the correct id of the product', () => {
        const product = new Product('bananas', 0.69);

        expect(product.id).toEqual('bananas');
    });
});