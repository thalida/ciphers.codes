'use strict';

//==============================================================================
//
//	Keyed Substitution
//
//------------------------------------------------------------------------------
app.service('keyedsubService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		var Service = function(){
			this.details = {
				name: 'keyedsub',
				label: 'Keyed Substitution',
				description: 'A monoalphabetic substitution cipher, where a keyword placed into beginning of the alphabet, and any duplicated letters are removed.',
				url: 'http://en.wikipedia.org/wiki/Keyword_cipher',
				addons: [
					{
						type: 'key',
						label: 'Key',
						placeholder: 'Enter your key...'
					}
				]
			};

			cipherCollection.add( this );
		};

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
			var output = '';
			var key = opts.addons.key + '';
			var keyedAlpha = utils.makeKeyedAlpha(key);

			utils.eachCharacter(opts.string, function(i, char, isUpper){
				if( utils.isLetter(char) ){
					var letterPos;
					var letterArr = (opts.isEncoding === true) ? alpha : keyedAlpha;
					var encodedLetterArr = (opts.isEncoding === true) ? keyedAlpha : alpha;

					letterPos = letterArr.indexOf( char.toLowerCase() );
					char = encodedLetterArr[letterPos];
				}

				output += utils.setCase(char, isUpper);
			});

			return output;
		};

		return new Service();
	}
]);
