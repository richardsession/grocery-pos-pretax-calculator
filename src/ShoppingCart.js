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

	/**
	 * Removes an item from the shopping cart
	 * 
	 * @param int idx 	Array index of the shopping cart item 
	 * @returns void
	 */
	remove (idx) {
		this.cart.splice(idx, 1);
	}
}