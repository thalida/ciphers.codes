'use strict';

//==============================================================================
//
//	Caesar Cipher
//
//------------------------------------------------------------------------------
app.service('caesarCipher', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		var Cipher = function(){
			this.details = {
				name: 'caesar',
				label: 'Caesar',
				addons: [
					{
						type: 'number',
						label: 'Shift by',
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
			var	alpha = utils.alpha();
			var shift = parseInt(opts.addons.shift, 10);
			var output = '';

			utils.eachCharacter(opts.string, function( i, char, isUpper ){
				if( char.match(/^[A-Za-z]$/) ){
					var letterPos = alpha.indexOf( char.toLowerCase() );
					var direction = (opts.isEncoding === true ) ? 1 : -1;
					var newLetterPos = letterPos + (direction * shift);
					var totalLetters = alpha.length;

					if(newLetterPos >= totalLetters){
						newLetterPos = utils.mod(newLetterPos, totalLetters);
					} else if(newLetterPos < 0 ){
						newLetterPos = totalLetters + newLetterPos;
					}

					char = alpha[newLetterPos];
				}

				output += (isUpper === true) ? char.toUpperCase() : char;
			});

			return output;
		};

		return new Cipher();
	}
]);
