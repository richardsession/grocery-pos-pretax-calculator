'use strict';

import ProductRuleBogoSpecialStrategy from '../../src/ProductRuleBogoSpecialStrategy';

describe('ProductRuleBogoSpecialStrategy', () => {
    beforeEach(() => {

    });

    test('object properties are set correctly', () => {
        const strategy = new ProductRuleBogoSpecialStrategy(2, 1, 0.5);

        expect(strategy.neededQty).toEqual(2);
        expect(strategy.qtyDiscounted).toEqual(1);
        expect(strategy.discount).toEqual(0.5);
        expect(strategy.limit).toBeNull();
    });

    test('throws error when instantiating an object with a negative quantity needed', () => {
        expect(() => {
            const strategy = new ProductRuleBogoSpecialStrategy(-2, 1, 0.5);
        }).toThrowError();
    });

    test('throws error when instantiating an object with a negative quantity that is discounted', () => {
        expect(() => {
            const strategy = new ProductRuleBogoSpecialStrategy(2, -1, 0.5);
        }).toThrowError();
    });

    test('throws error when instantiating an object with a negative discount amount', () => {
        expect(() => {
            const strategy = new ProductRuleBogoSpecialStrategy(2, 1, -0.5);
        }).toThrowError();
    });

    test('limit quantity is set correct', () => {
        const strategy = new ProductRuleBogoSpecialStrategy(2, 1, 0.5);

        expect(strategy.limit).toBeNull();

        strategy.limit = 6;

        expect(strategy.limit).toEqual(6);
    });

    test('throws error when limit is a negative number', () => {
        const strategy = new ProductRuleBogoSpecialStrategy(2, 1, 0.5);

        expect(strategy.limit).toBeNull();

        expect(() => {
            new ProductRuleBogoSpecialStrategy(2, 1, 0.5, -6);
        }).toThrowError();

        expect(() => {
            strategy.limit = -6;
        }).toThrowError();
    });
});