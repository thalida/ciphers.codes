'use strict';

//==============================================================================
//
//	Affine
//
//------------------------------------------------------------------------------
app.service('affineService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
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
						type: 'number',
						defaultVal: 1
					}
				]
			};

			this._coprime = 5;

			cipherCollection.add( this );
		};

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
				if( utils.isLetter(char) ){
					var letterPos = alpha.indexOf( char.toLowerCase() );
					var newLetterPos;

					if(opts.isEncoding === true){
						newLetterPos = (this._coprime * letterPos) + shift;
					}else{
						newLetterPos = (utils.TOTAL_ALPHA - this._coprime) * (letterPos - shift);
					}

					newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA);
					char = alpha[newLetterPos];
				}

				output += utils.setCase(char, isUpper);
			}.bind(this));

			return output;
		};

		return new Service();
	}
]);
