/// <reference path="senkenSynth.js" />
/// <reference path="jquery-2.1.1.min.js" />
/// <reference path="jquery-2.1.1.js" />
// Web Audio Api context test

test("senkenSynth: class was found", function() {


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


// Compressor tests

test("senkenSynth: compressor functionality", function() {


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


    // create testCompressor
    var testCompressor = new Compressor(context);


// test ratio
    testCompressor.ratioAdjuster(4);
    var ratioValue = testCompressor.readRatio();
    equals(ratioValue, 4, "ratio functionality works");

    // test knee
    testCompressor.kneeAdjuster(5);
    var kneeValue = testCompressor.readKnee();
    equals(kneeValue, 5, "knee functionality works");


    // test treshold
    testCompressor.thresholdAdjuster(-10);
    var thresholdValue = testCompressor.readThreshold();
    equals(thresholdValue, -10, "threshold functionality works");


});

test("senkenSynth: masterController", function() {


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

    var testController = new MasterController(context);

    // test gainlevels

    testController.gainAdjuster(50);
    
    equals(0.5, testController.readGain(), "gain functionality");


    // test wavebucket contents after start

    var oscArray = [];
    var testOscillation = context.createOscillator();
    testOscillation.frequency.value = 200;

    console.log(typeof testOscillation);

    oscArray.push(testOscillation);

    testControllerWithWaveBucket = new MasterController(context, oscArray);

    testControllerWithWaveBucket.sessionPlayer();

    equal(1, testControllerWithWaveBucket.sessionOscillations(), "correct amount of waves are started");

    // test  wavebucket contents after stop
    testControllerWithWaveBucket.sessionSuspender();
    equal(1, testControllerWithWaveBucket.sessionOscillations(), "correct amount of waves are ready to be reincarnated");


});

test("senkenSynth: LFO", function() {


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


    equals(thresholdValue, -10, "threshold functionality works");


});