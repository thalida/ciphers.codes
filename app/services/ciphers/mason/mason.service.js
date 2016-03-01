'use strict';

//==============================================================================
//
//	Mason
// 		Converts each letter into a symbol based on its position in a grid
// 		A special font is being used for this cipher, so it currently
// 		just return the letter as is
//
//------------------------------------------------------------------------------
var $requires = [
	'cipherCollection',
	'cipherUtils'
];

var _service = function(cipherCollection, utils){
	//	@constructor
	// 		Setup the details and private variables for the cipher
	//----------------------------------------------------------------------
	var Service = function(){
		this.details = {
			name: 'mason',
			label: 'Masonic',
			addons: [],
			desc: 'A geometric simple substitution cipher which exchanges letters for symbols which are fragments of a grid.',
			url: 'http://en.wikipedia.org/wiki/Pigpen_cipher'
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
			useFont: true,
		};
		var opts = utils.extendCopy(_defaults, args);

		if( opts.useFont === true ){
			return angular.copy(opts.string + '\r\n');
		}

		var output = '';

		utils.eachCharacter(opts.string, function(i, char){
			char = char.toLowerCase();
			if( opts.isEncoding === true && char.match(/^[a-z]$/) ){
				char = '<span class="mason_text">'+char+'</span>';
			}
			output += char;
		});

		return output;
	};

	return new Service();
}

_service.$inject = $requires;
module.exports = _service;
