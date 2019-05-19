'use strict';

import ProductRuleMarkdownPercentageStrategy from '../../src/ProductRuleMarkdownPercentageStrategy';

describe('ProductRuleMarkdownPercentageStrategy class', () => {
    beforeEach(() => {

    });

    test('sets correct markdown percentage', () => {
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);
    });

    test('throws error if markdown is greater than 1', () => {
        expect(() => {
            new ProductRuleMarkdownPercentageStrategy(1.1);
        }).toThrowError();
    });

    test('throws error if markdown is less than 0', () => {
        expect(() => {
            new ProductRuleMarkdownPercentageStrategy(-0.1);
        }).toThrowError();
    });

    test('throws error if markdown is not a number', () => {
        expect(() => {
            new ProductRuleMarkdownPercentageStrategy('10%');
        }).toThrowError();
    });

    test('markdown percentage set correctly after instantiation', () => {
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);

        strategy.markdown = 0.6;

        expect(strategy.markdown).toEqual(0.6);
    });

    test('throws error when markdown percentage set incorrectly after instantiation', () => {
        const strategy = new ProductRuleMarkdownPercentageStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);

        expect(() => {
            strategy.markdown = -0.6;
        }).toThrowError();

        expect(() => {
            strategy.markdown = 1.0544;
        }).toThrowError();

        expect(() => {
            strategy.markdown = '25%';
        }).toThrowError();
    });
});