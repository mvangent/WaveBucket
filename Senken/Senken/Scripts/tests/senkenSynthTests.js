/// <reference path="jquery-2.1.1.min.js" />
/// <reference path="jquery-2.1.1.js" />
/// <reference path="../app/senkenDelay.js" />
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


    QUnit.test("senkenSynth: Oscillator", function () {

        var endController = new MasterController(context);
        var testOscillator = new Oscillator(context, endController);

        // simulation of GUI
        var enumWaveType = 1 // square wave
        endController.startSession();
        var bucketStartTest = testOscillator.startBucket();
        equal(bucketStartTest, true, "bucket started");

        // generate triangleWave, and stack it to the wavebucket 

        testOscillator.stackSoundWave(200, enumWaveType, false);

        var lastWaveRemoved = testOscillator.lastWaveRemoved;

        equal(lastWaveRemoved, false, "soundWave stacked");

        var testWaveI = testOscillator.wavebucket.select(0);
        equal(testWaveI.frequency.value, 200, "sound wave stacked with correct frequency in wavebucket");
        equal(testWaveI.type, "square", "type is set and stored in wavebucket");

        var testSine = testOscillator.waveGenerator(200, testOscillator.translateOscTypeEnumToString(0), 0, 0, false);
        equal(testSine.type, "sine", "translated into sinewave");

        var testTriangle = testOscillator.waveGenerator(200, testOscillator.translateOscTypeEnumToString(2), 0, 1, false);
        equal(testTriangle.type, "triangle", "translated into triangle wave");

        var testSawTooth = testOscillator.waveGenerator(200, testOscillator.translateOscTypeEnumToString(3), 0, 2, false);
        equal(testSawTooth.type, "sawtooth", "translated into triangle wave");

        var testdefaultSine = testOscillator.waveGenerator(200, testOscillator.translateOscTypeEnumToString(5), 0, 3, false);
        equal(testdefaultSine.type, "sine", "translated into default sine wave");


     
        
        lastWaveRemoved = testOscillator.removeLastWave();
        equal(lastWaveRemoved, true, "last soundWave removed");

        testOscillator.removeLastWave();
        lastWaveRemoved = testOscillator.removeLastWave();
        equal(lastWaveRemoved, false, "last soundWave already removed");


        endController.stopSession();
        var bucketStopTest = testOscillator.freezeBucket();
        equal(bucketStopTest, true, "bucket stopped");


         endController.startSession();
         testOscillator.stackSoundWave(200, enumWaveType, false);
        testOscillator.removeWave(0);
        var sizeBucket = testOscillator.wavebucket.getSize();

        equal(sizeBucket, 0, "remove wave by index");

        endController.stopSession();
        testOscillator.stackSoundWave(200, enumWaveType, false);
        var sizeBucketAfterSessionStopped = testOscillator.wavebucket.getSize();
        equal(sizeBucketAfterSessionStopped, 0, "wave not added because session was stopped");

        // translate waves to enums
        var sineEnum = testOscillator.translateStringToTypeEnum("sine");
        var squareEnum = testOscillator.translateStringToTypeEnum("square");
        var triangleEnum = testOscillator.translateStringToTypeEnum("triangle");
        var sawtoothEnum = testOscillator.translateStringToTypeEnum("sawtooth");
        var defaultEnum = testOscillator.translateStringToTypeEnum("default");

        equal(sineEnum, 0, "translation to sine enum");
        equal(squareEnum, 1, "translation to square enum");
        equal(triangleEnum, 2, "translation to triangle enum");
        equal(sawtoothEnum, 3, "translation to sawtooth enum");
        equal(defaultEnum, 0, "translation to default enum");


    });


QUnit.test("connections", function() {

  

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

            equal(analyser.outputTo(context.destination), true, "updateconnections");
            equal(filterI.outputTo(analyser.input()), true, "updateconnections");
            equal(endController.outputTo(filterI.input()), true, "updateconnections");
            equal(finalCompressor.outputTo(endController.input()), true, "updateconnections");
            equal(oscillatorI.outputTo(finalCompressor.input()), true, "updateconnections");
            equal(lfoI.outputTo(oscillatorI.gainNodeInputForLfo()), true, "updateconnections");

        

            return true;
        }
    }

    

    var connectionsUpdated = wiring.updateConnections();

    equal(connectionsUpdated, true, "updateconnections");

   // equal(updateWiringCallBack(), true, "updateconnections");


});



QUnit.test("senkenSynth: class was found", function(){

    var isContext;

    if (context) {
        isContext = true;
    } else {
        isContext = false;
    }

    context = false;

    equal(isContext, true, "WEB AUDIO API is found");

    if (context) {
        isContext = true;
    } else {
        isContext = false;
    }

    equal(isContext, false, "WEB AUDIO API not found");

    context = new ContextClass();

});


// Compressor tests

