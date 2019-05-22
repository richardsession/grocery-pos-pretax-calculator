'use strict';

import { validate } from './libs/validation';
require('./validation_schemas');

export default class Product
{
	constructor (id, price) {
		validate(Product.getValidationSchemaName(), {
			_id: id,
			_price: price
		});
		
		this._id = id;
		this._price = price;
		this._markdownStrategy = null;
		this._specialStrategy = null;
	}

	get id () {
		return this._id;
	}

	get price () {
		return this._price;
	}

	set price (price) {	
		validate(Product.getValidationSchemaName(), {
			_price: price,
		});

		this._price = price;
	} 

	get markdown () {
		return this._markdownStrategy;
	}

	set markdown (markdownStrategy) {
		this._markdownStrategy = markdownStrategy;
	}

	get special () {
		return this._specialStrategy;
	}

	set special (specialStrategy) {
		this._specialStrategy = specialStrategy;
	}

	static getValidationSchemaName () {
		return 'ProductSchema';
	}
}