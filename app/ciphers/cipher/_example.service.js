'use strict';

//==============================================================================
//
//	Cipher/Code Name
//
//------------------------------------------------------------------------------

app.service('exampleCipher', [
	'cipherCollection',
	'cipherUtils'
	function(cipherCollection, utils){
		var Cipher = function(){
			this.about = {
				name: 'Example Cipher',
				url: 'example.com/examplecipher',
				description: 'Lorem ipsum dolor this is an example cipher.'
			};

			cipherCollection.add( this );
		};

		Cipher.prototype._privateMethod = function(){

		};

		Cipher.prototype.run = function( args ){
			var _defaults = {
				isEncoding: true,
				string: ''
			};
			var opts = angular.extend({}, _defaults, args);

			this._privateMethod();

			return 'encoded/decoded string'
		};

		return new Cipher();
	}
]);
