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
			throw new Error('Unable to locate the item within the shopping cart\'s');
		}

		this.cart.splice(idx, 1);
	}

	getPreTaxTotal () {
		let total = 0;

		const consolidatedItemList = this.consolidateLineItems();

		for(let item of Object.values(consolidatedItemList)) {
			total += item.lineItem.getTotal();
		}

		return total;
	}

	/**
	 * Consolidates the line items in the cart in order to aggregate the quantities of repeat items with 
	 * the associated line item product. Also allows multiple products of the same id to be added to the 
	 * cart at different times to be removed from the cart instead of decreasing its overall quantity.
	 * 
	 * @returns array
	 */
	consolidateLineItems () {
		const items = [];

		for(let i = 0; i < this.cart.length; i++) {
			// Add to array if a reference to the product in the line item does not exist
			if(!items[this.cart[i].getProduct().getId()]) {
				items[this.cart[i].getProduct().getId()] = {
					lineItem: this.cart[i],
				};

				continue;
			}

			// Update the quantity of the line item object in order for one of them to have the aggregate 
			// of the quantities of the same related product. Allows the proper activation of a special.
			items[this.cart[i].getProduct().getId()].lineItem.quantity += this.cart[i].quantity;
		}

		return items;
	}
}