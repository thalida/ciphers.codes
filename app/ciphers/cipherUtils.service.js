'use strict';

//==============================================================================
//
//	Cipher Utils
// 		General functions and variables to be used by some/all of the ciphers.
//
//------------------------------------------------------------------------------
app.service('cipherUtils', [
	function(){
		var _alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		var _alphanumeric = _alpha.concat(['0','1','2','3','4','5','6','7','8','9']);
		var _alphagrid = (function(){
			// We need to create a 6x6 grid of the alphanumeric characters
			var gridSize = 6;
			var alphagrid = new Array( gridSize );

			// Current index in the alphanumeric array
			var index = 0;

			// A should be at 1,1 NOT 0,0
			for( var i = 1; i <= gridSize; i += 1 ){
				alphagrid[i] = new Array( gridSize );

				for( var j = 1; j <= gridSize; j += 1 ){
					alphagrid[i][j] = _alphanumeric[index];
					index += 1;
				}
			}

			return alphagrid;
		})();
		var _cachedKeyedAlphas = [];

		var utils = {};

		//	ALPHA
		// 		Return a copy of the basic alphabet
		//----------------------------------------------------------------------
		utils.ALPHA = function(){
			return angular.copy( _alpha );
		};

		//	ALPHAGRID
		// 		Return a copy of the alphabet and numbers 0 - 9 in a 6 x 6 grid
		//----------------------------------------------------------------------
		utils.ALPHAGRID = function(){
			return angular.copy(_alphagrid);
		};

		//	ALPHANUMERIC
		// 		Return a copy of the alphabet & numbers 0 - 9 in an array
		//----------------------------------------------------------------------
		utils.ALPHANUMERIC = function(){
			return angular.copy( _alphanumeric );
		};

		//	TOTAL_ALPHA
		//		Set the total number of letters in the alphabet as a const
		//----------------------------------------------------------------------
		utils.TOTAL_ALPHA = (function(){
			return _alpha.length;
		})();

		//	@setCase( char, boolean )
		// 		Check if the char should be made uppercase, if so do so.
		//----------------------------------------------------------------------
		utils.setCase = function(char, makeUpperCase){
			return (makeUpperCase === true) ? char.toUpperCase() : char;
		};

		//	@eachCharacter( string, int, function )
		// 		Loop through a given string and call the passed function
		// 		with the current index, letter, and if that letter is uppercase.
		//----------------------------------------------------------------------
		utils.eachCharacter = function( string, increment, cb ){
			if( typeof increment === 'function' ){
				cb = increment;
				increment = 1;
			}

			for( var i = 0; i < string.length; i += increment ){
				var c = string.charAt(i);
				var isUpper = (c.match(/^[A-Z]$/)) ? true : false;

				if( typeof cb === 'function' ){
					cb(i, c, isUpper);
				}
			}
		};

		//	@extendCopy
		// 		Extend a given object, and save it to a new empty object.
		// 		This allows obj1 and obj2 to remain the same.
		//----------------------------------------------------------------------
		utils.extendCopy = function(obj1, obj2){
			return angular.extend({}, obj1, obj2);
		};

		//	@isLetter
		// 		Check if a given str has only letters
		//----------------------------------------------------------------------
		utils.isLetter = function( str ){
			return str.match(/^[A-Za-z]$/);
		};

		//	@makeKeyedAlpha
		// 		Create a keyed version of the alphabet - which is a common trick
		// 		among ciphers/codes.
		//
		// 		Example:
		// 			key: 'lorem'
		// 			keyed alphabet: loremabcdfghijknpqstuvwxyz
		//----------------------------------------------------------------------
		utils.makeKeyedAlpha = function( key ){
			if( typeof _cachedKeyedAlphas[key] !== 'undefined' ){
				return _cachedKeyedAlphas[key];
			}

			var alpha = utils.ALPHA();
			var keyedAlphabet = [];

			// Return the regular alphabet if no key
			if( key.length === 0 || key === null ){
				return alpha;
			}

			// Loop through each letter in the key -- and remove that letter
			// from the regular alphabet
			utils.eachCharacter(key, function(i, char){
				var n = alpha.indexOf(char.toLowerCase());
				alpha.splice(n, 1);
			});

			// Add the key + the rest of the alphabet
			keyedAlphabet = key.split('').concat(alpha);

			// Save this keyed alphabet
			_cachedKeyedAlphas[key] = keyedAlphabet;

			return keyedAlphabet;
		};

		utils.makeValidInt = function(currVal, defaultVal){
			if( angular.isNumber(currVal) ){
				return currVal;
			} else if( angular.isString(currVal) ){
				return parseInt( currVal, 10 );
			}

			return defaultVal;
		};

		utils.makeValidKey = function(currVal, defaultVal){
			if( angular.isString(currVal) ){
				return currVal.toLowerCase();
			}

			return defaultVal;
		};

		//	@mod
		// 		A fix for JS issues with modding a negative number
		//----------------------------------------------------------------------
		utils.mod = function(a, b){
			return ((a % b) + b) % b;
		};

		return utils;
	}
]);
