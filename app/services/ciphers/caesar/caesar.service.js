'use strict';

//==============================================================================
//
//	Caesar Cipher
//		This cipher shifts the letters in the alphabet by x (user defined value)
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
	var Cipher = function(){
		this.details = {
			name: 'caesar',
			label: 'Caesar',
			addons: [
				{
					name: 'shift',
					label: 'Shift',
					type: 'number',
					default: 10
				}
			],
			description: 'A simple substitution cipher in which the alphabet is shifted up or down a specified number of positions.',
			url: 'http://en.wikipedia.org/wiki/Caesar_cipher'
		};

		cipherCollection.add( this );
	};

	//	@run
	//		Encodes/Decodes a string w/ the given arguments
	//----------------------------------------------------------------------
	Cipher.prototype.run = function( args ){
		var _defaults = {
			isEncoding: true,
			string: '',
			addons: {
				shift: 0
			}
		};

		var opts = utils.extendCopy(_defaults, args);
		var	alpha = utils.ALPHA();
		var shift = utils.makeValidInt(opts.addons.shift, _defaults.addons.shift);
		var output = '';

		utils.eachCharacter(opts.string, function( i, char, isUpper ){
			if( utils.isLetter(char) ){
				// The current positin of the letter in the alphabet
				var letterPos = alpha.indexOf( char.toLowerCase() );

				// Which direction are we moving? (addition/subtraction)
				var direction = (opts.isEncoding === true ) ? 1 : -1;

				// Get the new letter position by shifting in the given direction
				var newLetterPos = letterPos + (direction * shift);

				// Mod the new postion in case we've gone past the bounds of the alphabet
				newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA);

				char = alpha[newLetterPos];
			}

			output += utils.setCase(char, isUpper);
		}.bind(this));

		return output;
	};

	return new Cipher();
}

_service.$inject = $requires;
module.exports = _service;
