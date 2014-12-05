/// <reference path="../app/senkenSynth.js" />
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

QUnit.test("senkenSynth: class was found", function(assert) {

    var isContext;
    if (context) {
        isContext = true;
    } else {
        isContext = false;
    }

    assert.equal(isContext, true, "WEB AUDIO API is found");

});


// Compressor tests

QUnit.test("senkenSynth: compressor functionality", function (assert) {

    // create testCompressor
    var testCompressor = new Compressor(context);

// test ratio
    testCompressor.ratioAdjuster(4);
    var ratioValue = testCompressor.readRatio();
    assert.equal(ratioValue, 4, "ratio functionality works");

    // test knee
    testCompressor.kneeAdjuster(5);
    var kneeValue = testCompressor.readKnee();
    assert.equal(kneeValue, 5, "knee functionality works");
    
    // test treshold
    testCompressor.thresholdAdjuster(-10);
    var thresholdValue = testCompressor.readThreshold();
    assert.equal(thresholdValue, -10, "threshold functionality works");


});

QUnit.test("senkenSynth: masterController", function (assert) {

    var testController = new MasterController(context);
    // test gainlevels
    testController.gainAdjuster(50);
    assert.equal(0.5, testController.readGain(), "gain functionality");

    // test activation
    testController.startSession();
    assert.equal(true, testController.isActive(), "starting session works")

    // test  deactivation
    testController.stopSession();
    assert.equal(false, testController.isActive(), "pauzing session works")

});

QUnit.test("senkenSynth: WaveBucket", function (assert) {

    var testBucket = new WaveBucket();

    // add wave
    var testWave = context.createOscillator();
    testBucket.addWave(testWave);
    var length = testBucket.getSize();
    assert.equal(length, 1, "adding wave");

    // remove wave (by pop())
    testBucket.remove();
    assert.equal(0, testBucket.getSize(), "removing wave")

    // remove wave (by index) 

});

QUnit.test("senkenSynth: Oscillator", function (assert) {

    var endController = new MasterController(context);
    var testOscillator = new Oscillator(context, endController);

    // simulation of GUI
    var enumWaveType = 1 // triangle wave
    endController.startSession();
    testOscillator.startBucket();

    // generate triangleWave, and stack it to the wavebucket 

    testOscillator.soundWaveStacker(200, enumWaveType, false);
    var testWaveI = testOscillator.wavebucket.select(0);
    assert.equal(testWaveI.frequency.value, 200, "sound wave stacked with correct frequency in wavebucket");
    assert.equal(testWaveI.type, "square", "type is set and stored in wavebucket");

});

QUnit.test("senkenSynth: Lfo", function (assert) {
  
    var endController = new MasterController(context);

    var testOscillator = new Oscillator(context, endController);
    var testLfo = new Lfo(context);

    // simulation of GUI
    var enumLfoWaveType = 3 // triangle wave
    endController.startSession();
    testOscillator.startBucket();

    // generate triangleWave, and stack it to the wavebucket 
    testLfo.lfoActivator(1, 2, enumLfoWaveType);
  
    assert.equal(testLfo.readFrequency(), 1, "Lfo frequency set");
    assert.equal(testLfo.readScale(), 2, "Lfo scale set");
    assert.equal(testLfo.translateLfoTypeEnumToString(enumLfoWaveType), "sawtooth", "Lfo type is translated and set");

});



QUnit.test("senkenSynth: BiQuadFilter", function (assert) {

    var testbiQuadFilter = new BiquadFilter(context);

    // simulation of GUI
    var enumBiQuadType = 3 // triangle wave
   

    // generate triangleWave, and stack it to the wavebucket 
    testbiQuadFilter.setType(enumBiQuadType);
    testbiQuadFilter.setFrequency(100);
    testbiQuadFilter.setQ(2);
    testbiQuadFilter.setGain(-20);

    assert.equal(testbiQuadFilter.readType(), "lowshelf", "BiQuadFilter type set")
    assert.equal(testbiQuadFilter.readFrequency(), 100, "BiQuadFilter frequency set")
    assert.equal(testbiQuadFilter.readQ(), 2, "BiQuadFilter Q set")
    assert.equal(testbiQuadFilter.readGain(), -20, "BiQuadFilter gain set")


   

});