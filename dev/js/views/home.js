'user strict';
var timerFile = require('../timer');

//extend the view with the default home view
module.exports = Backbone.View.extend({
	el: '.content',
	events: {
		'click .intervalItem': 'updateTimer',
		'click .soundItem': 'selectSound',
		'click .playButton .icon-play': 'startTimer',
		'click .playButton .icon-pause': 'pauseTimer',
		'click .stopButton': 'stopTimer',
		'click .icon-lightbulb': 'goDark',
		'click .icon-untitled-6': 'goToVideos',
	},
	templates: {
		home: require('../../jade/home.jade')
	},

	goDark: function () {
		$('body').toggleClass('dark');
	},
	
	goToVideos: function () {
		document.location.href = '#videos';
	},
	
	slides: {
		in: function () {
			$('nav, .container').addClass('slideIn').removeClass('slideOut');
			setTimeout(function () {
				$('.slideIn').removeClass('slideIn');
			}, 1000)
		},
		out: function () {
			$('nav, .container').addClass('slideOut');
		},
		timerOut: function () {
			$('.noClick').show();
			setTimeout(function () {
				$('.container').addClass('running').removeClass('slideOut');
				DB.timer.start();
				$('.noClick').hide();
			}, 0);
		},
		pause: function () {
			$('nav').removeClass('slideOut').addClass('slideIn');
			$('.container').removeClass('running').addClass('paused');
			//$('.button').addClass('switchPause');
		},
		stop: function () {
			this.in();
			$('nav, .container').removeClass('paused running');
			$('.playButtonItem .icon').removeAttr('class').addClass('icon');
			$('.interval .active').removeClass('active');
			$('.interval div:first').addClass('active');
			//$('.intervalItem').eq(DB.timer.interval-1).addClass('active');
			//console.info(DB.timer.interval);
			$('.soundMenu .active').removeClass('active');
			$('.icon-bell').parent().addClass('active');
			$('.playButtonControls').removeAttr('class').addClass('playButtonControls one');
			$('.playButtonItem:first .icon').addClass('icon-bell');
		},
		turnOffPause: function () {
			$('.container').removeClass('paused').addClass('running');
		},
		resume: function () {
			$('nav').removeClass('slideOut').addClass('slideOut');
			DB.timer.start();
			this.turnOffPause();
		},
		start: function () {
			if($('.container').hasClass('slideOut')){
				this.timerOut();
			}
			$('nav, .container').removeClass('paused');
			this.out();
		}
	},

	startTimer: function (el) {
		if(DB.timer.type !== null && DB.timer.interval !== null && DB.timer.paused===false) {
			this.slides.start();
		}else if(DB.timer.paused){
			this.slides.resume();
		}

		return false;
	},

	pauseTimer: function () {
		DB.timer.pause();
		this.slides.pause();
		
		return false;
	},
	
	stopTimer: function () {
		this.slides.stop();
		DB.timer.length = Math.round(DB.slider.get())*60;
		DB.timer.startLength = DB.timer.length;
		DB.timer.lengthMins = Math.floor(DB.timer.length/60);
		DB.timer.lengthSeconds = 0;
		$('.timeText').text(DB.slider.get().split('.')[0]+':00');
		DB.timer.stop();
	},
	
	updateTimer: function (el) {
		el = $(el.currentTarget);
		var intContainer = $('.interval'),
			playButtonControls = $('.playButtonControls'),
			playButtonIcons = $('.playButtonControls .icon'),
			numberToAdd = el.data('number');

		//update timer details
		DB.timer.interval = el.index()+1;
		DB.timer.intervalNumber = numberToAdd;

		playButtonControls.removeAttr('class').addClass('playButtonControls '+numberToAdd);
		playButtonIcons.removeAttr('class').addClass('icon icon-'+DB.timer.type)
		intContainer.find('.active').removeClass('active');
		el.addClass('active');
	},
	
	selectSound : function (el) {
		el = $(el.currentTarget);
		var soundContainer = $('.sound'),
			icons = $('.playButtonItem .icon'),
			replaceIcons = icons.find('.icon-*'),
			type = el.data('type');
		
		//update timer 
		DB.timer.type = type;

		//Replace icons on play button
		icons.removeAttr('class').addClass('icon icon-'+type);		
		//update active state
		soundContainer.find('.active').removeClass('active');
		el.addClass('active');
		DB.timer.playSound();
	},
	
	resizeButton: function () {
		//Get width of .container and add it to the menu so it fits
		//var containerHeight = window.innerHeight - $('nav').outerHeight() - $('.container').css('margin-top').split('px')[0];
		//$('.container').css('height', containerHeight);
		$('.noUi-handle-lower').css('width', $('.noUi-handle-lower').height());
		$('.intervalItem').css('width', $('.intervalItem').height());
	},
	
	render: function () {
		this.$el.html(this.templates.home());

		/************************************
		 * On first page load create resize *
		 ***********************************/
		//check to see if the view has been rendered once.
		if(typeof DB.g.views.home.rendered === "undefined"){
			DB.g.views.home.rendered = true;
			$( window ).resize(this.resizeButton);
		}

		/**************************
		 *			Timer		  *
		 **************************/
		if(!DB.timer)
		DB.timer = new timerFile();

		/**************************
		 *			Slider		  *
		 **************************/
		var slider = document.getElementById('slider');
		noUiSlider.create(slider, {
			start: 5,
			range: {
				'min': 1,
				'2%': 2,
				'4%': 3,
				'6%': 4,
				'8%': 5,
				'12%': 10,
				'25%': 20,
				'50%': 30,
				'60%': 40,
				'80%': 50,
				'max': 60
			},
			//snap: true,
		});
		DB.slider = slider.noUiSlider;
		var first = false;
		slider.noUiSlider.on('update', function( values, handle ) {
			var splitVal = values[0].split('.');
			values = splitVal[0];
			if(values == 1){
				$('.sliderHeader span').html(values+' min');
			}else{
				$('.sliderHeader span').html(values+' mins');
			}
			var amount = splitVal[0];
			// if(first){
			// 	// amount = parseInt(amount) -32;
			// 	$('.noUi-handle').css('marginLeft', -amount / 2)
			// } else if(amount > 30) {
				$('.noUi-handle').css('marginLeft', -amount / 2.2)
			// }
			first = true;
			$('.timeText').text(splitVal[0]+':00');
			DB.timer.length = values*60;
			DB.timer.startLength = DB.timer.length;
			DB.timer.setAnimationTimes();
		});
		this.resizeButton();

		/**************************
		 *		Animations		  *
		 **************************/
		this.slides.in();
		//set timers height/wdith
		var desiredHiehgt = $('.playButton').height();
		$('#timer').attr('width', desiredHiehgt).attr('height', desiredHiehgt)
		
		//reset animations
		DB.timer.animationSetUpElements();
	}
});