'use strict';

//==============================================================================
//
//	Affine
// 		A simple shift cipher based on the Caesar cipher
//
//------------------------------------------------------------------------------
app.service('affineService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		//	@constructor
		// 		Setup the details and private variables for the cipher
		//----------------------------------------------------------------------
		var Service = function(){
			this.details = {
				name: 'affine',
				label: 'Affine',
				description: 'The affine cipher is a type of monoalphabetic substitution cipher, wherein each letter in an alphabet is mapped to its numeric equivalent, encrypted using a simple mathematical function, and converted back to a letter. (via Wikipedia)',
				url: 'http://en.wikipedia.org/wiki/Affine_cipher',
				addons: [
					{
						name: 'shift',
						label: 'Shift by',
						type: 'number'
					}
				]
			};

			// Used by the (en|de)coding function
			this._coprime = 5;

			// Add this cipher to the collection
			cipherCollection.add( this );
		};

		//	@run
		//		Encodes/Decodes a string w/ the given arguments
		//----------------------------------------------------------------------
		Service.prototype.run = function( args ){
			var _defaults = {
				isEncoding: true,
				string: '',
				addons: {
					shift: 1
				}
			};
			var opts = utils.extendCopy(_defaults, args);

			var alpha = utils.ALPHA();
			var shift = parseInt(opts.addons.shift, 10);

			var output = '';

			utils.eachCharacter(opts.string, function(i, char, isUpper){
				// If the current character is a letter, get the new position
				// of the letter in the alphabet based on if we are encoding/decoding
				if( utils.isLetter(char) ){
					var letterPos = alpha.indexOf( char.toLowerCase() );
					var newLetterPos;

					if(opts.isEncoding === true){
						newLetterPos = (this._coprime * letterPos) + shift;
					}else{
						newLetterPos = (utils.TOTAL_ALPHA - this._coprime) * (letterPos - shift);
					}

					// The new letter postion may be out of bounds, mod the letter to get the valid position.
					newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA);
					char = alpha[newLetterPos];
				}

				// If the character was orignally uppercase, make it uppercase again
				output += utils.setCase(char, isUpper);
			}.bind(this));

			return output;
		};

		return new Service();
	}
]);
