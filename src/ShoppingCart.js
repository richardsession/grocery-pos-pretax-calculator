'use strict';

export default class ShoppingCart
{
	constructor () {
		this.cart = [];
	}

	/**
	 * Add item to the shopping cart
	 * 
	 * @param ShoppingCartLineItem lineItem 
	 * @returns void
	 */
	add (lineItem) {
		this.cart.push(lineItem);
	}
}