'user strict';
var jPlayer = require('../jquery.jplayer');
//extend the view with the default home view
module.exports = Backbone.View.extend({
	el: '.content',
	events: {
		'click .intro .cog' : 'animateAndGo'
	},
	templates: {
		home: require('../../jade/viewvideo.jade')
	},
	render: function () {
		var body = $('body');
		var dark = body.hasClass('dark') || false;

		if(dark)
		body.removeClass('dark');

		var videoItem = $('body').attr('class'),
			title = 'Playing Attention',
			previous = '',
			next = '#viewvideotwo',
			audioFile = '1.mp3';

		switch (videoItem) {
			case "viewvideotwo":
				title = 'FOFBOC';
				previous = '#viewvideoone';
				next = '#viewvideothree';
				audioFile = '2.mp3';
				break;
			case "viewvideothree":
				title = 'Beditation';
				previous = '#viewvideotwo';
				next = '#viewvideofour';
				audioFile = '3.mp3';
				break;
			case "viewvideofour":
				title = 'Mindful Mouthful';
				previous = '#viewvideothree';
				next = '#viewvideofive';
				audioFile = '4.mp3';
				break;
			case "viewvideofive":
				title = 'Mindful Movement';
				previous = '#viewvideofour';
				next = '#viewvideosix';
				audioFile = '5.mp3';
				break;
			case "viewvideosix":
				title = 'Stepping Back';
				previous = '#viewvideofive';
				next = '#viewvideoseven';
				audioFile = '6.mp3';
				break;
			case "viewvideoseven":
				title = 'Befriending the Difficult';
				previous = '#viewvideosix';
				next = '#viewvideoeight';
				audioFile = '7.mp3';
				break;
			case "viewvideoeight":
				title = 'Taking in the Good';
				previous = '#viewvideoseven';
				next = '';
				audioFile = '8.mp3';
				break;
		}
		if(typeof DB.f.connection() === "object" && DB.f.connection().checkConnection()==="none"){
			this.$el.addClass('no-internetOn');
		}else {
			var link = 'https://www.youtube.com/embed/hiuI_pNymDM?list=PLwC71vzP2zJEj0SeuP2Sn2dUU9DaKxliU';
			switch (videoItem) {
				case "viewvideotwo":
					link = 'https://www.youtube.com/embed/gImZc0oj91U?list=PLwC71vzP2zJEj0SeuP2Sn2dUU9DaKxliU';
					break;
				case "viewvideothree":
					link = 'https://www.youtube.com/embed/51zp6OywL-Y?list=PLwC71vzP2zJEj0SeuP2Sn2dUU9DaKxliU&index=14';
					break;
				case "viewvideofour":
					link = 'https://www.youtube.com/embed/pPmRSP5mTak?list=PLwC71vzP2zJEj0SeuP2Sn2dUU9DaKxliU&index=13';
					break;
				case "viewvideofive":
					link = 'https://www.youtube.com/embed/Jwji1-BCWo4?list=PLwC71vzP2zJEj0SeuP2Sn2dUU9DaKxliU&index=12';
					break;
				case "viewvideosix":
					link = 'https://www.youtube.com/embed/v4apaJ3as5w?list=PLwC71vzP2zJEj0SeuP2Sn2dUU9DaKxliU&index=11';
					break;
				case "viewvideoseven":
					link = 'https://www.youtube.com/embed/O87-jt7Q-60?list=PLwC71vzP2zJEj0SeuP2Sn2dUU9DaKxliU&index=10';
					break;
				case "viewvideoeight":
					link = 'https://www.youtube.com/embed/_XHu6E4HMPs?list=PLwC71vzP2zJEj0SeuP2Sn2dUU9DaKxliU&index=9';
					break;
			}
		}

		this.$el.html(this.templates.home({
			title: title,
			next: next,
			previous: previous,
			youtubeLink: link+'&rel=0&autoplay=1&controls=0&showinfo=0&loop=1&iv_load_policy=3&enablejsapi=1'
		})).promise().done(function(){
			if(dark)
				$('body').addClass('dark');

			$("#jquery_jplayer_1").jPlayer({
				ready: function (event) {
					$(this).jPlayer("setMedia", {
						mp3: DB.isMobile ? cordova.file.applicationDirectory+"www/audio/" + audioFile : "./audio/" + audioFile
					});
				},
				errorAlerts: true,
				warningAlerts: true,
				swfPath: "./jquery.jplayer",
				supplied: "mp3",
				wmode: "window",
				useStateClassSkin: true,
				autoBlur: false,
				smoothPlayBar: true,
				keyEnabled: true,
				remainingDuration: true,
				toggleDuration: true
			});
		});
	}
});
