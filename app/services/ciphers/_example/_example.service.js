'use strict';

//==============================================================================
//
//	Cipher/Code Name
// 		A quick summary of the cipher
//
//------------------------------------------------------------------------------
var $requires = [
	'cipherCollection',
	'cipherUtils'
];

var _service = function(cipherCollection, utils){
	//	@constructor
	// 		Setup the details and private variables for the cipher
	//----------------------------------------------------------------------
	var Service = function(){
		this.details = {
			name: 'example',
			label: 'Example Foo Bar',
			addons: [],
			description: 'Lorem ipsum dolor this is an example cipher.',
			url: 'example.com/example_foo_bar'
		};

		cipherCollection.add( this );
	};

	//	@run
	//		Encodes/Decodes a string w/ the given arguments
	//----------------------------------------------------------------------
	Service.prototype.run = function( args ){
		var _defaults = {
			isEncoding: true,
			string: '',
			addons: {}
		};
		var opts = utils.extendCopy(_defaults, args);
		var output = '';

		return output;
	};

	return new Service();
}

_service.$inject = $requires;
module.exports = _service;
