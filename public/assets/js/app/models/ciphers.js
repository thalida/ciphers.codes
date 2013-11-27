///////
// MODEL :: CIPHERS
///////
// SUPPORTED CIPHERS & CODES
//		ATBASH
//		CAESAR
//		KEYWORD SUBSTUTION
//		MASONIC
//		POLYBIUS
//		VIGENERE
//		PLAYFAIR
//
// COMING SOON
//		AFFINE
///////

define(function (require) {
	"use strict";
	var
		$		=	require('jquery'),
		_		= 	require('underscore'),
		Backbone	= 	require('backbone'),
		
		that,
		
		Ciphers = Backbone.Model.extend({
        	
	        	///////
	        	// DEFAULT MODEL DATA
			defaults: {
				'polyAlpha'		:	null,
				'playfairData'		:	{key: null, alpha: null},
				'alpha'			:	['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
				'fillerText'		:	[
									{id: "abc", name: "Alphanumeric &amp; Symbols", text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\r\nabcdefghijklmnopqrstuvwxyz\r\n0123456789\r\n, . ; : ' \" ` ~ ! @ # $ % ^ & * ( )- _ = + [ ]{ } \\ / | < >\r\n"},
									{id: "lorem", name: "Lorem Ipsum", text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.\r\n"},
									{id: "pangram", name: "Pangrams", text: "Every good cow, fox, squirrel, and zebra likes to jump over happy dogs.\r\nWoven silk pyjamas exchanged for blue quartz.\r\nThe quick onyx goblin jumps over the lazy dwarf.\r\nBrawny gods just flocked up to quiz and vex him.\r\n"}
								]
			},

			initialize: function ( ) {
				that = this;
				_.bindAll(this);
				
				// GET LIST OF CIPHERS SUPPORTED
				this.set('ciphers', this.getCiphers());
				
				// CREATE ALPHANUMERIC ARRAY
				this.set('alphanumeric', _.toArray(this.getAttributeByName('alpha')).concat(['0','1','2','3','4','5','6','7','8','9']));
				
				// CREATE A 6 X 6 ALPHANUMERIC GRID
				var polyAlpha = new Array(6), index = 0;	 
				for(var i = 1; i <= 6; i++){
					polyAlpha[i] = new Array(6);
					for(var j = 1; j <= 6; j++){
						polyAlpha[i][j] = this.get('alphanumeric')[index];
						index = index + 1;
					}
				}
				
				this.set('polyAlpha', polyAlpha);
			},
			getCiphers: function(){
            			var ciphers = [
            					{
    							id: 1, 
    							name: "Atbash", 
    							desc: "A simple substitution cipher orginally created for the Hebrew alphabet, when converted to work with the Latin Alphabet (abc), this cipher reverses the alphabet so that the cipher alphabet is now 'zyxwvutsrqponmlkjihgfedcba'.",
    							link: "http://en.wikipedia.org/wiki/Atbash",
    							func: function(opts){ return that.process(opts) }
    						},
    	    					{
    	    						id: 2, 
    	    						name: "Caesar", 
    	    						uses: [{type: "number", label: "Shift by"}],
    	    						desc: "A simple substitution cipher in which the alphabet is shifted up or down a specified number of positions.",
    	    						link: "http://en.wikipedia.org/wiki/Caesar_cipher",
    	    						func: function(opts){ return that.process(opts) }
    	    					},
    	        				{
    	        					id: 3, 
    	        					name: "Keyword Substitution", 
    	        					uses: [{type: "key", label: "Key", placeholder: "Enter your key..."}],
    	        					desc: "A monoalphabetic substitution cipher, where a keyword placed into beginning of the alphabet, and any duplicated letters are removed.",
    	        					link: "http://en.wikipedia.org/wiki/Keyword_cipher",
    	        					func: function(opts){ return that.process(opts) }
    	        				},
    	        				{
    	        					id: 4, 
    	        					name: "Masonic",
    	        					desc: "A geometric simple substitution cipher which exchanges letters for symbols which are fragments of a grid.",
    	        					link: "http://en.wikipedia.org/wiki/Pigpen_cipher",
    	        					func: function(opts){ return that.process(opts) }
    	        				},
    	        				{
    	        					id: 5, 
    	        					name: "Polybius",
    	        					desc: "A cipher where each alphanumeric (a-z, 0-9) character is represented by it's coordinates in a grid.s",
    	        					link: "http://en.wikipedia.org/wiki/Polybius_square",
    	        					func: function(opts){ return that.process(opts) }
    	        				},
    	        				{
    	        					id: 6, 
    	        					name: "Vigenère", 
    	        					uses: [{type: "key", label: "Key", placeholder: "Enter your key..."}],
    	        					desc: "A simple polyalphabetic substitution cipher which uses a tableau composed of each of the 26 options for a Caesar Cipher.",
    	        					link: "http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher",
    	        					func: function(opts){ return that.process(opts) }
    	        				},
    	        				{
    	        					id: 7, 
    	        					name: "Playfair", 
    	        					uses: [{type: "key", label: "Key", placeholder: "Enter your key...", 
    	        					hint: "Duplicate letters will be removed"}],
    	        					desc: "The playfair cipher combines the letters i and j so that the alphabet can fit on a 5x5 grid, as a result any 'j' you use in your text, will be treated like an 'i'. In addition, please read below how the playfair cipher is encoded and decoded.",
    	        					link: "http://en.wikipedia.org/wiki/Playfair_cipher",
    	        					func: function(opts){ return that.process(opts) }
    	        				}
    						];
    				return ciphers;
    			},
    			getAttributeByName: function( attr ){
				//RETURN A COPY OF THE ATTRIBUTE
				return $.extend(true, {}, this.get(attr));
			},
            
			process: function(opts){
				//BASED ON THE INPUT ID => RETURN THE CORRECT CIPHER OUTPUT
				switch(opts.id){
					case 1:
						return this.use.atbash(opts);
						break;
					case 2:
						return this.use.caesar(opts);
						break;
					case 3:
						return this.use.keyedsub(opts);
						break;
					case 4:
						return this.use.mason(opts);
						break;
					case 5:
						return this.use.polysq(opts);
						break;
					case 6:
						return this.use.vegenere(opts);
						break;
					case 7:
						return this.use.playfair(opts);
						break;
					default:
						return '';
						break;
				}
			},
			use: {
            
				///////
				// ATBASH
				// =>	a = z, b = y, c = x
				atbash: function(opts){
					var
						alpha = _.toArray(that.getAttributeByName('alpha')),
						string = opts.text,
						output = '';
					that.utils.eachCharacter(string, 1, function(i, char, isUpper){
						if(char.match(/^[A-Za-z]$/)){
							var pos = jQuery.inArray(char.toLowerCase(), alpha),
							new_pos = alpha.length - pos - 1;
							char = alpha[new_pos];
						}
						char = (char.match(/\n/g)) ? '<br />' : char;
						output += (isUpper === true) ? char.toUpperCase() : char;
					});
					
					return output;
				},
            	
            	
				///////
				// CAESAR
				// if n = 2	=>	a = c, b = d, c = e
				caesar: function(opts){
					var 
						alpha = _.toArray(that.getAttributeByName('alpha')),
						n = parseInt( opts.addons[0] ),
						string = opts.text,
						output = '';
					
					that.utils.eachCharacter(string, 1, function(i, char, isUpper){
						if(char.match(/^[A-Za-z]$/)){
							var pos = jQuery.inArray(char.toLowerCase(), alpha),
							new_pos = (opts.isEncoding === true) ? (pos + n) : (pos - n);
							
							if(new_pos >= alpha.length)
							new_pos = new_pos.mod(alpha.length);
							
							else if(new_pos < 0 )
							new_pos = alpha.length + new_pos;
							
							char = alpha[new_pos];
						}
						char = (char.match(/\n/g)) ? '<br />' : char;
						output += (isUpper === true) ? char.toUpperCase() : char;
					});
					
					return output;
				},
            	
            	
				///////
				// KEYED SUBSITUTION
				keyedsub: function(opts){
					var
						alpha = _.toArray(that.getAttributeByName('alpha')),
						string = opts.text,
						output = '',
						key = opts.addons[0] + '',
						keyedAlpha = that.utils.makeKeyedAlpha(key);
					
					that.utils.eachCharacter(string, 1, function(i, char, isUpper){
						if(char.match(/^[A-Za-z]$/)){
							if(opts.isEncoding === true){
								var pos = jQuery.inArray(char.toLowerCase(), alpha);
								char = keyedAlpha[pos];
							}else{
								var pos = jQuery.inArray(char.toLowerCase(), keyedAlpha);
								char = alpha[pos];
							}
						}
						
						char = (char.match(/\n/g)) ? '<br />' : char;
						output += (isUpper == true) ? char.toUpperCase() : char;
					});
					
					
					return output;
				},
            	
				mason: function(opts){
					var
						output = '',
						string = opts.text;
					
					that.utils.eachCharacter(string, 1, function(i, char){
						char = char.toLowerCase();
						if(opts.isEncoding === true && char.match(/^[a-z]$/))
							char = '<span class="mason_text">'+char+'</span>';
						char = (char.match(/\n/g)) ? '<br />' : char;
						output += char;
					});
					
					return output;
				},
            	
				polysq: function(opts){
					var
						output = '',
						string = opts.text,
						alphanumeric = _.toArray(that.getAttributeByName('alphanumeric'));
					
					for( var i = 0; i < string.length; i++ ){
						var
							value = '',
							char = string.charAt(i).toLowerCase();
						
						if(opts.isEncoding === true && char.match(/^[a-z0-9]$/)){
							var alpha_pos = jQuery.inArray(char.toString(),alphanumeric) + 1,
							pos1 = Math.ceil(alpha_pos / 6),
							pos2 = (alpha_pos % 6 == 0) ? 6 : alpha_pos % 6 ;
							value = pos1 + '' + pos2 + ' ';
						}
						
						else if(opts.isEncoding === false && char.match(/^[1-6]$/)){
							var char2 = string.charAt(i + 1);
						
							if(char2.match(/^[1-6]$/)){
								i = (string.charAt(i + 2).match(/^[1-6]$/)) ? i + 1 : i + 2;
								if(typeof polyAlpha[char][char2] == 'undefined')
									break;
								else
									value = polyAlpha[char][char2]
							}
						}
						
						else if(char.match(/\n/g))
							value = '<br />';
						output += value;
					}
					return output;
				},
            	
				vegenere: function(opts){
					var
						string = opts.text.replace(/[^A-Za-z]+/gi, '').toLowerCase(),
						keySimple = opts.addons[0].toLowerCase(),
						key = keySimple,
						alpha = _.toArray(that.getAttributeByName('alpha')),
						output = '';
					
					while(key.length < string.length && keySimple.length != 0){
						that.utils.eachCharacter(keySimple, 1, function(i, char){
							if(key.length < string.length) key += char;
							else return;
						});
					}
					
					that.utils.eachCharacter(string, 1, function(i, char){
						var
							char_pos = jQuery.inArray(char,alpha),
							key_pos = jQuery.inArray(key.charAt(i),alpha);
						
						key_pos = (key_pos == -1) ?  0 : key_pos;
						
						var pos = (opts.isEncoding == true) ? (char_pos + key_pos) : (char_pos - key_pos);
						char = alpha[pos.mod(26)];
						output += char;
					});
					
					return output;
				},
            	
				playfair: function(opts){
					var
						string = opts.text.replace(/[^A-Za-z]+/gi, '').toLowerCase(),
						keyword = opts.addons[0].replace(/[j]+/gi, 'i').toLowerCase(),
						output = '',
						alpha_arr = that.utils.playfair_keyedAlpha(that.getAttributeByName('playfairData'),keyword),
						str = that.utils.playfair_strToArr(string, opts.isEncoding);
					
					for(var i = 0; i < str.length; i++){
						var
							char1 = (str[i][0] == 'j') ? 'i' : str[i][0],
							char2 = (str[i][1] == 'j') ? 'i' : str[i][1],
							coords1 = that.utils.find(char1,alpha_arr),
							coords2 = that.utils.find(char2,alpha_arr),
							new_coords1 = {x:null,y:null},
							new_coords2 = {x:null,y:null};
					
						if(coords1.x == coords2.x){
							new_coords1.y = (opts.isEncoding == true) ? (coords1.y + 1) : (coords1.y - 1);
							new_coords1.y = (new_coords1.y > 4) ? 0 : new_coords1.y;
							new_coords1.y = (new_coords1.y < 0) ? 4 : new_coords1.y;
							
							new_coords2.y = (opts.isEncoding == true) ? (coords2.y + 1) : (coords2.y - 1);
							new_coords2.y = (new_coords2.y > 4) ? 0 : new_coords2.y;
							new_coords2.y = (new_coords2.y < 0) ? 4 : new_coords2.y;
							
							new_coords1.x = new_coords2.x = coords1.x;
						}else if(coords1.y == coords2.y){
							new_coords1.x = (opts.isEncoding == true) ? (coords1.x + 1) : (coords1.x - 1);
							new_coords1.x = (new_coords1.x > 4) ? 0 : new_coords1.x;
							new_coords1.x = (new_coords1.x < 0) ? 4 : new_coords1.x;
							
							new_coords2.x = (opts.isEncoding == true) ? (coords2.x + 1) : (coords2.x - 1);
							new_coords2.x = (new_coords2.x > 4) ? 0 : new_coords2.x;
							new_coords2.x = (new_coords2.x < 0) ? 4 : new_coords2.x;
							
							new_coords1.y = new_coords2.y = coords1.y;
						}else{
							new_coords1.x = coords1.x;
							new_coords1.y = coords2.y;
							
							new_coords2.x = coords2.x;
							new_coords2.y = coords1.y;
						}
						var letter1 = alpha_arr[new_coords1.x][new_coords1.y];
						var letter2 = alpha_arr[new_coords2.x][new_coords2.y];
						output += letter1 + letter2;
					}
						
					that.set('playfairData',{key: keyword, alpha: alpha_arr});
					return output;
				}
            		},
            		utils: {
				eachCharacter: function(string, increment, callback){
					for( var i = 0; i < string.length; i = i + increment ){
						var c = string.charAt(i),
						isUpper = (c.match(/^[A-Z]$/)) ? true : false;
						callback(i,c,isUpper);
					}
				},
            	
				makeKeyedAlpha: function(key){
					var
						alpha = _.toArray(that.getAttributeByName('alpha')),
						abc = alpha.slice(0),
						keyedAlpha = (key != '' && key != null) ? key.split('') : [];
					
					$.each(keyedAlpha, function(index, letter){
						var n = jQuery.inArray(letter.toLowerCase(),abc);
						abc.splice(n,1);
					});
					
					keyedAlpha = keyedAlpha.concat(abc);
					
					return keyedAlpha;
				},
            	
				find: function(item, array){
					for(var i = 0; i < array.length; i++){
						for(var j = 0; j < array.length; j++){
							if(item == array[i][j]) return {x:i,y:j};
						}
					}
					return false;
				},
            	
				playfair_keyedAlpha: function(data,keyword){
					var alpha_arr;
					if(data.key != keyword){
						var keyed_alpha = this.makeKeyedAlpha(keyword);
						alpha_arr = new Array(5);
						var index = 0;
						for(var i = 0; i < 5; i++){
							alpha_arr[i] = new Array(5);
							for(var j = 0; j < 5; j++){
								if(keyed_alpha[index] != 'j') alpha_arr[i][j] = keyed_alpha[index];
								else j = j - 1;
								index = index + 1;
							}
						}
					}else{
						alpha_arr = data.alpha;
					}
					
					return alpha_arr;
				},
            	
				playfair_strToArr: function(string, isEncoding){
					var
						strlen = string.length,
						str_index = 0,
						arr_size = (strlen % 2 == 0) ? Math.floor(strlen/2) : Math.floor(strlen/2)+1,
						str = [];
						
					for(var i = 0; i < arr_size; i++){
						str[i] = new Array(2);
						str[i][0] = string.charAt(str_index);
						str[i][1] = string.charAt(str_index + 1);
						if(str[i][0] == str[i][1] && isEncoding == true){
							str[i][1] = 'x';
							str_index += 1;
							if(strlen % 2 == 0)
								arr_size += 1;
							strlen += 1;
						}else{
							if((str_index + 1) >= string.length && isEncoding == true)
								str[i][1] = 'x';
							str_index += 2;
						}
					}
					
					return str;
				}
			}
            	
            });
            return {Ciphers: Ciphers};
});

// FIX FOR MOD ISSUES
Number.prototype.mod = function(n){
	return ( (this % n) + n ) % n;
}
