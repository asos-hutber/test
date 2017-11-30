'use strict';

//Grab dependancies
require('./config/core');

//To be included in every file
DB.g = require('./config/globals');
DB.f = require('./functions/functions');

// Start grabbing the views
require('./config/setupViews');

/* Table of Imports
 ==================================================
 #Setup
 */
var myVar;


window.init = function(mobile){
    if(!DB.isLoaded) {
        
        clearTimeout(myVar);
        //On page load run onHashChange to update styles/class etc
        DB.f.onHashChange();

        //Set up hash change for every time it changes
        window.addEventListener("hashchange", DB.f.onHashChange, false);

        //Start backbone
        Backbone.history.start();
        //require('./config/globalEvents').init();
    } 
    //DB.DEVICE = function(){
        //For all things in device related
        if(typeof window.device !== "undefined" && navigator.splashscreen) {
            navigator.splashscreen.hide();
        }

        DB.DEVICE = function () {
            //For all things in device related
            if (typeof window.device !== "undefined") {

                //Make sure the app stays open in the background
                //cordova.plugins.backgroundMode.enable();
                //window.plugins.insomnia.keepAwake()

                //Return device for class name on html
                return window.device.platform;
            } else {
                if (navigator.platform === "Win32") {
                    return 'iOS';
                } else if (navigator.platform === "iPhone") {
                    return 'iOS';
                } else {
                    return navigator.platform;
                }
            }
        }();

        if (DB.DEVICE) //Add which device we are on into the html
            $('html').addClass(DB.DEVICE);

        FastClick.attach(document.body);

        DB.isLoaded = true;
	
	//Add Insomnia
        // require('./libs/Insomnia');
    //}
};


$(document).ready(function() {
    if(DB.g.url.envioment === "liveApp" && DB.isMobile){
        document.addEventListener('deviceready', function(){
            init(true);

	        // setTimeout(function () {
		       //  // Get connection set up
		       //  DB.f.connection = DB.f.connection();
	        // }, 500);
        }, false);

        if(!DB.isLoaded)
        myVar = setTimeout(init, 100);

        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    }else {
        init();
    }
});
