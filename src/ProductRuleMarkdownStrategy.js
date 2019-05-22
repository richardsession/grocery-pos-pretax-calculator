'use strict';

import { validate } from './libs/validation';
require('./validation_schemas');

/**
 * Basic markdown that subtracts the markdownPrice from the MSRP of the product
 */
export default class ProductRuleMarkdownStrategy
{
    static VALIDATION_SCHEMA_NAME = 'ProductRuleMarkdownStrategySchema';

    #_markdown;

    /**
     * Constructor 
     * 
     * @param number markdownPrice  The total price (dollars and sense) that should be removed from the MSRP
     */
    constructor (markdownPrice) {
        validate(ProductRuleMarkdownStrategy.VALIDATION_SCHEMA_NAME, {
			_markdown: markdownPrice,
        });

        this.#_markdown = markdownPrice;
    }

    get markdown () {
        return this.#_markdown;
    }

    set markdown (markdownPrice) {
        validate(ProductRuleMarkdownStrategy.VALIDATION_SCHEMA_NAME, {
			_markdown: markdownPrice,
        });
        
        this.#_markdown = markdownPrice;
    }

    /**
     * Applies the special to the line item
     * 
     * @param ShoppingCartLineItem lineItem 
     * @returns number
     */
    apply (lineItem) {
        const finalPrice = lineItem.product.price - this.markdown;

        if(finalPrice < 0) {
            throw new Error(lineItem.product.id + ' markdown cannot be higher than the product\'s price');
        }

        return finalPrice;
    }
}