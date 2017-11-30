'user strict';
//extend the view with the default home view
module.exports = Backbone.View.extend({
	el: '.content',
	events: {
		'submit .loginForm': 'validateUser',
	},
	templates: {
		login: require('../../jade/index.jade')
	},

	validateUser: function (){
		var passCode = this.$el.find('.submit').val();
		if(passCode === "Fofboc"){
			localStorage.passed = true;
			document.location.href = '#videos';
		}else{
			alert('Please enter the correct passcode')
		}
		return false;
	},

	render: function () {
		if(localStorage && localStorage.passed){
			document.location.href = '#videos';
		}else{
			this.$el.html(this.templates.login());
		}
	}
});
