/* eslint-disable no-tabs */

// 'use strict';

// describe('keyedsup service', function(){
// 	var mockCollection;
// 	var mockUtils;
// 	var cipherService;

// 	var cipherArgs = {
// 		addons: {key: 'lorem'}
// 	};
// 	var cipherStrs = {
// 		normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
// 		encoded: 'LoremabcdfghijknpqstuvwxyZ - 0123456789'
// 	};

// 	beforeEach(angular.mock.module('app'));

// 	beforeEach(angular.mock.inject(function(cipherCollection, cipherUtils, keyedsubService){
// 		mockCollection = cipherCollection;
// 		mockUtils = cipherUtils;
// 		cipherService = keyedsubService;
// 	}));

// 	it('should return keyed alphabet', function() {
// 		cipherArgs.isEncoding = true;
// 		cipherArgs.string = cipherStrs.normal;

// 		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.encoded);
// 	});

// 	it('should return the standard alphabet', function() {
// 		cipherArgs.isEncoding = false;
// 		cipherArgs.string = cipherStrs.encoded;

// 		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.normal);
// 	});

// 	it('should encode alphabet with a blank key', function() {
// 		cipherArgs.isEncoding = true;
// 		cipherArgs.string = cipherStrs.normal;
// 		cipherArgs.addons.key = null;

// 		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.normal);
// 	});
// });
