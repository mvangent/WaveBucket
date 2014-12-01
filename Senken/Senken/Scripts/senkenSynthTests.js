



/// <reference path="senkenSynth.js"/>
/// <reference path="jquery-2.1.1.min.js"/>
/// <reference path="jquery-2.1.1.js"/>




test("context class was found", function () {
    

    var context;
    function init() {

        var contextClass = (window.AudioContext ||
            window.webkitAudioContext ||
            window.mozAudioContext ||
            window.oAudioContext ||
            window.msAudioContext);
        if (contextClass) {
            // Web Audio API is available.
            context = new contextClass();
        } else {
            // Web Audio API is not available. Ask the user to use a supported browser.
            alert("no webapi was found for your browser");

        }

    }
    init();

    var isContext;

    if (context) {
        isContext = true;
    } else {
        isContext = false;
    }


    equals(isContext, true, "WEB AUDIO API is found");

 

});

