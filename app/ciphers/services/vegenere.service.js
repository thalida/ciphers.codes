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

		Service.prototype.run = function( args ){
			var _defaults = {
				isEncoding: true,
				string: '',
				addons: {
					key: ''
				}
			};
			var opts = utils.extendCopy(_defaults, args);
			var output = '';
			var alpha = utils.ALPHA();
			var string = opts.string.replace(/[^A-Za-z]+/gi, '').toLowerCase();
			var keySimple = opts.addons.key.replace(/[\s]+/gi, '').toLowerCase();
			var key = keySimple;

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
				var alphaPos = alpha.indexOf(char);
				var keyPos = alpha.indexOf(key.charAt(i));

				keyPos = (keyPos === -1) ? 0 : keyPos;

				var pos = (opts.isEncoding === true) ? (alphaPos + keyPos) : (alphaPos - keyPos);
				output += alpha[utils.mod(pos, 26)];
			});

			return output;
		};

		return new Service();
	}
]);
