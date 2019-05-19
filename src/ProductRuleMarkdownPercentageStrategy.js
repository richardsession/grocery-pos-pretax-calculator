'use strict';

export default class ProductRuleMarkdownPercentageStrategy
{
    constructor (markdownPercent) {
        this.checkMarkdown(markdownPercent);

        this._markdown = markdownPercent;
    }

    get markdown () {
        return this._markdown
    }

    set markdown (markdown) {
        this.checkMarkdown(markdown);

        this._markdown = markdown;
    }

    apply (lineItem) {
        const finalPrice = lineItem.product.price - (lineItem.product.price * this.markdown);

        if(finalPrice < 0) {
            throw new Error('The updated product price for ' + lineItem.product.id + ' is less than 0.');
        }

        return finalPrice;
    }

    checkMarkdown (markdownPercent) {
        if(markdownPercent < 0) {
            throw new Error('Markdown percentage cannot be less than 0');
        }

        if(markdownPercent > 1) {
            throw new Error('Markdown percentage cannot be more than 1');
        }

        if(typeof markdownPercent !== 'number') {
            throw new Error('The markdown percentage must be a number');
        }
    }
}