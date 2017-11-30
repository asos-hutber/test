'user strict';

//extend the view with the default home view
module.exports = Backbone.View.extend({
	el: '.content',
	events: {
		'click .intro .cog' : 'animateAndGo',
		'click .intro .b' : 'animateToLogin'
	},
	templates: {
		home: require('../../jade/splash.jade')
	},
	animateToVideos: function () {
		document.location.href = '#videos';
		return false;
	},
	animateToLogin: function () {
		document.location.href = '#login';
		return false;
	},
	animateAndGo: function (el) {
		var b = $('.b'),
			cog = $('.cog'),
			circle = $('.circle'),
			el = $('.cog');

		//make the cog bigger and shrink the B 
		//el.find('i').removeeClass('spinning');
		el.addClass('large');
		b.addClass('smaller');
		
		setTimeout(function () {
			b.removeClass('smaller').hide();
			//el.addClass('big').removeClass('large');
			//el.removeClass('big');
			setTimeout(function () {
				el.addClass('cog-large-fadeOut');
				setTimeout(function () {
					document.location.href = '#login';
				}, 200);
			}, 750);
		}, 1200);
		return false;
	},
	
	render: function () {
		this.$el.html(this.templates.home());
		
		var b = $('.b'),
			cog = $('.cog'),
			circle = $('.circle');

		//Push cogElements to the bottom
		//$('.cogElements, .circle ').css('margin-top', $('.cogFade').height() - 120)
		//$('.b ').css('margin-top', $('.cogFade').height() / 4)
		
		//Start Breathing 
		$('body').on('webkitTransitionEnd oanimationend msAnimationEnd animationend',b, function () {
			b.addClass('breathing');
		});
		
		//** Cog Animations
		//Start Spinning the cog
		setTimeout(function () {
			circle.addClass('zoomout');
		}, 750);
		setTimeout(function () {
			cog.removeClass('start');
			$('.noClick').remove();
		}, 1750);
	}
});
