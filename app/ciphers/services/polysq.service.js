'use strict';

//==============================================================================
//
//	Cipher/Code Name
//
//------------------------------------------------------------------------------
app.service('polysqService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		var Service = function(){
			this.details = {
				name: 'polysq',
				label: 'Polybius Square',
				description: 'A cipher where each alphanumeric (a-z, 0-9) character is represented by it\'s coordinates in a grid.',
				url: 'http://en.wikipedia.org/wiki/Polybius_square',
				addons: []
			};

			cipherCollection.add( this );
		};

		Service.prototype.run = function( args ){
			var _defaults = {
				isEncoding: true,
				string: '',
				addons: {}
			};

			var opts = utils.extendCopy(_defaults, args);
			var output = '';
			var alphanumeric = utils.ALPHANUMERIC();
			var alphagrid = utils.ALPHAGRID();
			var alphaGridSize = alphagrid.length - 1;
			var increment = (opts.isEncoding) ? 1 : 2;

			opts.string = opts.string.replace(/[\s]+/gi, '');

			utils.eachCharacter(opts.string, increment, function(i, char){
				if(opts.isEncoding === true){
					char = char.toLowerCase();
					if( char.match(/^[a-z0-9]$/) ){
						var letterPos = alphanumeric.indexOf(char.toString()) + 1;
						var pos1 = Math.ceil(letterPos / alphaGridSize);
						var pos2 = (letterPos % alphaGridSize === 0) ? alphaGridSize : letterPos % alphaGridSize;
						output += pos1 + '' + pos2 + ' ';
					}
				} else {
					var char1 = char;
					var char2 = opts.string.charAt(i + 1);

					var isValidPair = char1.match(/^[1-6]$/) && char2.match(/^[1-6]$/);
					var letter = alphagrid[char1][char2];

					if( isValidPair && typeof letter !== 'undefined'){
						output += letter;
					}
				}
			});

			return output;
		};

		return new Service();
	}
]);
