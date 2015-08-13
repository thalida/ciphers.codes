'use strict';

//==============================================================================
//
//	Playfair
//
//------------------------------------------------------------------------------
app.service('playfairService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
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

			this._keyedArrSize = 5;
			this._keyedAlphas = [];

			cipherCollection.add( this );
		};

		Service.prototype._getKeyedAlpha = function( key ){
			if( this._keyedAlphas.indexOf(key) >= 0 ){
				return this._keyedAlphas[key];
			}

			var keyedAlpha = utils.makeKeyedAlpha( key );
			var keyedIdx = 0;

			var arrSize = this._keyedArrSize;
			var alphaGrid = new Array( arrSize );

			for(var i = 0; i < arrSize; i += 1){
				alphaGrid[i] = new Array( arrSize );

				for(var j = 0; j < arrSize; j += 1){
					if( keyedAlpha[keyedIdx] !== 'j' ){
						alphaGrid[i][j] = keyedAlpha[keyedIdx];
					} else {
						j -= 1;
					}

					keyedIdx += 1;
				}
			}

			this._keyedAlphas[key] = alphaGrid;

			return alphaGrid;
		};

		Service.prototype._strToArr = function(string, isEncoding){
			var strlen = string.length;
			var strIdx = 0;
			var strArr = [];
			var arrSize = Math.floor(strlen / 2);
			if( strlen % 2 === 1 ){
				arrSize += 1;
			}

			for(var i = 0; i < arrSize; i += 1){
				strArr[i] = new Array(2);
				strArr[i][0] = string.charAt(strIdx);
				strArr[i][1] = string.charAt(strIdx + 1);

				var firstChar = strArr[i][0];
				var secondChar = strArr[i][1];
				var nextPair = true;

				if( isEncoding === true ){
					if( firstChar === secondChar ){
						nextPair = false;
						strArr[i][1] = 'x';
						if(strlen % 2 === 0){
							arrSize += 1;
						}
						strIdx += 1;
						strlen += 1;
					} else if( strIdx + 1 >= string.length ){
						strArr[i][1] = 'x';
					}
				}

				if( nextPair ){
					strIdx += 2;
				}
			}

			return strArr;
		};

		Service.prototype._find =  function( item, array ){
			for(var i = 0; i < array.length; i += 1){
				for(var j = 0; j < array.length; j += 1){
					if( item === array[i][j] ){
						return { x: i, y: j };
					}
				}
			}
			return false;
		};

		Service.prototype._getCoord = function( coord, isEncoding ){
			var newCoord;
			var lastArrIdx = this._keyedArrSize - 1;

			newCoord = (isEncoding === true) ? (coord + 1) : (coord - 1);
			newCoord = (newCoord > lastArrIdx) ? 0 : newCoord;
			newCoord = (newCoord < 0) ? lastArrIdx : newCoord;

			return newCoord;
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

			// Remove any non letter character
			opts.string = opts.string.replace(/[^A-Za-z]+/gi, '').toLowerCase();
			opts.string = opts.string.replace(/[j]+/gi, 'i').toLowerCase();
			var keyword = opts.addons.key.replace(/[j]+/gi, 'i').toLowerCase();
			var alpha = this._getKeyedAlpha( keyword );
			var str = this._strToArr(opts.string, opts.isEncoding);

			for(var i = 0; i < str.length; i++){
				var char1 = {};
				char1.letter = (str[i][0] === 'j') ? 'i' : str[i][0];
				char1.coords = this._find(char1.letter, alpha);
				char1.newCoords = {x: null, y: null};

				var char2 = {};
				char2.letter = (str[i][0] === 'j') ? 'i' : str[i][1];
				char2.coords = this._find(char2.letter, alpha);
				char2.newCoords = {x: null, y: null};

				if(char1.coords.x === char2.coords.x){
					char1.newCoords.x = char2.newCoords.x = char1.coords.x;
					char1.newCoords.y = this._getCoord(char1.coords.y, opts.isEncoding);
					char2.newCoords.y = this._getCoord(char2.coords.y, opts.isEncoding);
				}else if(char1.coords.y === char2.coords.y){
					char1.newCoords.x = this._getCoord(char1.coords.x, opts.isEncoding );
					char2.newCoords.x = this._getCoord(char2.coords.x, opts.isEncoding );
					char1.newCoords.y = char2.newCoords.y = char1.coords.y;
				}else{
					char1.newCoords = {
						x: char1.coords.x,
						y: char2.coords.y
					};

					char2.newCoords = {
						x: char2.coords.x,
						y: char1.coords.y
					};
				}

				var letter1 = alpha[char1.newCoords.x][char1.newCoords.y];
				var letter2 = alpha[char2.newCoords.x][char2.newCoords.y];
				output += letter1 + letter2;
			}

			return output;
		};

		return new Service();
	}
]);
