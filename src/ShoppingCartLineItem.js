'use strict';

export default class ShoppingCartLineItem
{
	constructor (product, quantity) {
		this.checkValue(quantity);

		this._product = product;
		this._quantity = quantity;
	}

	get product () {
		return this._product;
	}

	set product (product) {
		this._product = product;
	}

	get quantity () {
		return this._quantity;
	}

	set quantity (quantity) {
		this.checkValue(quantity);

		this._quantity = quantity;
	}

	getTotal () {
		if(this.product.special && this.product.special.qualifies(this)) {
			return this.product.special.apply(this);
		}

		if(this.product.markdown) {
			return this.product.markdown.apply(this) * this.quantity;
		}

		return this.product.price * this.quantity;
	}

	checkValue (value) {
		if(value < 0) {
			throw new Error('line item quantity must be greater than 0');
		}
	}
}