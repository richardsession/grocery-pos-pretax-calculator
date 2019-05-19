'use strict';

import ProductRuleQuantitySpecialStrategy from '../../src/ProductRuleQuantitySpecialStrategy';

describe('ProductRuleQuantitySpecialStrategy class', () => {
    beforeEach(() => {

    });

    test('object properties are set correctly', () => {
        const strategy = new ProductRuleQuantitySpecialStrategy(3, 5);

        expect(strategy.quantity).toEqual(3);
        expect(strategy.price).toEqual(5);
        expect(strategy.limit).toBeNull();
    });

    test('throws error if quantity is less than 0', () => {
        expect(() => {
            const strategy = new ProductRuleQuantitySpecialStrategy(-3, 5);
        }).toThrowError();
    });

    test('throws error if price is less than 0', () => {
        expect(() => {
            const strategy = new ProductRuleQuantitySpecialStrategy(3, -5);
        }).toThrowError();
    });

    test('throws error if limit is less than 0', () => {
        expect(() => {
            const strategy = new ProductRuleQuantitySpecialStrategy(3, 5, -1);
        }).toThrowError();
    });
});