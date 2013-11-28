define(function (require) {
	"use strict";
	var
		$				=	require('jquery'),
		_				=	require('underscore'),
		Backbone			=	require('backbone'),
		
		// TEMPLATE FILES
		tpl				=	require('text!tpl/main.html'),
		cipherAddonsTpl		=	require('text!tpl/addonCiphers.html'),
		cipherDescTpl			=	require('text!tpl/aboutCiphers.html'),
		
		// MODELS
		model				=	require('app/models/ciphers'),
		Ciphers			=	new model.Ciphers(),
		
		// TEMPLATES
		template			=	_.template(tpl),
		cipherAddonsTemplate	=	_.template(cipherAddonsTpl),
		cipherDescTemplate		=	_.template(cipherDescTpl),
		
		// OTHER VARIABLES
		isEncoding			=	true,
		$formAddons, $orig, $result, $resultType, savedKey;
	
	return Backbone.View.extend({
		render: function () {
			//SORT CIPHERS ALPHABETICALLY
			Ciphers.attributes.ciphers.sort(function (a, b) {
				return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
			});
			
			this.$el.html(template(Ciphers.attributes));
			$('.selectpicker').selectpicker();
            
			// ELEMENT VARIABLES
			$formAddons = $("#result_addons", this.el);
			$orig	= $("#orig_text", this.el);
			$result	= $("#result_text", this.el);
			$resultType = $('#result_type', this.el);
			
			// TRIGGER CHANGES
			$resultType.trigger('change');
			$('#submit-btns').trigger('change');
			
			return this;
		},

		events: {
			"change		.addon"	:	"submit",
			"change		#result_type"	:	"setCipherType",
			"change		#submit-btns"	:	"setSubmitType",
			
			"click		#arrow_left"	:	"moveTextLeft",
			"click		#clear_orig"	:	"clearText",
			"click		.filler_text"	:	"addFillText",
			
			"keyup		.keyed_input"	:	"validateKey",
			"keyup		#orig_text"	:	"submit",
			
			"submit		#form"		:	"submit"
		},
        
		/////
		// BASED ON DROPDOWN SET THE TYPE OF CIPHER BEING USED
		setCipherType: function (event) {
			var	$target = $(event.target),
				val = parseInt($target.val(), 10),
				cipher	= _.findWhere(Ciphers.getAttributeByName('ciphers'), {id: val});
			
			// RENDER ANY FORM ADDONS USED BY CIPHER
			$formAddons.html('').html(cipherAddonsTemplate(cipher));
			
			// RENDER CIPHER DESCRIPTION
			$('#info').html(cipherDescTemplate(cipher));
			
			// TODO: FIND A BETTER WAY TO CREATE TOOLTIPS
			$('.hasTooltip').tooltip('destroy');
			$('.hasTooltip').tooltip();
			
			this.submit(event);
		},
		
		/////
		// VALIDATE THE INPUT FOR A CIPHER THAT USES A KEY
		validateKey: function(event){
			var	
				$target = $(event.currentTarget), 
				out = '',
				currentKey = String( $target.val() ).toLowerCase(),
				currentKeyLen = currentKey.length;
				
			for( var i = 0; i < currentKeyLen; i++){
				var c = currentKey.charAt(i);
				if(c.match(/^[a-z]$/)){
					var regex = new RegExp(c, 'gi'),
					isUnique = currentKey.match(regex);
					if(isUnique.length === 1){ out += c; }
					else { out = savedKey; break; }
				}
			}
			
			savedKey = out;
			$target.val(out);
			this.submit(event);
		},
		
		moveTextLeft: function(event){
			$result.html( $result.html().replace(/<br\s*[\/]?>/gi, "\r\n") );
			var resultVal = $result.text();
			
			if(resultVal != '' && resultVal != null){
				$orig.val(resultVal);
				$result.empty();
				this.submit(event);
			}else{
				alert("There is no text to be moved!");
			}
		},
		
		addFillText: function(event){
			var
				id = $(event.currentTarget).attr('id'),
				fillerText = _.findWhere(Ciphers.getAttributeByName('fillerText'), {id: id});
			$orig.insertAtCaret( fillerText.text );
			this.submit(event);
		},
		
		clearText: function(event){
			var isClearable = confirm("Are you sure you want to clear this field?");
			if (isClearable === true){
				$orig.val('');
				this.submit(event);
			}
		},
		
		setSubmitType: function(event){
			var
				$target = $(event.target),
				type = $target.val();
				
			isEncoding = (type == 'encode') ? true : false;
			this.submit(event);
		},
		
		getFormAddons: function(){
			var addons = [];
			$('#result_addons *').each(function(){
				if( $(this).hasClass('addon') ){
					addons.push($(this).val());
				}
			});
			return addons;
		},
		
		submit: function(event){
			event.preventDefault();
			var output = '';
			if($orig.val() != ''){
				var 	id = parseInt($resultType.val(), 10),
					cipher = _.findWhere(Ciphers.getAttributeByName('ciphers'), {id: id});
				output = cipher.func({
						id: parseInt($resultType.val(), 10), 
						text: $orig.val(),
						isEncoding: isEncoding,
						addons: this.getFormAddons()
					});
			}
			$result.html(output);
		}
    });
});
