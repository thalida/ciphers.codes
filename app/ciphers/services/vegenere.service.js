'use strict';

//==============================================================================
//
//	Vegenere
//
//------------------------------------------------------------------------------
app.service('vegenereService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		//	@constructor
		// 		Setup the details and private variables for the cipher
		//----------------------------------------------------------------------
		var Service = function(){
			this.details = {
				name: 'vegenere',
				label: 'Vigen&egrave;re',
				addons: [
					{
						type: 'key',
						label: 'Key',
						placeholder: 'Enter your key...'
					}
				],
				description: 'A simple polyalphabetic substitution cipher which uses a tableau composed of each of the 26 options for a Caesar Cipher.',
				url: 'http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher'
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
				addons: {
					key: ''
				}
			};
			var opts = utils.extendCopy(_defaults, args);
			var alpha = utils.ALPHA();

			//Remove any non letter characters from the string
			var string = opts.string.replace(/[^A-Za-z]+/gi, '').toLowerCase();
			// Remove any spaces from the key
			var keySimple = opts.addons.key.replace(/[\s]+/gi, '').toLowerCase();
			var key = keySimple;
			var output = '';


			//	Create a key that is as long as the string, by repeating the
			// 	letters of the passed key as many times as needed.
			var addCharToKey = function(i, char){
				if( key.length >= string.length ){
					return;
				}
				key += char;
			};
			while(key.length < string.length && keySimple.length > 0){
				utils.eachCharacter(keySimple, addCharToKey);
			}


			utils.eachCharacter(string, 1, function(i, char){
				// Get the position of the character in the alphabet
				var alphaPos = alpha.indexOf(char);
				// Get the char in the key at this position
				// Then get the position of that character in the regular alphabet
				var keyPos = alpha.indexOf(key.charAt(i));
				keyPos = (keyPos === -1) ? 0 : keyPos;

				var direction = (opts.isEncoding === true) ? 1 : -1;
				var pos = alphaPos + (direction * keyPos);
				output += alpha[utils.mod(pos, 26)];
			});

			return output;
		};

		return new Service();
	}
]);
