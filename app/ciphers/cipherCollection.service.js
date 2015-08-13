'use strict';
//==============================================================================
//
//	Cipher Collection
// 		Collection of all of the ciphers available
//
//------------------------------------------------------------------------------
app.service('cipherCollection', [
	function(){
		//	@constructor
		// 		Setup the array to house the ciphers + the total count
		//----------------------------------------------------------------------
		var Ciphers = function(){
			this.ciphers = {};
			this.totalCiphers = 0;
		};

		//	@add
		// 		Add a cipher to the collection and update the total count
		//----------------------------------------------------------------------
		Ciphers.prototype.add = function( cipher ){
			this.ciphers[cipher.details.name] = cipher;
			this.totalCiphers += 1;
		};

		//	@get
		// 		Return the collection of ciphers
		//----------------------------------------------------------------------
		Ciphers.prototype.get = function(){
			return this.ciphers;
		};

		return new Ciphers();
	}
]);
