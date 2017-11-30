//- Created by Hutber on 19/10/2015.  */
//Core Librarys
window.$ = require('jquery');
window.jQuery = window.$;
window.Backbone = require('backbone');
window.noUiSlider = require('../libs/nouislider.min');
Backbone.$ = $;

//Addons
window.moment = require('moment');

//Define Global Variable
window.DB = {}; //define RN so we can use it globally

/*==================================================
 Is Mobile - If true then we are a mobile
 ================================================== */
DB.isMobile = true;
if (document.URL.indexOf('file') === -1) {
    DB.isMobile = false;
}

	$(document).on('click', 'a[href^="http"]', function (e) {
		if (typeof device !== "undefined" && device.platform.toUpperCase() === 'ANDROID') {
			console.info('handle');
			var url = $(this).attr('href');
			navigator.app.loadUrl(url, {openExternal: true});
			e.preventDefault();
		} else if (typeof device !== "undefined" && device.platform.toUpperCase() === 'IOS') {
			console.info('handle ios');
			var url = $(this).attr('href');
			window.open(url, '_system');
			e.preventDefault();
		}
	});

DB.isLoaded = false;
