'user strict';

//extend the view with the default home view
module.exports = Backbone.View.extend({
	el: '.content',
	events: {
		'click .intro .cog' : 'animateAndGo'
	},
	templates: {
		home: require('../../jade/videos.jade')
	},
	render: function () {
		this.$el.html(this.templates.home());
		var videoShell = $(this.$el).find('.videoShell');
		setTimeout(function () {
			console.info(videoShell);
			videoShell.addClass('finished')
		}, 1000)
		
	}
});
