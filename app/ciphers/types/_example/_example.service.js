'use strict';

//==============================================================================
//
//	Cipher/Code Name
// 		A quick summary of the cipher
//
//------------------------------------------------------------------------------
app.service('exampleService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
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
]);
