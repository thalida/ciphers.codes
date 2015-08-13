'use strict';

//==============================================================================
//
//	Mason
// 		Converts each letter into a symbol based on its position in a grid
// 		A special font is being used for this cipher, so it currently
// 		just return the letter as is
//
//------------------------------------------------------------------------------
app.service('masonService', [
	'cipherCollection',
	'cipherUtils',
	function(cipherCollection, utils){
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
				string: ''
			};
			var opts = utils.extendCopy(_defaults, args);
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
]);