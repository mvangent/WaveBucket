/// <reference path="senkenSynth.js" />
/// <reference path="jquery-2.1.1.min.js" />
/// <reference path="jquery-2.1.1.js" />

// Web Audio Api context test


var context;
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

test("senkenSynth: class was found", function() {

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

    var testController = new MasterController(context);
    // test gainlevels
    testController.gainAdjuster(50);
    equals(0.5, testController.readGain(), "gain functionality");

    // test activation
    testController.startSession();
    equals(true, testController.isActive(), "starting session works")

    // test  deactivation
    testController.stopSession();
    equals(false, testController.isActive(), "pauzing session works")

});

test("senkenSynth: WaveBucket", function() {

    var testBucket = new WaveBucket();

    // add wave
    var testWave = context.createOscillator();
    testBucket.addWave(testWave);
    var length = testBucket.getSize();
    equals(length, 1, "adding wave");

    // remove wave (by pop())
    testBucket.remove();
    equals(0, testBucket.getSize(), "removing wave")

    // remove wave (by index) 

});

test("senkenSynth: Oscillator", function() {

    var endController = new MasterController(context);
    var testOscillator = new Oscillator(context, endController);

    // simulation of GUI
    var enumWaveType = 1 // triangle wave
    endController.startSession();
    testOscillator.startBucket();

    // generate triangleWave, and stack it to the wavebucket 

    testOscillator.soundWaveStacker(200, enumWaveType, false);
    var testWaveI = testOscillator.wavebucket.select(0);
    equals(testWaveI.frequency.value, 200, "sound wave stacked with correct frequency in wavebucket");
    equals(testWaveI.type, "square", "type is set and stored in wavebucket");

});

test("senkenSynth: Lfo", function() {
  
    var endController = new MasterController(context);

    var testOscillator = new Oscillator(context, endController);
    var testLfo = new Lfo(context);

    // simulation of GUI
    var enumLfoWaveType = 3 // triangle wave
    endController.startSession();
    testOscillator.startBucket();

    // generate triangleWave, and stack it to the wavebucket 
    testLfo.lfoActivator(1, 2, enumLfoWaveType);
  
    equals(testLfo.readFrequency(), 1, "Lfo frequency set");
    equals(testLfo.readScale(), 2, "Lfo scale set");
    equals(testLfo.translateLfoTypeEnumToString(enumLfoWaveType), "sawtooth", "Lfo type is translated and set");

});



test("senkenSynth: BiQuadFilter", function () {

    var testbiQuadFilter = new BiquadFilter(context);

    // simulation of GUI
    var enumBiQuadType = 3 // triangle wave
   

    // generate triangleWave, and stack it to the wavebucket 
    testbiQuadFilter.setType(enumBiQuadType);
    testbiQuadFilter.setFrequency(100);
    testbiQuadFilter.setQ(2);
    testbiQuadFilter.setGain(-20);

    equals(testbiQuadFilter.readType(), "lowshelf", "BiQuadFilter type set")
    equals(testbiQuadFilter.readFrequency(), 100, "BiQuadFilter frequency set")
    equals(testbiQuadFilter.readQ(), 2, "BiQuadFilter Q set")
    equals(testbiQuadFilter.readGain(), -20, "BiQuadFilter gain set")


   

});