'use strict';

import { validate } from './libs/validation';
require('./validation_schemas');

export default class Product
{
	static VALIDATION_SCHEMA_NAME = 'ProductSchema';

	#_id;
	#_price;
	#_markdownStrategy;
	#_specialStrategy;

	/**
	 * Constructor
	 * 
	 * @param string id 
	 * @param number price
	 */
	constructor (id, price) {
		validate(Product.VALIDATION_SCHEMA_NAME, {
			_id: id,
			_price: price
		});
		
		this.#_id = id;
		this.#_price = price;
		this.#_markdownStrategy = null;
		this.#_specialStrategy = null;
	}

	get id () {
		return this.#_id;
	}

	set id (id) {
		this.#_id = id;
	}

	get price () {
		return this.#_price;
	}

	set price (price) {	
		validate(Product.VALIDATION_SCHEMA_NAME, {
			_price: price,
			_id: this.id,
		});

		this.#_price = price;
	} 

	get markdown () {
		return this.#_markdownStrategy;
	}

	set markdown (markdownStrategy) {
		this.#_markdownStrategy = markdownStrategy;
	}

	get special () {
		return this.#_specialStrategy;
	}

	set special (specialStrategy) {
		this.#_specialStrategy = specialStrategy;
	}
}