'use strict';

/**
 * Basic markdown that subtracts the markdownPrice from the MSRP of the product
 */
export default class ProductRuleMarkdownStrategy
{
    constructor (markdownPrice) {
        this.checkMarkdown(markdownPrice);

        this._markdownPrice = markdownPrice;
    }

    get markdown () {
        return this._markdownPrice;
    }

    set markdown (markdownPrice) {
        this.checkMarkdown(markdownPrice);

        this._markdownPrice = markdownPrice;
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

    checkMarkdown (markdownPrice) {
        if(markdownPrice < 0) {
            throw new Error('Markdown price cannot be less than 0');
        }
    }
}