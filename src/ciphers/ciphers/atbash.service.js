'use strict';

//==============================================================================
//
//	Atbash
//		A simple cipher wherein the alphabet is reversed.
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
			name: 'atbash',
			label: 'Atbash',
			addons: [],
			description: 'A simple substitution cipher orginally created for the Hebrew alphabet, when converted to work with the Latin Alphabet (abc), this cipher reverses the alphabet so that the cipher alphabet is now "zyxwvutsrqponmlkjihgfedcba".',
			link: 'http://en.wikipedia.org/wiki/Atbash'
		};

		cipherCollection.add( this );
	};

	//	@run
	//		Encodes/Decodes a string w/ the given arguments
	//----------------------------------------------------------------------
	Service.prototype.run = function( args ){
		var _defaults = {
			isEncoding: true,
			string: ''
		};
		var opts = utils.extendCopy(_defaults, args);
		var alpha = utils.ALPHA();
		var output = '';

		utils.eachCharacter(opts.string, function(i, char, isUpper){
			if( utils.isLetter(char) ){
				// Get the current position in the alphabet
				var letterPos = alpha.indexOf( char.toLowerCase() );

				// Get the position from the other end of the alphabet
				var newLetterPos = utils.TOTAL_ALPHA - letterPos - 1;

				char = alpha[newLetterPos];
			}

			// If the character was uppercase, make it so again
			output += utils.setCase(char, isUpper);
		}.bind(this));

		return output;
	};

	return new Service();
}

_service.$inject = $requires;
module.exports = _service;
