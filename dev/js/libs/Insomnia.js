//- Created by Hutber on 04/01/2016.  */
function Insomnia() {
}

Insomnia.prototype.keepAwake = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Insomnia", "keepAwake", []);
};

Insomnia.prototype.allowSleepAgain = function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Insomnia", "allowSleepAgain", []);
};

Insomnia.install = function () {
    if (!window.plugins) {
        window.plugins = {};
    }

    window.plugins.insomnia = new Insomnia();
    return window.plugins.insomnia;
};

if(DB.isMobile)
cordova.addConstructor(Insomnia.install);