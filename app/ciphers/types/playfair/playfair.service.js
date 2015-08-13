'use strict';

//==============================================================================
//
//	Playfair
// 		Converts the alphabet into a 5x5 grid of letters and eycrypts based
// 		on the position of a pair of letters w/ respect to each other in the grid
//
//------------------------------------------------------------------------------
app.service('playfairService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		//	@constructor
		// 		Setup the details and private variables for the cipher
		//----------------------------------------------------------------------
		var Service = function(){
			this.details = {
				name: 'playfair',
				label: 'Playfair',
				addons: [
					{
						type: 'key',
						label: 'Key',
						placeholder: 'Enter your key...'
					}
				],
				description: 'The playfair cipher combines the letters i and j so that the alphabet can fit on a 5x5 grid, as a result any "j" you use in your text, will be treated like an "i". In addition, please read more on how the Playfair cipher is encoded and decoded.',
				url: 'http://en.wikipedia.org/wiki/Playfair_cipher'
			};

			this._placeholderChar = 'x';
			this._keyedArrSize = 5;
			this._keyedAlphas = [];

			cipherCollection.add( this );
		};

		//	@_getKeyedAlpha
		//		Add the key to the alphabet and then convert into a 5x5 array
		//----------------------------------------------------------------------
		Service.prototype._getKeyedAlpha = function( key ){
			// Return if we've already generated the grided keyed alphabet
			if( typeof this._keyedAlphas[key] !== 'undefined' ){
				return this._keyedAlphas[key];
			}

			// Create the flat keyed alphabet
			var keyedAlpha = utils.makeKeyedAlpha( key );
			// The current index of the keyedAlphabet
			var keyedIdx = 0;

			// What size grid are we making
			var arrSize = this._keyedArrSize;
			var alphaGrid = new Array( arrSize );

			for( var i = 0; i < arrSize; i += 1 ){
				alphaGrid[i] = new Array( arrSize );
				for( var j = 0; j < arrSize; j += 1 ){
					// If we're not on 'j' in the keyed alphabet then add the
					// current letter in the key to it's position on the grid
					if( keyedAlpha[keyedIdx] !== 'j' ){
						alphaGrid[i][j] = keyedAlpha[keyedIdx];
					} else {
						// We encounted and skiped j, so lets NOT count this
						// postion as filled on the grid
						j -= 1;
					}

					// Move onto the next letter in the keyed alphabet
					keyedIdx += 1;
				}
			}

			// Cache this gridded keyed alphabet
			this._keyedAlphas[key] = alphaGrid;

			return alphaGrid;
		};

		//	@_strToPairs
		//		Convert a given string in to an array of pairs
		// 		X's are used to fill in the missing spot of a pair and also
		// 		to seperate out duplicate letters.
		// 		Example: Hellos => [[h,e],[l,x],[l,o],[s,x]]
		//----------------------------------------------------------------------
		Service.prototype._strToPairs = function(string, isEncoding){
			var strPairs = [];

			for(var i = 0; i < string.length; i += 2){
				var currLetter = string.charAt( i );
				var nextLetter = string.charAt(i + 1);

				if( isEncoding === true && (currLetter === nextLetter || nextLetter.length === 0) ){
					nextLetter = this._placeholderChar;
					i -= 1;
				}

				strPairs.push([currLetter, nextLetter]);
			}

			return strPairs;
		};

		//	@_getCoords
		//		Get the current coordinates of the letter in the array
		//----------------------------------------------------------------------
		Service.prototype._getCoords =  function( str, array ){
			var arrSize = array.length;

			for( var i = 0; i < arrSize; i += 1 ){
				for( var j = 0; j < arrSize; j += 1 ){
					if( str === array[i][j] ){
						return { x: i, y: j };
					}
				}
			}

			return false;
		};

		//	@_calcNewCoord
		//		Calculate the new coordinate based on if we're encoding/decoding
		//----------------------------------------------------------------------
		Service.prototype._calcNewCoord = function( coord, isEncoding ){
			var newCoord;

			// Get the last valid index of the array
			var lastArrIdx = this._keyedArrSize - 1;

			// Add/subtract based on the action we're peforming
			newCoord = (isEncoding === true) ? (coord + 1) : (coord - 1);

			// Make sure the new coords are within the bounds of the grid
			newCoord = (newCoord > lastArrIdx) ? 0 : newCoord;
			newCoord = (newCoord < 0) ? lastArrIdx : newCoord;

			return newCoord;
		};

		Service.prototype._formatChar = function(alpha, letter){
			var char = {};

			char.letter = (letter === 'j') ? 'i' : letter;
			char.coords = this._getCoords(char.letter, alpha);
			char.newCoords = {x: null, y: null};

			return char;
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
			var output = '';

			// Remove any non letter character
			opts.string = opts.string.replace(/[^A-Za-z]+/gi, '').toLowerCase();
			// Replace any j's with i's
			opts.string = opts.string.replace(/[j]+/gi, 'i').toLowerCase();

			// Replace any j's with i's in the key
			var keyword = opts.addons.key.replace(/[j]+/gi, 'i').toLowerCase();

			// Created a grid based keyed version of the alphabet
			var alpha = this._getKeyedAlpha( keyword );

			// Convert the string to an array of pairs
			var str = this._strToPairs(opts.string, opts.isEncoding);

			for(var i = 0; i < str.length; i++){
				// Get the info for the first + second characters of the pair
				var char1 = this._formatChar( alpha, str[i][0] );
				var char2 = this._formatChar( alpha, str[i][1] );

				// If the two letters are on the same row
				if(char1.coords.x === char2.coords.x){
					// Keep the same x coords
					char1.newCoords.x = char2.newCoords.x = char1.coords.x;
					// Calculate the new y coord for each letter
					char1.newCoords.y = this._calcNewCoord(char1.coords.y, opts.isEncoding);
					char2.newCoords.y = this._calcNewCoord(char2.coords.y, opts.isEncoding);
				}

				// If the two letters share the same column
				else if(char1.coords.y === char2.coords.y){
					// Keep the same y coords
					char1.newCoords.y = char2.newCoords.y = char1.coords.y;
					// Calculate the the nex x coord for each letter
					char1.newCoords.x = this._calcNewCoord(char1.coords.x, opts.isEncoding );
					char2.newCoords.x = this._calcNewCoord(char2.coords.x, opts.isEncoding );
				}

				// The two letters are on a diagonal from one another
				else{
					char1.newCoords = {x: char1.coords.x, y: char2.coords.y};
					char2.newCoords = {x: char2.coords.x, y: char1.coords.y};
				}

				// Get the letters corresponding to each coord in the grid
				var letter1 = alpha[char1.newCoords.x][char1.newCoords.y];
				var letter2 = alpha[char2.newCoords.x][char2.newCoords.y];
				output += letter1 + letter2;
			}

			return output;
		};

		return new Service();
	}
]);
