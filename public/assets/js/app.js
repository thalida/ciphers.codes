//REQUIRE.JS CONFIG
require.config({
    baseUrl: 'public/assets/js/libs',
    paths: {
        app: '../app',
        tpl: '../app/tpl', //templates
        
		jquery: "http://code.jquery.com/jquery-latest",
		jqueryui: "http://code.jquery.com/ui/1.10.3/jquery-ui.min",
		mediaqueries: 'css3-mediaqueries',
		bootstrap: '/public/assets/bootstrap/js/bootstrap.min',
		bootstrapSelect: '/public/assets/bootstrap/js/bootstrap-select.min',
    },
    shim: {
    	'jqueryui': {
    		deps: ['jquery']
    	},
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery.insertAtCaret': {
        	deps: ['jquery']
        },
        'bootstrap': {
        	deps: ['jquery']
        },
        'bootstrapSelect': {
        	deps: ['bootstrap']
        },
        'app/router':{
        	deps: ['jqueryui', 'bootstrapSelect', 'jquery.insertAtCaret', 'app/models/ciphers']
        }
    }
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {
	var router = new Router();
	Backbone.history.start();
});