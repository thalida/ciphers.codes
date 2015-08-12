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
