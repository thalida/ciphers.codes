'use strict';

//==============================================================================
//
//	Affine
// 		A simple shift cipher based on the Caesar cipher
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
		var self = this;
		this.allowedCoprimes = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
		this.details = {
			name: 'affine',
			label: 'Affine',
			description: 'The affine cipher is a type of monoalphabetic substitution cipher, wherein each letter in an alphabet is mapped to its numeric equivalent, encrypted using a simple mathematical function, and converted back to a letter. (via Wikipedia)',
			url: 'http://en.wikipedia.org/wiki/Affine_cipher',
			addons: [
				{
					name: 'coprime',
					label: 'Co-prime',
					tooltip: 'The coprimes of 26 are: ' + this.allowedCoprimes.join(', '),
					type: 'number',
					default: 5,
					validation: function( n ){
						return self.allowedCoprimes.indexOf( parseInt(n, 10) ) >= 0;
					}
				},
				{
					name: 'shift',
					label: 'Shift',
					tooltip: 'Enter a number (positive/negative) to shift the alphabet by.',
					type: 'number',
					default: 2,
				}
			]
		};

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
				shift: 0,
				coprime: 5
			}
		};
		var opts = utils.extendCopy(_defaults, args);

		var alpha = utils.ALPHA();
		var shift = utils.makeValidInt(opts.addons.shift, _defaults.addons.shift);
		var coprime = utils.makeValidInt(opts.addons.coprime, _defaults.addons.coprime);
		var output = '';

		utils.eachCharacter(opts.string, function(i, char, isUpper){
			// If the current character is a letter, get the new position
			// of the letter in the alphabet based on if we are encoding/decoding
			if( utils.isLetter(char) ){
				var letterPos = alpha.indexOf( char.toLowerCase() );
				var newLetterPos;

				if(opts.isEncoding === true){
					newLetterPos = (coprime * letterPos) + shift;
				}else{
					newLetterPos = (utils.TOTAL_ALPHA - coprime) * (letterPos - shift);
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

_service.$inject = $requires;
module.exports = _service;
