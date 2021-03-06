﻿
/*------------------------------------------------------------------------------------------------------
** Object: ContextClass() : imported from WebAudioApi 
--------------------------------------------------------------------------------------------------------
** Documentation: http://webaudio.github.io/web-audio-api/
--------------------------------------------------------------------------------------------------------
*/

var context;
var ContextClass = (window.AudioContext ||
window.webkitAudioContext ||
window.mozAudioContext ||
window.oAudioContext ||
window.msAudioContext);
if (ContextClass) {
    // Web Audio API is available.
    context = new ContextClass();
} else {
    // Web Audio API is not available. Ask the user to use a supported browser.
    alert("no WebApi was found for your browser, try Google Chrome");
}

/*------------------------------------------------------------------------------------------------------
** Init: initialising wiring class and connections. 
--------------------------------------------------------------------------------------------------------
*/
// general controls
var endController = new MasterController(context);
var analyser = new Analyser(context);
analyser.draw();
var finalCompressor = new Compressor(context);

// oscillator I & related modules
var delayI = new Delay(context);
var filterI = new BiquadFilter(context);
var oscillatorI = new Oscillator(context, endController, "oscI");
var lfoI = new Lfo(context);

// oscillator II & related modules
var delayII = new Delay(context);
var filterII = new BiquadFilter(context);
var oscillatorII = new Oscillator(context, endController, "oscII");
var lfoII = new Lfo(context);

var wiring = new Wiring(context, filterI, analyser, endController, finalCompressor, oscillatorI, lfoI);
// because passing pointer variables in methods is not possible in js.:
function updateWiringCallBack() {
    wiring.updateConnections();
    return true;
}

/*------------------------------------------------------------------------------------------------------
** Object: Wiring([] soundmodules) : prototype 
--------------------------------------------------------------------------------------------------------
*/
function Wiring(context, filterI, analyser, endController, finalCompressor, oscillatorI, lfoI) {
    var self = this;
    self.updateConnections = function () {
        //analyser
        analyser.outputTo(context.destination);

        // master controls
        endController.outputTo(analyser.input());
        finalCompressor.outputTo(endController.input());

        // oscillator I with lfo and filter
        delayI.outputTo(finalCompressor.input());
        filterI.outputTo(delayI.input());
        oscillatorI.outputTo(filterI.input());
        lfoI.outputTo(oscillatorI.gainNodeInputForLfo());

        // hardwired connections
        console.log(oscillatorI.wavebucket.gainNode(0));

        (oscillatorI.wavebucket.gainNode(0)).connect(oscillatorI.gainNodeInputForWaveBucket());

        (oscillatorI.wavebucket.gainNode(1)).connect(oscillatorI.gainNodeInputForWaveBucket());

        (oscillatorI.wavebucket.gainNode(2)).connect(oscillatorI.gainNodeInputForWaveBucket());

        (oscillatorI.wavebucket.gainNode(3)).connect(oscillatorI.gainNodeInputForWaveBucket());

        (oscillatorI.wavebucket.gainNode(4)).connect(oscillatorI.gainNodeInputForWaveBucket());

        (oscillatorI.wavebucket.gainNode(5)).connect(oscillatorI.gainNodeInputForWaveBucket());

        (oscillatorI.wavebucket.gainNode(6)).connect(oscillatorI.gainNodeInputForWaveBucket());

        (oscillatorI.wavebucket.gainNode(7)).connect(oscillatorI.gainNodeInputForWaveBucket());

        (oscillatorI.wavebucket.gainNode(8)).connect(oscillatorI.gainNodeInputForWaveBucket());

        (oscillatorI.wavebucket.gainNode(9)).connect(oscillatorI.gainNodeInputForWaveBucket());

        // oscillator II with lfo and filter
        delayII.outputTo(finalCompressor.input());
        filterII.outputTo(delayII.input());
        oscillatorII.outputTo(filterII.input());
        lfoII.outputTo(oscillatorII.gainNodeInputForLfo());

        // hardwired connections
        (oscillatorII.wavebucket.gainNode(0)).connect(oscillatorII.gainNodeInputForWaveBucket());

        (oscillatorII.wavebucket.gainNode(1)).connect(oscillatorII.gainNodeInputForWaveBucket());

        (oscillatorII.wavebucket.gainNode(2)).connect(oscillatorII.gainNodeInputForWaveBucket());

        (oscillatorII.wavebucket.gainNode(3)).connect(oscillatorII.gainNodeInputForWaveBucket());

        (oscillatorII.wavebucket.gainNode(4)).connect(oscillatorII.gainNodeInputForWaveBucket());

        (oscillatorII.wavebucket.gainNode(5)).connect(oscillatorII.gainNodeInputForWaveBucket());

        (oscillatorII.wavebucket.gainNode(6)).connect(oscillatorII.gainNodeInputForWaveBucket());

        (oscillatorII.wavebucket.gainNode(7)).connect(oscillatorII.gainNodeInputForWaveBucket());

        (oscillatorII.wavebucket.gainNode(8)).connect(oscillatorII.gainNodeInputForWaveBucket());

        (oscillatorII.wavebucket.gainNode(9)).connect(oscillatorII.gainNodeInputForWaveBucket());

        return true;
    }
}

/*------------------------------------------------------------------------------------------------------
** View: Initialising values in the view
--------------------------------------------------------------------------------------------------------
*/
$('.senkenContainer').css({ 'opacity': 0.4 });
$('#senkenLeftColumn').css({ 'float': 'left' }).width('50%');
$('#senkenRightColumn').css({ 'float': 'right' }).width('49%'); // initialize fields
$('#masterGain').val(30);

var visibilityCheck = function () {

    console.log($('#UserIsOwner').val());
    console.log($('#OpenToEvolution').val());

    if (($('#UserIsOwner').val() === "False") && ($('#OpenToEvolution').val() === "True")) {
        $('.senkenContainer').hide();
        $('#compressor').hide();
        $('#masterControls').hide();
        $('#SaveButton').hide();

    } else if (($('#UserIsOwner').val() === "False") && ($('#OpenToEvolution').val() === "False")) {
        $('.senkenContainer').hide();
        $('#compressor').hide();
        $('#masterControls').hide();

    } else if (($('#UserIsOwner').val() === "True" && ($('#OpenToEvolution').val() === "False"))) {
        $('.senkenContainer').hide();
        $('#compressor').hide();
        $('#masterControls').hide();
        $('#SaveButton').hide();

    } else if (($('#UserIsOwner').val() === "True" && ($('#OpenToEvolution').val() === "True")))
        $('.senkenContainer').hide();
    $('#compressor').hide();
    $('#masterControls').hide();
    $('#SaveButton').hide();

};

visibilityCheck();





