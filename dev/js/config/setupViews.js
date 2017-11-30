/** Created by Hutber on 31/05/2015. */
module.exports = function () {
	'use strict';

	//Set up Routes for backbone.
	var Router = Backbone.Router.extend();
	DB.router = new Router();

	var currentViews = [];
	currentViews.push({
			name: 'splash',
			url: 'splash',
			path: require('../views/splash')
		});
	currentViews.push({
			name: 'index',
			url: 'index',
			path: require('../views/index')
		});
	currentViews.push({
			name: 'index',
			url: '',
			path: require('../views/index')
		});
	currentViews.push({
			name: 'home',
			url: 'home',
			path: require('../views/home')
		});
	currentViews.push({
			name: 'videos',
			url: 'videos',
			path: require('../views/videos')
		});
	currentViews.push({
		name: 'videoone',
		url: 'viewvideoone',
		path: require('../views/viewVideo')
	});
	currentViews.push({
		name: 'videotwo',
		url: 'viewvideotwo',
		path: require('../views/viewVideo')
	});
	currentViews.push({
		name: 'videothree',
		url: 'viewvideothree',
		path: require('../views/viewVideo')
	});
	currentViews.push({
		name: 'videofour',
		url: 'viewvideofour',
		path: require('../views/viewVideo')
	});
	currentViews.push({
		name: 'videofive',
		url: 'viewvideofive',
		path: require('../views/viewVideo')
	});
	currentViews.push({
		name: 'videosix',
		url: 'viewvideosix',
		path: require('../views/viewVideo')
	});
	currentViews.push({
		name: 'videoseven',
		url: 'viewvideoseven',
		path: require('../views/viewVideo')
	});
	currentViews.push({
		name: 'videoeight',
		url: 'viewvideoeight',
		path: require('../views/viewVideo')
	});

	//set up all other views
	currentViews.forEach(function (me) {
		//set up variables
		var BackboneView = me.path,
			route = me.route || me.url;
		//add view to the global view object
		DB.g.views[me.name] = new BackboneView();

		//add route to backbone's views
		DB.router.route(route, me.url);

		//Set up staff views
		DB.router.on('route:' + me.url, function (param) {
			//render page
			DB.g.views[me.name].render(param);
		});
	});

	var nonUrlViews = [];

	nonUrlViews.forEach(function(component) {
		if (component.create) {
			component.create($('body'));
		}
	});

}();
