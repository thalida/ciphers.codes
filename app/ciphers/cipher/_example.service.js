'use strict';

//==============================================================================
//
//	Cipher/Code Name
//
//------------------------------------------------------------------------------
app.service('exampleCipher', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		var Cipher = function(){
			this.details = {
				name: 'example',
				label: 'Example Foo Bar',
				addons: [],
				description: 'Lorem ipsum dolor this is an example cipher.',
				url: 'example.com/example_foo_bar'
			};

			cipherCollection.add( this );
		};

		Cipher.prototype.run = function( args ){
			var _defaults = {
				isEncoding: true,
				string: '',
				addons: {}
			};
			var opts = utils.extendCopy(_defaults, args);
			var output = '';

			return output;
		};

		return new Cipher();
	}
]);
