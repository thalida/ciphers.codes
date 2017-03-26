'use strict';

var $requires = [
	'$scope',
	'$sce',
	'$state',
	'$stateParams',
	'FILLER_TEXT',
	'cipherCollection',
	'cipherUtils'
].concat( require('../../services/ciphers') );

var MainController = function($scope, $sce, $state, $stateParams, FILLER_TEXT, cipherCollection, cipherUtils) {
	var main = this;

	main.init = function(){
		var settings = main.ciphers.parseShareUrl($stateParams.settings) || {};

		main.ciphers.init(settings);
		main.fillers.init(settings);

		if (settings && settings.opts && settings.opts.string
			&& typeof settings.opts.string === 'string' && settings.opts.string.length > 0
		) {
			main.input = settings.opts.string;
		} else {
			main.input = main.fillers.selected.text;
		}

		main.output = {};

		main.ciphers.run();
	}

	main.ciphers = {
		list: cipherCollection.get(),
		shareUrl: null,
		selected: null,
		default: null,
		addons: {},
		isEncoding: null,
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
		init: function (config) {
			config = config || {};

			this.default = this.list.caesar;

			if (config && config.cipher && typeof config.cipher === 'string' && config.cipher.length > 0) {
				this.selected = this.list[config.cipher];
			}

			if (typeof this.selected === 'undefined' || this.selected === null) {
				this.selected = this.default;
			}

			if (config && config.opts && typeof config.opts.isEncoding === 'boolean') {
				this.isEncoding = config.opts.isEncoding;
			}

			if (typeof this.isEncoding === 'undefined' || this.isEncoding === null) {
				this.isEncoding = true;
			}

			this.addons = this.selected.details.addons.reduce(function(obj, addon, i){
				obj[addon.name] = addon.default;
				return obj;
			}, {});

			if (config && config.opts && config.opts.addons) {
				this.addons = angular.extend({}, this.addons, config.opts.addons);
			}

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

			this.generateShareUrl({
				cipher: main.ciphers.selected.details.name,
				opts: params,
			});

			main.output.text = main.ciphers.selected.run( params );
			var formattedText = main.output.text.replace(/\r?\n/g, '<br />');
			main.output.html = $sce.trustAsHtml( formattedText );
		},
		generateShareUrl: function (json) {
			var jsonStr = JSON.stringify(json);
			var encoded = window.btoa(jsonStr);
			this.shareUrl = window.location.origin + '/?settings=' + encoded;
			$state.go($state.current.name, { settings: encoded }, { notify: false, reloadOnSearch: false });
		},
		parseShareUrl: function (str) {
			if (typeof str !== 'string' || str === null || str.length === 0) {
				return;
			}

			var settings;
			var settingsJson;

			try {
				settings = window.atob(str);
				settingsJson = JSON.parse(settings);
			} catch (e) {}

			return settingsJson;
		},
	}


	main.fillers = {
		list: FILLER_TEXT,
		listById: {},
		selected: null,
		default: null,
		init: function(config){
			this.createListById();

			this.default = this.listById.default;

			if (config && config.opts && config.opts.string
				&& typeof config.opts.string === 'string' && config.opts.string.length > 0
			) {
				this.selected = this.listById.none;
			} else {
				this.selected = this.default;
			}

		},
		createListById: function(){
			for( var i = 0; i < this.list.length; i += 1 ){
				var filler = this.list[i];
				this.listById[filler.id] = filler;
			}
		}
	}

	main.clipboards = {
		showTooltip: {
			copy: false,
			share: false
		},
		onSuccess: function( e, name ){
			e.clearSelection();
		},
		onError: function( e ){}
	};


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

			if( addon.validation ){
				main.ciphers.validAddons = addon.validation( value ) === true;
			} else {
				main.ciphers.validAddons = true;
			}

			if (main.ciphers.validAddons) {
				main.ciphers.run();
			}
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
