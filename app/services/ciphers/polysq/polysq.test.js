'use strict';

describe('polysq service', function(){
	var mockCollection;
	var mockUtils;
	var cipherService;

	var cipherArgs = {};
	var cipherStrs = {
		normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
		encoded: '11 12 13 14 15 16 21 22 23 24 25 26 31 32 33 34 35 36 41 42 43 44 45 46 51 52 53 54 55 56 61 62 63 64 65 66',
		decoded: 'abcdefghijklmnopqrstuvwxyz0123456789'
	};

	beforeEach(angular.mock.module('app'));

	beforeEach(angular.mock.inject(function(cipherCollection, cipherUtils, polysqService){
		mockCollection = cipherCollection;
		mockUtils = cipherUtils;
		cipherService = polysqService;
	}));

	it('should return encoded alphabet', function() {
		cipherArgs.isEncoding = true;
		cipherArgs.string = cipherStrs.normal;

		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.encoded);
	});

	it('should return decoded alphabet', function() {
		cipherArgs.isEncoding = false;
		cipherArgs.string = cipherStrs.encoded;

		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.decoded);
	});
});
