'use strict';

//==============================================================================
//
//	Polybius Square
//		The alphanumeric array is laided out in a 6x6 grid and each letter
// 		correspondes to it's coordinates in the gri.
// 		Example: a => 11, b => 12, c => 13 etc
//
//------------------------------------------------------------------------------
app.service('polysqService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		//	@constructor
		// 		Setup the details and private variables for the cipher
		//----------------------------------------------------------------------
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

		//	@run
		//		Encodes/Decodes a string w/ the given arguments
		//----------------------------------------------------------------------
		Service.prototype.run = function( args ){
			var _defaults = {
				isEncoding: true,
				string: '',
				addons: {}
			};

			var opts = utils.extendCopy(_defaults, args);
			var alphanumeric = utils.ALPHANUMERIC();
			var alphagrid = utils.ALPHAGRID();
			var alphaGridSize = alphagrid.length - 1; //the 0 index isn't used
			var output = '';

			// Remove all spaces from the string
			opts.string = opts.string.replace(/[\s]+/gi, '');

			// If we're encoding we need to go trough letter by letter. BUT,
			// If we're decoding we need to get each pair of numbers.
			var increment = (opts.isEncoding) ? 1 : 2;
			utils.eachCharacter(opts.string, increment, function(i, char){
				if(opts.isEncoding === true){
					// Find the character in the alphanumeric array, and based
					// on it's position calculate the x and y coords in the grid
					char = char.toLowerCase();
					if( char.match(/^[a-z0-9]$/) ){
						var letterPos = alphanumeric.indexOf(char.toString()) + 1;
						var x = Math.ceil(letterPos / alphaGridSize);
						var y = (letterPos % alphaGridSize === 0) ? alphaGridSize : letterPos % alphaGridSize;
						output += x + '' + y + ' ';
					}
				} else {
					// Get the x and y "characters" ex. 13 => x: 1, y: 3
					var x = char;
					var y = opts.string.charAt(i + 1);

					// Check if the x, y are valid numbers/a valid pair
					if( x.match(/^[1-6]$/) && y.match(/^[1-6]$/) ){
						// Find the letter in the grid
						var letter = alphagrid[x][y];
						if( typeof letter !== 'undefined' ){
							output += letter;
						}
					}
				}
			});

			return output.trim();
		};

		return new Service();
	}
]);
