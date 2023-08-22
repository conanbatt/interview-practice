'use strict';

var GetIntrinsic = require('get-intrinsic');
var gPO = require('reflect.getprototypeof');
var hasSymbols = require('has-symbols');
var hasToStringTag = require('has-tostringtag');
var define = require('define-properties');

var arrayIterProto = GetIntrinsic('%ArrayIteratorPrototype%', true);

var iterProto = arrayIterProto && gPO(arrayIterProto);

var result = iterProto || {};

if (hasSymbols()) {
	var defined = {};
	var predicates = {};
	var trueThunk = function () {
		return true;
	};

	if (!(Symbol.iterator in result)) {
		defined[Symbol.iterator] = function () {
			return this;
		};
		predicates[Symbol.iterator] = trueThunk;
	}

	if (hasToStringTag() && !(Symbol.toStringTag in result)) {
		defined[Symbol.toStringTag] = 'Iterator';
		predicates[Symbol.toStringTag] = trueThunk;
	}

	define(result, defined, predicates);
}

module.exports = result;
