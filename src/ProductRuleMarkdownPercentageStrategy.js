'use strict';

import { validate } from './libs/validation';
require('./validation_schemas');

/**
 * Markdown that reduces the MSRP by a percentage.
 */
export default class ProductRuleMarkdownPercentageStrategy
{
    static VALIDATION_SCHEMA_NAME = 'ProductRuleMarkdownPercentageStrategySchema';

    #_markdown;

    /**
     * Constructor
     * 
     * @param number markdownPercent    The percentage that is to be removed from the MSRP
     */
    constructor (markdownPercent) {
        validate(ProductRuleMarkdownPercentageStrategy.VALIDATION_SCHEMA_NAME, {
			_markdown: markdownPercent,
        });
        
        this.#_markdown = markdownPercent;
    }

    get markdown () {
        return this.#_markdown
    }

    set markdown (markdownPercent) {
        validate(ProductRuleMarkdownPercentageStrategy.VALIDATION_SCHEMA_NAME, {
			_markdown: markdownPercent,
        });

        this.#_markdown = markdownPercent;
    }

    /**
     * Applies the special to the line item
     * 
     * @param ShoppingCartLineItem lineItem 
     * @returns number
     */
    apply (lineItem) {
        const finalPrice = lineItem.product.price - (lineItem.product.price * this.markdown);

        if(finalPrice < 0) {
            throw new Error('The updated product price for ' + lineItem.product.id + ' is less than 0.');
        }

        return finalPrice;
    }
}