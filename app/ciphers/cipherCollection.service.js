'use strict';

app.service('cipherCollection', [
	function(){
		var Ciphers = function(){
			this.collection = [];
			this.totalCiphers = this.collection.length;
		};

		Ciphers.prototype.add = function( cipher ){
			this.collection.push( chiper );
			this.totalCiphers = this.collection.length;
		};

		Ciphers.prototype.get = function(){
			return this.collection;
		};

		return new Ciphers();
	}
]);
