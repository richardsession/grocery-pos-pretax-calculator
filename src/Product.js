'use strict';

export default class Product
{
	constructor (id, price) {
		this.checkPrice(price);
		
		this._id = id;
		this._price = price;
		this._markdownStrategy = null;
		this._specialStrategy = null;
	}

	get id () {
		return this._id;
	}

	set id (id) {
		this._id = id;
	}

	get price () {
		return this._price;
	}

	set price (price) {
		this.checkPrice(price);
		
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

	checkPrice (price) {
		if(price < 0) {
			throw new Error('The price of the product must be greater than or equal to 0.');
		}
	}
}