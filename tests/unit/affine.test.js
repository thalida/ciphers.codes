'use strict';

describe('affine service', function(){
	var mockCollection;
	var mockUtils;
	var cipherService;

	var cipherArgs = {
		addons: {shift: 3}
	};
	var cipherStrs = {
		normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
		shiftThree: 'DinsxchmrwbglqvafkpuzejotY - 0123456789',
		shiftNull: 'AfkpuzejotydinsxchmrwbglqV - 0123456789',
	};

	beforeEach(angular.mock.module('app'));

	beforeEach(angular.mock.inject(function(cipherCollection, cipherUtils, affineService){
		mockCollection = cipherCollection;
		mockUtils = cipherUtils;
		cipherService = affineService;
	}));

	it('should encode alphabet by 3', function() {
		cipherArgs.isEncoding = true;
		cipherArgs.string = cipherStrs.normal;

		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.shiftThree);
	});

	it('should decode alphabet by 3', function() {
		cipherArgs.isEncoding = false;
		cipherArgs.string = cipherStrs.shiftThree;

		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.normal);
	});

	it('should encode alphabet by 0', function() {
		cipherArgs.isEncoding = true;
		cipherArgs.string = cipherStrs.normal;
		cipherArgs.addons.shift = null;

		expect(cipherService.run(cipherArgs)).toEqual(cipherStrs.shiftNull);
	});
});
