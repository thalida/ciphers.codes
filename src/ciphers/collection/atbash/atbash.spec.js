/* eslint-disable no-tabs */

// 'use strict';

// describe('atbash service', function(){
// 	var mockCollection;
// 	var mockUtils;
// 	var cipherService;

// 	var cipherArgs = {};
// 	var cipherStrs = {
// 		normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
// 		encoded: 'ZyxwvutsrqponmlkjihgfedcbA - 0123456789'
// 	};

// 	beforeEach(angular.mock.module('app'));

// 	beforeEach(angular.mock.inject(function(cipherCollection, cipherUtils, atbashService){
// 		mockCollection = cipherCollection;
// 		mockUtils = cipherUtils;
// 		cipherService = atbashService;
// 	}));

// 	it('should reverse the alphabet', function() {
// 		cipherArgs.isEncoding = true;
// 		cipherArgs.string = cipherStrs.normal;

// 		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.encoded);
// 	});

// 	it('should return the standard alphabet', function() {
// 		cipherArgs.isEncoding = false;
// 		cipherArgs.string = cipherStrs.encoded;

// 		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.normal);
// 	});
// });
