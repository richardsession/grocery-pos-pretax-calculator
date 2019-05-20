'use strict';

export default class ShoppingCart
{
	constructor () {
		this._cart = [];
	}

	get cart () {
		return this._cart;
	}

	set cart (cart) {
		this._cart = cart;
	}
}