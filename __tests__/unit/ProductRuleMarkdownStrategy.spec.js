'use strict';

import ProductRuleMarkdownStrategy from '../../src/ProductRuleMarkdownStrategy';

describe('ProductRuleMarkdownStrategy class', () => {
    test('markdown price is set correctly', () => {
        const strategy = new ProductRuleMarkdownStrategy(0.35);

        expect(strategy.markdown).toEqual(0.35);
    });

    test('throws error when the markdown price is less than 0', () => {
        expect(() => {
            new ProductRuleMarkdownStrategy(-0.35);
        }).toThrowError();
    });

    test('can set markdown price after object construction', () => {
        const strategy = new ProductRuleMarkdownStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);

        strategy.markdown = 0.75;

        expect(strategy.markdown).toEqual(0.75);
    });

    test('throws error when setting markdown price to negative number after object construction', () => {
        const strategy = new ProductRuleMarkdownStrategy(0.5);

        expect(strategy.markdown).toEqual(0.5);

        expect(() => {
            strategy.markdown = -0.75;
        }).toThrowError();

        expect(strategy.markdown).toEqual(0.5);
    });
});