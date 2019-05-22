'use strict';

import { validateSync } from 'class-validator';
require('./validation_schemas/Product');

export default class Product
{
	constructor (id, price) {
		this.validate(Product.getValidationSchemaName(), {
			_id: id,
			_price: price
		});
		
		this._id = id;
		this._price = price;
		this._markdownStrategy = null;
		this._specialStrategy = null;
	}

	get price () {
		return this._price;
	}

	set price (price) {	
		this.validate(Product.getValidationSchemaName(), {
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

	getId () {
		return this._id;
	}

	validate (validationSchema, obj) {
		const validation = validateSync(validationSchema, obj);

		if(validation.length > 0) {
			throw validation;
		}
	}

	static getValidationSchemaName () {
		return 'ProductSchema';
	}
}