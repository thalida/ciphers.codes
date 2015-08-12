'use strict';

//==============================================================================
//
//	Caesar Cipher
//
//------------------------------------------------------------------------------
app.service('caesarService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		var Cipher = function(){
			this.details = {
				name: 'caesar',
				label: 'Caesar',
				addons: [
					{
						name: 'shift',
						label: 'Shift by',
						type: 'number',
						defaultVal: 1
					}
				],
				description: 'A simple substitution cipher in which the alphabet is shifted up or down a specified number of positions.',
				url: 'http://en.wikipedia.org/wiki/Caesar_cipher'
			};

			cipherCollection.add( this );
		};

		Cipher.prototype.run = function( args ){
			var _defaults = {
				isEncoding: true,
				string: '',
				addons: {
					shift: 1
				}
			};

			var opts = utils.extendCopy(_defaults, args);
			var	alpha = utils.ALPHA();
			var shift = parseInt(opts.addons.shift, 10);
			var output = '';

			utils.eachCharacter(opts.string, function( i, char, isUpper ){
				if( utils.isLetter(char) ){
					var letterPos = alpha.indexOf( char.toLowerCase() );
					var direction = (opts.isEncoding === true ) ? 1 : -1;
					var newLetterPos = letterPos + (direction * shift);

					if(newLetterPos >= utils.TOTAL_ALPHA ){
						newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA);
					} else if(newLetterPos < 0 ){
						newLetterPos = utils.TOTAL_ALPHA + newLetterPos;
					}

					char = alpha[newLetterPos];
				}

				output += utils.setCase(char, isUpper);
			}.bind(this));

			return output;
		};

		return new Cipher();
	}
]);
