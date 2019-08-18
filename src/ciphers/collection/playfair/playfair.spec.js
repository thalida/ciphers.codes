/* eslint-disable no-tabs */

// 'use strict';

// describe('playfair service', function(){
// 	var mockCollection;
// 	var mockUtils;
// 	var cipherService;

// 	var cipherArgs = {
// 		addons: {key: 'lorem'}
// 	};
// 	var cipherStrs = {
// 		normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
// 		encoded: 'bcdf mdhi srkn olhm qscx upwx yzvy',
// 		decoded: 'abcdefghixiklmnopqrstuvwxyzx'
// 	};

// 	beforeEach(angular.mock.module('app'));

// 	beforeEach(angular.mock.inject(function(cipherCollection, cipherUtils, playfairService){
// 		mockCollection = cipherCollection;
// 		mockUtils = cipherUtils;
// 		cipherService = playfairService;
// 	}));

// 	it('should return encoded alphabet', function() {
// 		cipherArgs.isEncoding = true;
// 		cipherArgs.string = cipherStrs.normal;

// 		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.encoded);
// 	});

// 	it('should return decoded alphabet', function() {
// 		cipherArgs.isEncoding = false;
// 		cipherArgs.string = cipherStrs.encoded;

// 		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.decoded);
// 	});

// 	it('should encode alphabet with a blank key', function() {
// 		cipherArgs.isEncoding = true;
// 		cipherArgs.string = cipherStrs.normal;
// 		cipherArgs.addons.key = null;

// 		expect(cipherService.run(cipherArgs)).toEqual('bcde akhi hykf mnop lust uqwx yzvy');
// 	});
// });
