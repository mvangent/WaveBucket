/// <reference path="jquery-2.1.1.min.js" />
/// <reference path="jquery-2.1.1.js" />

/// <reference path="../app/senkenBiquadFilter.js" />
/// <reference path="../app/senkenCompressor.js" />
/// <reference path="../app/senkenMasterController.js" />
/// <reference path="../app/senkenVisualAnalyser.js" />
/// <reference path="../app/senkenLfo.js" />
/// <reference path="../app/senkenWaveBucket.js" />
/// <reference path="../app/senkenOscillator.js" />
/// <reference path="../app/senkenSynth.js" />



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


QUnit.test("connections", function(assert) {

  

    var analyser = new Analyser(context);
    var filterI = new BiquadFilter(context);
    var endController = new MasterController(context);
    var finalCompressor = new Compressor(context);
    var oscillatorI = new Oscillator(context, endController);
    var lfoI = new Lfo(context);


    var wiring = new Wiring(context, filterI, analyser, endController, finalCompressor, oscillatorI, lfoI);
    // because passing pointer variables in methods is not possible in js.:

    // function updateWiringCallBack() { wiring.updateConnections(); }

    function Wiring(context, filterI, analyser, endController, finalCompressor, oscillatorI, lfoI) {

        

        this.updateConnections = function () {

            console.log("update connection reached");

            assert.equal(analyser.outputTo(context.destination), true, "updateconnections");
            assert.equal(filterI.outputTo(analyser.input()), true, "updateconnections");
            assert.equal(endController.outputTo(filterI.input()), true, "updateconnections");
            assert.equal(finalCompressor.outputTo(endController.input()), true, "updateconnections");
            assert.equal(oscillatorI.outputTo(finalCompressor.input()), true, "updateconnections");
            assert.equal(lfoI.outputTo(oscillatorI.gainNodeInputForLfo()), true, "updateconnections");

            //analyser.outputTo(context.destination);
            //filterI.outputTo(analyser.input());
            //endController.outputTo(filterI.input());
            //finalCompressor.outputTo(endController.input());
            //oscillatorI.outputTo(finalCompressor.input());
            //lfoI.outputTo(oscillatorI.gainNodeInputForLfo());

            return true;
        }
    }

    

    var connectionsUpdated = wiring.updateConnections();

    assert.equal(connectionsUpdated, true, "updateconnections");

    assert.equal(updateWiringCallBack(), true, "updateconnections");


});



QUnit.test("senkenSynth: class was found", function(assert) {

    var isContext;

    if (context) {
        isContext = true;
    } else {
        isContext = false;
    }

    context = false;

    assert.equal(isContext, true, "WEB AUDIO API is found");

    if (context) {
        isContext = true;
    } else {
        isContext = false;
    }

    assert.equal(isContext, false, "WEB AUDIO API not found");

    context = new ContextClass();

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
    var bucketStartTest = testOscillator.startBucket();
    assert.equal(bucketStartTest, true, "bucket started");

    // generate triangleWave, and stack it to the wavebucket 

    testOscillator.stackSoundWave(200, enumWaveType, false);

    var lastWaveRemoved = testOscillator.lastWaveRemoved;

    assert.equal(lastWaveRemoved, false, "soundWave stacked");

    var testWaveI = testOscillator.wavebucket.select(0);
    assert.equal(testWaveI.frequency.value, 200, "sound wave stacked with correct frequency in wavebucket");
    assert.equal(testWaveI.type, "square", "type is set and stored in wavebucket");

    var testSine = testOscillator.waveGenerator(200, testOscillator.translateOscTypeEnumToString(0), false);
    assert.equal(testSine.type, "sine", "translated into sinewave");

    var testTriangle = testOscillator.waveGenerator(200, testOscillator.translateOscTypeEnumToString(2), false);
    assert.equal(testTriangle.type, "triangle", "translated into triangle wave");

    var testSawTooth = testOscillator.waveGenerator(200, testOscillator.translateOscTypeEnumToString(3), false);
    assert.equal(testSawTooth.type, "sawtooth", "translated into triangle wave");

    endController.stopSession();
    var bucketStopTest = testOscillator.freezeBucket();
    assert.equal(bucketStopTest, true, "bucket stopped");
    

});

QUnit.test("senkenSynth: Lfo", function (assert) {
  
    var endController = new MasterController(context);

    var testOscillator = new Oscillator(context, endController);
    var testLfo = new Lfo(context);

    // simulation of GUI
    var enumLfoWaveType = 3 // sawtooth wave
    endController.startSession();
    testOscillator.startBucket();

    // generate triangleWave, and stack it to the wavebucket 
    testLfo.lfoActivator(1, 2, enumLfoWaveType);
  
    assert.equal(testLfo.readFrequency(), 1, "Lfo frequency set");
    assert.equal(testLfo.readScale(), 2, "Lfo scale set");
    assert.equal(testLfo.translateLfoTypeEnumToString(enumLfoWaveType), "sawtooth", "Lfo type sawtooth is translated and set");
    assert.equal(testLfo.lfoActive, true, "lfo is active");

    testLfo.lfoDeactivator();
    assert.equal(testLfo.lfoActive, false, "lfo deactivated");

    // test oscillation shapes
    assert.equal(testLfo.translateLfoTypeEnumToString(0), "sine", "Lfo type sine is translated and set");
    assert.equal(testLfo.translateLfoTypeEnumToString(1), "square", "Lfo type square is translated and set");
    assert.equal(testLfo.translateLfoTypeEnumToString(2), "triangle", "Lfo type triangle is translated and set");


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

    assert.equal(testbiQuadFilter.readType(), "lowshelf", "BiQuadFilter type set");

    testbiQuadFilter.setType(0);
    assert.equal(testbiQuadFilter.readType(), "lowpass", "BiQuadFilter type set");

    testbiQuadFilter.setType(1);
    assert.equal(testbiQuadFilter.readType(), "highpass", "BiQuadFilter type set");

    testbiQuadFilter.setType(2);
    assert.equal(testbiQuadFilter.readType(), "bandpass", "BiQuadFilter type set");

    testbiQuadFilter.setType(4);
    assert.equal(testbiQuadFilter.readType(), "highshelf", "BiQuadFilter type set");

    testbiQuadFilter.setType(5);
    assert.equal(testbiQuadFilter.readType(), "peaking", "BiQuadFilter type set");

    testbiQuadFilter.setType(6);
    assert.equal(testbiQuadFilter.readType(), "notch", "BiQuadFilter type set");

    testbiQuadFilter.setType(7);
    assert.equal(testbiQuadFilter.readType(), "allpass", "BiQuadFilter type set");


    assert.equal(testbiQuadFilter.readFrequency(), 100, "BiQuadFilter frequency set")
    assert.equal(testbiQuadFilter.readQ(), 2, "BiQuadFilter Q set")
    assert.equal(testbiQuadFilter.readGain(), -20, "BiQuadFilter gain set")


   

});