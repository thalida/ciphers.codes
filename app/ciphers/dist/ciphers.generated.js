'use strict';

app.service('cipherCollection', [
	function(){
		var Ciphers = function(){
			this.ciphers = [];
			this.totalCiphers = this.ciphers.length;
		};

		Ciphers.prototype.add = function( cipher ){
			this.ciphers[cipher.details.name] = cipher;
			this.totalCiphers = this.ciphers.length;
		};

		Ciphers.prototype.get = function(){
			return this.ciphers;
		};

		return new Ciphers();
	}
]);

'use strict';

app.service('cipherUtils', [
	function(){
		var _alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		var _alphanumeric = _alpha.concat(['0','1','2','3','4','5','6','7','8','9']);
		var _alphagrid = (function(){
			var alphagrid = new Array(6);
			var index = 0;

			for( var i = 1; i <= 6; i += 1 ){
				alphagrid[i] = new Array(6);
				for( var j = 1; j <= 6; j += 1 ){
					alphagrid[i][j] = _alphanumeric[index];
					index += 1;
				}
			}

			return alphagrid;
		})();

		var utils = {};

		utils.ALPHA = function(){
			return angular.copy( _alpha );
		};

		utils.ALPHAGRID = function(){
			return angular.copy(_alphagrid);
		};

		utils.ALPHANUMERIC = function(){
			return angular.copy( _alphanumeric );
		};

		utils.TOTAL_ALPHA = (function(){
			return _alpha.length;
		})();


		utils.setCase = function(char, makeUpperCase){
			return (makeUpperCase === true) ? char.toUpperCase() : char;
		};

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

		utils.extendCopy = function(obj1, obj2){
			return angular.extend({}, obj1, obj2);
		};

		utils.find = function( item, array ){
			for(var i = 0; i < array.length; i += 1){
				for(var j = 0; j < array.length; j += 1){
					if(item == array[i][j]){
						return { x: i, y: j };
					}
				}
			}
			return false;
		};

		utils.isLetter = function( str ){
			return str.match(/^[A-Za-z]$/);
		};

		utils.makeKeyedAlpha = function( key ){
			var alpha = angular.copy( utils.alpha );
			var keyedAlpha = (key != '' && key != null) ? key.split('') : [];

			$.each(keyedAlpha, function(index, letter){
				var n = jQuery.inArray(letter.toLowerCase(),alpha);
				alpha.splice(n,1);
			});

			keyedAlpha = keyedAlpha.concat(alpha);

			return keyedAlpha;
		};

		utils.mod = function(a, b){
			return ((a % b) + b) % b;
		};

		return utils;
	}
]);

'use strict';

//==============================================================================
//
//	Cipher/Code Name
//
//------------------------------------------------------------------------------
app.service('exampleService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		var Service = function(){
			this.details = {
				name: 'example',
				label: 'Example Foo Bar',
				addons: [],
				description: 'Lorem ipsum dolor this is an example cipher.',
				url: 'example.com/example_foo_bar'
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

			return output;
		};

		return new Service();
	}
]);

'use strict';

//==============================================================================
//
//	Cipher/Code Name
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

'use strict';

//==============================================================================
//
//	Caesar Cipher
//
//------------------------------------------------------------------------------
app.service('caesarService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
		var Cipher = function(){
			this.details = {
				name: 'caesar',
				label: 'Caesar',
				addons: [
					{
						name: 'shift',
						label: 'Shift by',
						type: 'number',
						defaultVal: 1
					}
				],
				description: 'A simple substitution cipher in which the alphabet is shifted up or down a specified number of positions.',
				url: 'http://en.wikipedia.org/wiki/Caesar_cipher'
			};

			cipherCollection.add( this );
		};

		Cipher.prototype.run = function( args ){
			var _defaults = {
				isEncoding: true,
				string: '',
				addons: {
					shift: 1
				}
			};

			var opts = utils.extendCopy(_defaults, args);
			var	alpha = utils.ALPHA();
			var shift = parseInt(opts.addons.shift, 10);
			var output = '';

			utils.eachCharacter(opts.string, function( i, char, isUpper ){
				if( utils.isLetter(char) ){
					var letterPos = alpha.indexOf( char.toLowerCase() );
					var direction = (opts.isEncoding === true ) ? 1 : -1;
					var newLetterPos = letterPos + (direction * shift);

					if(newLetterPos >= utils.TOTAL_ALPHA ){
						newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA);
					} else if(newLetterPos < 0 ){
						newLetterPos = utils.TOTAL_ALPHA + newLetterPos;
					}

					char = alpha[newLetterPos];
				}

				output += utils.setCase(char, isUpper);
			}.bind(this));

			return output;
		};

		return new Cipher();
	}
]);
