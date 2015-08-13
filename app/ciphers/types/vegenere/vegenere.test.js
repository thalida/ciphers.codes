'use strict';

describe('vegenere service', function(){
	var mockCollection;
	var mockUtils;
	var cipherService;

	var cipherArgs = {
		addons: {key: 'lorem'}
	};
	var cipherStrs = {
		normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
		encoded: 'lpthqquymvvzdraaeiwffjnbkk',
		decoded: 'abcdefghijklmnopqrstuvwxyz'
	};

	beforeEach(module('app'));

	beforeEach(inject(function(cipherCollection, cipherUtils, vegenereService){
		mockCollection = cipherCollection;
		mockUtils = cipherUtils;
		cipherService = vegenereService;
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
