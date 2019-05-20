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
		if(!this.cart[idx]) {
			throw new Error('Unable to locate the item within the shopping cart's);
		}

		this.cart.splice(idx, 1);
	}

	/**
	 * Consolidates the line items in the cart in order to aggregate the quantities of repeat items with the associated product.
	 * Also allows multiple products of the same id but added to the cart at different times to be removed from the cart
	 * instead of decreasing its overall quantity.
	 * 
	 * @returns array
	 */
	consolidateLineItems () {
		const items = [];

		for(let i = 0; i < this.cart.length; i++) {
			if(!items[this.cart[i].product.id]) {
				items[this.cart[i].product.id] = {
					quantity: this.cart[i].quantity,
					product: this.cart[i].product,
				};

				continue;
			}

			// Increment the quantity if product already existed
			items[this.cart[i].product.id].quantity += this.cart[i].quantity;
		}

		return items;
	}
}