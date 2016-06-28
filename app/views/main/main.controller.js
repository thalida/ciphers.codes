'use strict';

var $requires = [
	'$scope',
	'$sce',
	'FILLER_TEXT',
	'cipherCollection',
	'cipherUtils'
].concat( require('../../services/ciphers') );

var MainController = function($scope, $sce, FILLER_TEXT, cipherCollection, cipherUtils) {
	window.scroll(0, 0);

	var main = this;

	main.init = function(){
		main.ciphers.init();
		main.fillers.init();

		main.input = main.fillers.selected.text;
		main.output = {};

		window.scroll(0, 0);

		main.ciphers.run();
	}

	main.ciphers = {
		list: cipherCollection.get(),
		selected: null,
		default: null,
		addons: {},
		isEncoding: true,
		validAddons: true,
		encodingToggle: {
			on: {
				value: true,
				label: 'Encode'
			},
			off: {
				value: false,
				label: 'Decode'
			}
		},
		init: function(){
			this.default = this.list.caesar;
			this.selected = this.default;

			this.addons = this.selected.details.addons.reduce(function(obj, addon, i){
				obj[addon.name] = addon.default;
				return obj;
			}, {});
		},
		run: function(){
			if( typeof main.ciphers.selected === 'undefined'
				|| main.ciphers.selected === null
				|| angular.equals({}, main.ciphers.selected)
			){
				return;
			}

			var params = {
				string: main.input,
				isEncoding: main.ciphers.isEncoding
			};

			if( !angular.equals({}, main.ciphers.addons) ){
				params.addons = main.ciphers.addons;
			}

			main.output.text = main.ciphers.selected.run( params );
			var formattedText = main.output.text.replace(/\r?\n/g, '<br />');
			main.output.html = $sce.trustAsHtml( formattedText );
		}
	}


	main.fillers = {
		list: FILLER_TEXT,
		listById: {},
		selected: null,
		default: null,
		init: function(){
			this.createListById();

			this.default = this.listById.default;
			this.selected = this.default;
		},
		createListById: function(){
			for( var i = 0; i < this.list.length; i += 1 ){
				var filler = this.list[i];
				this.listById[filler.id] = filler;
			}
		}
	}


	main.events = {
		onCipherChange: function( cipher ){
			main.ciphers.selected = cipher;
			main.output = {};
			main.ciphers.addons = main.ciphers.selected.details.addons.reduce(function(obj, addon, i){
				obj[addon.name] = addon.default;
				return obj;
			}, {});

			main.ciphers.run();
		},

		onIsEncodingChange: function( isEncoding ){
			main.ciphers.isEncoding = isEncoding;
			main.ciphers.run();
		},

		onFillerChange: function( fill ){
			main.fillers.selected = fill;
			main.input = main.fillers.selected.text;

			main.ciphers.run();
		},

		onAddonChange: function(addon, value ){
			main.ciphers.addons[addon.name] = value;

			if( addon.type === 'key' && main.ciphers.addons.key ){
				var keyArr = main.ciphers.addons.key.replace(/[^A-Za-z]+/gi, '').toLowerCase().split('');
				main.ciphers.addons.key = cipherUtils.createSet( keyArr ).join('');
			}

			if( addon.validation && main.ciphers.validAddons === true ){
				main.ciphers.validAddons = addon.validation( value ) === true;
			}

			main.ciphers.run();
		},

		onInputChange: function( text ){
			main.input = text;
			main.fillers.selected = main.fillers.listById.none;
			main.ciphers.run();
		}
	};

	main.init();
}

MainController.$inject = $requires;
module.exports = MainController;
