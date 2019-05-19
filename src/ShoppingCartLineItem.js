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
		return this.product.price * this.quantity;
	}

	checkValue (value) {
		if(value < 0) {
			throw new Error('line item quantity must be greater than 0');
		}
	}
}