QUnit.test("senkenSynth: compressor functionality", function () {

    // create testCompressor
    var testCompressor = new Compressor(context);

// test ratio
    testCompressor.ratioAdjuster(4);
    var ratioValue = testCompressor.readRatio();
    equal(ratioValue, 4, "ratio functionality works");

    // test knee
    testCompressor.kneeAdjuster(5);
    var kneeValue = testCompressor.readKnee();
    equal(kneeValue, 5, "knee functionality works");
    
    // test treshold
    testCompressor.thresholdAdjuster(-10);
    var thresholdValue = testCompressor.readThreshold();
    equal(thresholdValue, -10, "threshold functionality works");


});

QUnit.test("senkenSynth: masterController", function () {

    var testController = new MasterController(context);
    // test gainlevels
    testController.gainAdjuster(50);
    equal(0.5, testController.readGain(), "gain functionality");

    // test activation
    testController.startSession();
    equal(true, testController.isActive(), "starting session works")

    // test  deactivation
    testController.stopSession();
    equal(false, testController.isActive(), "pauzing session works")

});

QUnit.test("senkenSynth: WaveBucket", function () {

    var testBucket = new WaveBucket(context, 0, new Oscillator(context));

    // add wave
    var testWave = context.createOscillator();

    

    testBucket.addWave(testWave);
    var length = testBucket.getSize();
    equal(length, 1, "adding wave");

    // remove wave (by pop())
    testBucket.removeLastWave();
    equal(0, testBucket.getSize(), "removing wave")

    // remove wave (by index) 


    // oscilliationsToString

    var testBucketII = new WaveBucket(context, 0, new Oscillator(context));

    var testOscillationII = context.createOscillator();

    testOscillationII.frequency.value = 200;
    testOscillationII.type = "sine";

    testOscillationII.start(context.currentTime);

    testBucketII.addWave(testOscillationII);

    var toStringWaveBucketTest = testBucketII.oscillationsToString();

    equal(toStringWaveBucketTest, "200 sine 1,", "wavebucket toString with one oscillation");


    // saveBucket

    //loadBucket
    

});



QUnit.test("senkenSynth: Lfo", function () {
  
    var endController = new MasterController(context);

    var testOscillator = new Oscillator(context, endController);
    var testLfo = new Lfo(context);

    // simulation of GUI
    var enumLfoWaveType = 3 // sawtooth wave
    endController.startSession();
    testOscillator.startBucket();

    // generate triangleWave, and stack it to the wavebucket 
    testLfo.lfoActivator(1, 2, enumLfoWaveType);
  
    equal(testLfo.readFrequency(), 1, "Lfo frequency set");
    equal(testLfo.readScale(), 2, "Lfo scale set");
    equal(testLfo.translateLfoTypeEnumToString(enumLfoWaveType), "sawtooth", "Lfo type sawtooth is translated and set");
    equal(testLfo.lfoActive, true, "lfo is active");

    testLfo.lfoDeactivator();
    equal(testLfo.lfoActive, false, "lfo deactivated");

    // test oscillation shapes
    equal(testLfo.translateLfoTypeEnumToString(0), "sine", "Lfo type sine is translated and set");
    equal(testLfo.translateLfoTypeEnumToString(1), "square", "Lfo type square is translated and set");
    equal(testLfo.translateLfoTypeEnumToString(2), "triangle", "Lfo type triangle is translated and set");




});



QUnit.test("senkenSynth: BiQuadFilter", function () {

    var testbiQuadFilter = new BiquadFilter(context);

    // simulation of GUI
    var enumBiQuadType = 3 // triangle wave
   

    // generate triangleWave, and stack it to the wavebucket 
    testbiQuadFilter.setType(enumBiQuadType);
    testbiQuadFilter.setFrequency(100);
    testbiQuadFilter.setQ(2);
    testbiQuadFilter.setGain(-20);

    equal(testbiQuadFilter.readType(), "lowshelf", "BiQuadFilter type set");

    testbiQuadFilter.setType(0);
    equal(testbiQuadFilter.readType(), "lowpass", "BiQuadFilter type set");

    testbiQuadFilter.setType(1);
    equal(testbiQuadFilter.readType(), "highpass", "BiQuadFilter type set");

    testbiQuadFilter.setType(2);
    equal(testbiQuadFilter.readType(), "bandpass", "BiQuadFilter type set");

    testbiQuadFilter.setType(4);
    equal(testbiQuadFilter.readType(), "highshelf", "BiQuadFilter type set");

    testbiQuadFilter.setType(5);
    equal(testbiQuadFilter.readType(), "peaking", "BiQuadFilter type set");

    testbiQuadFilter.setType(6);
    equal(testbiQuadFilter.readType(), "notch", "BiQuadFilter type set");

    testbiQuadFilter.setType(7);
    equal(testbiQuadFilter.readType(), "allpass", "BiQuadFilter type set");


    equal(testbiQuadFilter.readFrequency(), 100, "BiQuadFilter frequency set")
    equal(testbiQuadFilter.readQ(), 2, "BiQuadFilter Q set")
    equal(testbiQuadFilter.readGain(), -20, "BiQuadFilter gain set")


   

});