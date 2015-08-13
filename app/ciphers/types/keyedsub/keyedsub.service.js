'use strict';

//==============================================================================
//
//	Keyed Substitution
//		A key is placed in the beginning of the alphabet and the strings are
// 		encoded based on the position of the letters in this keyed alphabet.
//
//------------------------------------------------------------------------------
app.service('keyedsubService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		//	@constructor
		// 		Setup the details and private variables for the cipher
		//----------------------------------------------------------------------
		var Service = function(){
			this.details = {
				name: 'keyedsub',
				label: 'Keyed Substitution',
				description: 'A monoalphabetic substitution cipher, where a keyword placed into beginning of the alphabet, and any duplicated letters are removed.',
				url: 'http://en.wikipedia.org/wiki/Keyword_cipher',
				addons: [
					{
						type: 'key',
						name: 'key',
						label: 'Key',
						placeholder: 'Enter your key...'
					}
				]
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
			var key = utils.makeValidKey(opts.addons.key, _defaults.addons.key);

			// Create an alphabet w/ this key in the beginning of it
			var keyedAlpha = utils.makeKeyedAlpha(key);

			var output = '';

			utils.eachCharacter(opts.string, function(i, char, isUpper){
				if( utils.isLetter(char) ){
					// Figure out what alphabet the current string is based on
					var letterArr = (opts.isEncoding === true) ? alpha : keyedAlpha;

					// What alphabet are we converting the string to
					var encodedLetterArr = (opts.isEncoding === true) ? keyedAlpha : alpha;

					// Get the current postion of the letter in the array
					var letterPos = letterArr.indexOf( char.toLowerCase() );

					// Get the letter in the same postion of the ecodedAlphabet
					char = encodedLetterArr[letterPos];
				}

				output += utils.setCase(char, isUpper);
			});

			return output;
		};

		return new Service();
	}
]);
