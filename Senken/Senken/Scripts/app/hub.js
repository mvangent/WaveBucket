

/*------------------------------------------------------------------------------------------------------
** SignalR ControllerHub: implementation of event listeners through a WebSocket, based on seperation of 
** concerns model. 
--------------------------------------------------------------------------------------------------------
*/

/* jamhub  impl */
$(function () {
    console.log("jamhub is reached");
    // reference the auto-generated proxy for the hub
    var jam = $.connection.jamHub;

    // create a function that the hub can call back to create sounds
    jam.client.stackSoundWavePointer = oscillatorI.stackSoundWave,
    jam.client.waveRemoverPointer = oscillatorI.removeLastWave;
    jam.client.lfoActivatorPointer = lfoI.lfoActivator;
    jam.client.lfoDeactivatorPointer = lfoI.lfoDeactivator;
    jam.client.compRatioAdjusterPointer = finalCompressor.ratioAdjuster;
    jam.client.compKneeAdjusterPointer = finalCompressor.kneeAdjuster;
    jam.client.compThresholdAdjusterPointer = finalCompressor.thresholdAdjuster;
    jam.client.freezeBucketPointer = oscillatorI.freezeBucket;
    jam.client.startBucketPointer = oscillatorI.startBucket;
    jam.client.masterGainAdjusterPointer = endController.gainAdjuster;
    jam.client.startSessionPointer = endController.startSession;
    jam.client.stopSessionPointer = endController.stopSession;

    jam.client.changeFilterTypeOnePointer = filterI.setType;
    jam.client.changeFilterFrequencyOnePointer = filterI.setFrequency;
    jam.client.changeFilterQOnePointer = filterI.setQ;
    jam.client.changeFilterGainOnePointer = filterI.setGain;


    // update connections between sound modules
    jam.client.updateConnectionsPointer = wiring.updateConnections;

    // update displays
    jam.client.updateLfoDisplayPointer = lfoI.updateDisplay();
    jam.client.updateEndControlDisplayPointer = endController.updateDisplay;
    jam.client.updateCompressorDisplayPointer = finalCompressor.updateDisplay;
    jam.client.updateOscillatorDisplayPointer = oscillatorI.updateDisplay;


    $.connection.hub.start().done(function () {

        /* Oscillator Event Listeners */

        $('#sineButton').click(function () {
            console.log("sineButton clicked");
            jam.server.stackASoundWave($('#sineFreq').val(), $('#oscIType').val(), true);
        });


        $('#sineStopButton').click(function () {
            console.log("sineStopButton clicked");
            jam.server.removeLastSound();
        });

        /* Lfo Event Listeners */

        // event listener activation LFO 
        $('#LFOButton').click(function () {
            console.log("LFOButton clicked");
            jam.server.activateLFO($('#LFOFreq').val(), $('#LFOScale').val(), $('#lfoIType').val());
        });

        // event listener deactivation LFO 
        $('#LFOStopButton').click(function () {
            console.log("LFOStopButton clicked");
            jam.server.deactivateLFO();
        });


        /* Compressor Event Listeners */
        // event listener ratio Compressor 
        $('#compRatio').change(function () {
            console.log("compressor ratio adjusted");
            jam.server.adjustCompRatio($('#compRatio').val());
        });

        // event listener knee Compressor 
        $('#compKnee').change(function () {
            console.log("compressor knee adjusted");
            jam.server.adjustCompKnee($('#compKnee').val());
        });

        // event listener treshold Compressor 
        $('#compThreshold').change(function () {
            console.log("compressor treshold adjusted");
            jam.server.adjustCompThreshold($('#compThreshold').val());
        });

        /* Master Controller Event Listeners */
        // event listener gain field
        $('#masterGain').change(function () {
            jam.server.changeMasterGain($('#masterGain').val());
        });

        // event listener suspend button
        $('#stopButton').click(function () {
            jam.server.stopSession();
        });

        // event listener start button
        $('#playButton').click(function () {
            jam.server.playSession();
        });

        /* BiquadFilter I Event Listeners */
        // event listener type box
        $('#filterTypeOne').change(function () {
            jam.server.changeFilterTypeOne($('#filterTypeOne').val());
        });

        // event listener frequency field
        $('#filterFrequencyOne').change(function () {
            jam.server.changeFilterFrequencyOne($('#filterFrequencyOne').val());
        });

        // event listener Q field
        $('#filterQOne').change(function () {
            jam.server.changeFilterQOne($('#filterQOne').val());
        });

        // event listener gain field
        $('#filterGainOne').change(function () {
            jam.server.changeFilterGainOne($('#filterGainOne').val());
        });


    });

});