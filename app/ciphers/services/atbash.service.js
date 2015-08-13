'use strict';

//==============================================================================
//
//	Atbash
//
//------------------------------------------------------------------------------
app.service('atbashService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
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
					var letterPos = alpha.indexOf( char.toLowerCase() );
					var newLetterPos = utils.TOTAL_ALPHA - letterPos - 1;
					char = alpha[newLetterPos];
				}

				output += utils.setCase(char, isUpper);
			}.bind(this));

			return output;
		};

		return new Service();
	}
]);
