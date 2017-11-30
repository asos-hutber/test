//- Created by Hutber on 21/10/2015.  */
'use strict';
module.exports = function () {
    //Updated previous hash
    DB.g.previoushash = DB.g.hash;

    //Update the new hash
    DB.g.hash = window.location.hash.substring(1);
    if(DB.g.hash.length === 0) DB.g.hash = 'index';

    //On page load update body class with current page
    DB.f.url.bodyClass(DB.g.hash, DB.g.previoushash);
    
    if(typeof DB.timer !== "undefined"){
        DB.timer.stop();
    }
};