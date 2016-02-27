'use strict';

// describe('affine service', function(){
// 	var mockCollection;
// 	var mockUtils;
// 	var cipherService;

// 	var cipherArgs = {
// 		addons: {shift: 3}
// 	};
// 	var cipherStrs = {
// 		normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
// 		encoded: 'DinsxchmrwbglqvafkpuzejotY - 0123456789'
// 	};

// 	beforeEach(module('app'));

// 	beforeEach(inject(function(cipherCollection, cipherUtils, affineService){
// 		mockCollection = cipherCollection;
// 		mockUtils = cipherUtils;
// 		cipherService = affineService;
// 	}));

// 	it('should encode alphabet by 3', function() {
// 		cipherArgs.isEncoding = true;
// 		cipherArgs.string = cipherStrs.normal;

// 		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.encoded);
// 	});

// 	it('should decode alphabet by 3', function() {
// 		cipherArgs.isEncoding = false;
// 		cipherArgs.string = cipherStrs.encoded;

// 		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.normal);
// 	});
// });
