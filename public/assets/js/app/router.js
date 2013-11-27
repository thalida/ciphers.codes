///////
// ROUTER
///////
define(function (require) {
	"use strict";
	var 
		$		=	require('jquery'),
		Backbone	= 	require('backbone'),
        	SiteMainView	=	require('app/views/main'),
        	
        	$body = $('body'),
        	mainView = new SiteMainView({el: $body}).render(),
        	$content = $("#content", mainView.el);
        
        return Backbone.Router.extend({
		routes: {
			"": "home",
			//"about": "about" TODO: CREATE ABOUT PAGE
		},
		home: function () {
			$('body').scrollTop(0);
			$('#wrapper').fadeIn(800);
		}
	});
});
