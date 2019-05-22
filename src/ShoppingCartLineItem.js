'use strict';

import { validate } from './libs/validation';
require('./validation_schemas');

export default class ShoppingCartLineItem
{
	static VALIDATION_SCHEMA_NAME = 'ShoppingCartLineItemSchema';

	#_product;
	#_quantity;

	/**
	 * 
	 * @param Product product 	Product instance
	 * @param number quantity 	The quantity of the Product instance (units or weight)
	 */
	constructor (product, quantity) {
		validate(ShoppingCartLineItem.VALIDATION_SCHEMA_NAME, {
			_quantity: quantity
		});

		this.#_product = product;
		this.#_quantity = quantity;
	}

	get product () {
		return this.#_product;
	}

	get quantity () {
		return this.#_quantity;
	}

	set quantity (quantity) {
		validate(ShoppingCartLineItem.VALIDATION_SCHEMA_NAME, {
			_quantity: quantity,
		});

		this.#_quantity = quantity;
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
}