
/*---------------------------------------------------------------------------------------------------------
------- AudioContext ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

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


/*---------------------------------------------------------------------------------------------------------
------- JQuery / CSS ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

$('.senkenContainer').css({ 'opacity': 0.4 });
$('#senkenLeftColumn').css({ 'float': 'left' }).width('60%');
$('#senkenRightColumn').css({ 'float': 'right' }).width('39%'); // initialize fields
$('#compRatio').val(12);
$('#compKnee').val(30);
$('#compThreshold').val(-23);
$('#masterGain').val(100);




/*---------------------------------------------------------------------------------------------------------
------- VISUALISER NO. ONE ----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

/* canvas related code */
var canvas;
var canvasCtx;

canvas = document.getElementById("oscIVisualiser");
canvasCtx = canvas.getContext("2d");



var WIDTH = canvas.width;
var HEIGHT = canvas.height;
//var intendedWidth = document.querySelector('.wrapper').clientWidth;
//canvas.setAttribute('width', intendedWidth);
//var visualSelect = document.getElementById("visual");

var drawVisual;

/* Visualisation related Code */
var analyser = context.createAnalyser();

analyser.connect(context.destination);

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);



// clear canvas
canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
    //console.log("draw OscI function entered");

    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    //set canvas background
    canvasCtx.fillStyle = 'rgb(190, 230, 180)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    // set canvas linewidth and stroke
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(90, 205, 90)';
    // begin drawing a path
    canvasCtx.beginPath();

    // slice canvas width segments according to number of bins from FFT
    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var position = 0;

    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT / 2;

        if (i == 0) {
            canvasCtx.moveTo(position, y);

        } else {
            canvasCtx.lineTo(position, y);
        }

        position += sliceWidth;


    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);

    canvasCtx.stroke();



}

draw();



/*---------------------------------------------------------------------------------------------------------
------- MASTER CONTROLS ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

var start = false;
var stop = true;

function sendOne() {
    return 1;
}


/* stop (suspend) button */

sessionSuspender = function () {

    if (!stop) {

        oscActivation = false;

        console.log("stop function activated");

        for (var i = 0; i < waveBucket.length; i++) {
            waveBucket[i].stop();
        }

        stop = true;
        start = false;

        $('.senkenContainer').css({'opacity' : 0.4});

    }
};
sessionPlayer = function () {

    if (!start) {

        oscActivation = true;

        console.log("start function activated");

        var arrayLength = waveBucket.length;
        var i;
        for (i = 0; i < arrayLength; i++) {
            addWaveToBucket(waveGenerator(waveBucket[i].frequency.value, waveBucket[i].type));
       
        }

        for (i = 0; i < arrayLength; i++) {
            waveBucket.shift();

        }

        updateWaveBucketDisplay();

        start = true;
        stop = false;

        $('.senkenContainer').css({ 'opacity': 1.0 });
    }
    
}; /* gain */

var masterVolume = context.createGain();
masterVolume.connect(analyser);

masterVolume.gain.value = 1;

var masterGain = function (masGain) {
    masterVolume.gain.value = masGain / 100;
    $('#masterGain').val(masGain);
};

function getMasterGain() {
    console.log("Master Gain change: " + document.getElementById("masterGain").value);
    var master = (parseFloat(document.getElementById("masterGain").value));
    return master;
};





/*---------------------------------------------------------------------------------------------------------
------- DYNAMIC COMPRESSOR ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

var compressor = context.createDynamicsCompressor();
compressor.connect(masterVolume);

// ratio 

var compRatioAdjuster = function(ratio) {
    console.log("compressor ratio set to 1 /  " + ratio);
    compressor.ratio.value = ratio;

    // change value in field
    $('#compRatio').val(ratio);
};

function getCompressorRatio() {
    console.log("compressor Ratio request: " + document.getElementById("compRatio").value);
    var compressorRatio = (parseFloat(document.getElementById("compRatio").value));
    return compressorRatio;
};

// knee

var compKneeAdjuster = function(knee) {
    console.log("compressor knee set to " + knee);
    compressor.knee.value = knee;

    // change value in field
    $('#compKnee').val(knee);
};

function getCompressorKnee() {
    console.log("compressor Knee request: " + document.getElementById("compKnee").value);
    var compressorKnee = (parseFloat(document.getElementById("compKnee").value));
    return compressorKnee;
};

// threshold

var compThresholdAdjuster = function(threshold) {
    console.log("compressor Threshold set to " + threshold);
    compressor.threshold.value = threshold;

    // change value in field
    $('#compThreshold').val(threshold);
};

function getCompressorThreshold() {
    console.log("compressor Threshold request: " + document.getElementById("compThreshold").value);
    var compressorThreshold = (parseFloat(document.getElementById("compThreshold").value));
    return compressorThreshold;
};



/*-----------------------------------------------------------------------------------------------------------
  ------- WAVE AND WAVEBUCKET -------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------------------
*/

var waveBucket = [];
var freshlyAddedOscillation = false;

function addWaveToBucket(osc) {
    waveBucket.push(osc);
    freshlyAddedOscillation = true;
    updateWaveBucketDisplay(osc);

}

function removeWaveFromBucket() {

    if (freshlyAddedOscillation) {
        waveBucket.pop();
        freshlyAddedOscillation = false;
    }

    updateWaveBucketDisplay();
}

function updateWaveBucketDisplay() {

    var arrayLength = waveBucket.length;

    var mydiv = document.getElementById("bucketlist");

    mydiv.innerHTML = "";

    for (var i = 0; i < arrayLength; i++) {

        var newcontent = document.createElement('li');
        newcontent.innerHTML = waveBucket[i].frequency.value + " " + waveBucket[i].type;

        mydiv.appendChild(newcontent);

    };




}






/*---------------------------------------------------------------------------------------------------------
------- OSCILLATOR NO. ONE ------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/




/* SineStacker related Code */
var oscActivation = false;

var osc;

var oscIType = "sine";

var gainNode = context.createGain();

var soundWaveStacker = function (frequency, oscType) {

    addWaveToBucket(waveGenerator(frequency, oscType));
};

function waveGenerator(sineFrequency, oscType) {

    if (oscActivation) {

        

        console.log("makeSineWave reached");
        // Create oscillator.
        osc = context.createOscillator();
        osc.type = oscType;
        osc.frequency.value = sineFrequency;
        // create gainNode
        //gainNode = context.createGain();

        //gainNode.gain.value = 1;

        osc.connect(gainNode);

        gainNode.connect(compressor);





        // Start immediately, and stop in 2 seconds.
        osc.start(context.currentTime);
        //osc.stop(context.currentTime + DURATION);
        console.log("Osc I: started at freq " + osc.frequency.value);

        // add wave to the bucket
        return osc;

        // set field value to last value
        $('#sineFreq').val(sineFrequency);
        $('#oscIType').val(oscType);

    }

};





function selectOscType(oscType) {

    console.log("oscType: " + typeof(oscType));

    switch (parseInt(oscType)) {
        case 0 : oscIType = "sine";
            console.log("oscIType: " + oscIType + " selected");
            break;
        case 1: oscIType = "square";
            console.log("oscIType: " + oscIType + " selected");
            break;
        case 2: oscIType = "triangle";
            console.log("oscIType: " + oscIType + " selected");
            break;
        case 3: oscIType = "sawtooth";
            console.log("oscIType: " + oscIType + " selected");
            break;
        default: oscIType = "sine";
            console.log("default");

    }
}


function getOscIType() {
    var oscType = document.getElementById("oscIType").value;
    return oscType;

}


var waveRemover = function() {
    osc.stop(context.currentTime);
    console.log("Osc I: stopped"); // remove wave from the bucket
    removeWaveFromBucket();
};

function getSineWaveFrequency() {
    return document.getElementById("sineFreq").value;
};






/*---------------------------------------------------------------------------------------------------------
------- LFO NO. ONE ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/


/* LFO */
var DURATION = 20;
var FREQUENCY = 4;
var SCALE = .4;

var lfo;
var lfoIType = "sine";

var lfoActive = false; 


var lfoActivator = function (lfoFreq, scale, lfoType) {

    // Create oscillator.

    if (!lfoActive) {
        lfo = context.createOscillator();
        lfo.type = lfoType;
        lfo.frequency.value = lfoFreq;
        var gain = context.createGain();
        gain.gain.value = scale;
        lfo.connect(gain);
        
        gain.connect(gainNode.gain);
        
        lfo.start(context.currentTime);

        lfoActive = true;

        console.log("lfo added");

        // change value in field
        $('#LFOFreq').val(lfoFreq);
        $('#LFOScale').val(scale);
       
        


    }
};

var lfoDeactivator = function() {
    lfo.stop(context.currentTime);
    lfoActive = false;
    console.log("lfo stopped");
};

function getLFOFrequency() {
    console.log("LFO freq request: " + document.getElementById("LFOFreq").value);
    var lfoF = (parseFloat(document.getElementById("LFOFreq").value));
    return lfoF;
};

function getLFOScale() {
    console.log("LFO scale request: " + document.getElementById("LFOScale").value);
    var lfoS = (parseFloat(document.getElementById("LFOScale").value));
    return lfoS;
};


function selectLFOType(oscType) {

    console.log("LFOIType: " + typeof (oscType) + " selected");
    $('#lfoIType').val(oscType);

    switch (parseInt(oscType)) {
        case 0: lfoIType = "sine";
            console.log("lfoIType: " + lfoIType + " selected");
            break;
        case 1: lfoIType = "square";
            console.log("lfoIType: " + lfoIType + " selected");
            break;
        case 2: lfoIType = "triangle";
            console.log("lfoIType: " + lfoIType + " selected");
            break;
        case 3: lfoIType = "sawtooth";
            console.log("lfoIType: " + lfoIType + " selected");
            break;
        default: lfoIType = "sine";
            console.log("default");

    }
}


function getLFOIType() {
    var lfoType = document.getElementById("lfoIType").value;
    return lfoType;

}




/*---------------------------------------------------------------------------------------------------------
------- EVENT HANDLERS ------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

/* oscillator I */
//var sineLoadButtonElement;


//sineLoadButtonElement = document.getElementById("sineButton");
//sineLoadButtonElement.addEventListener("click", function () { makeSineWave(getSineWaveFrequency(), oscIType) })
//sineLoadButtonElement.addEventListener("click", function () { addWaveToBucket(getSineWaveFrequency(), getOscIType()) })



//var sineStopButtonElement;

//sineStopButtonElement = document.getElementById("sineStopButton");
//sineStopButtonElement.addEventListener("click", function () { makeLastSineWaveStop() })
//sineStopButtonElement.addEventListener("click", function () { removeWaveFromBucket() })

var oscITypeElement = document.getElementById('oscIType');
oscITypeElement.addEventListener("change", function () { selectOscType(getOscIType()); }); /* LFO I */
var LFOLoadButtonElement;


LFOLoadButtonElement = document.getElementById("LFOButton");
//LFOLoadButtonElement.addEventListener("click", function () { activateLFO(getLFOFrequency(), getLFOScale(), lfoIType) });

var LFOStopButtonElement;

LFOStopButtonElement = document.getElementById("LFOStopButton");
//LFOStopButtonElement.addEventListener("click", function () { deactivateLFO() });

var lfoITypeElement = document.getElementById("lfoIType");
lfoITypeElement.addEventListener("change", function () { selectLFOType(getLFOIType()); }); /* Compressor  */
var compressorRatioButtonElement;

compressorRatioButtonElement = document.getElementById("compRatioButton");
//compressorRatioButtonElement.addEventListener("click", function () { setCompressorRatio(getCompressorRatio()) });

var compressorKneeButtonElement;

compressorKneeButtonElement = document.getElementById("compKneeButton");
//compressorKneeButtonElement.addEventListener("click", function () { setCompressorKnee(getCompressorKnee()) });

var compressorThresholdButtonElement;

compressorThresholdButtonElement = document.getElementById("compThresholdButton");
//compressorThresholdButtonElement.addEventListener("click", function () { setCompressorThreshold(getCompressorThreshold()) });

/* Master */
//var masterGainField;

//masterGainField = document.getElementById("masterGain");
//masterGainField.addEventListener("change", function () { changeMasterGain(getMasterGain()) });


/*---------------------------------------------------------------------------------------------------------
------- JAMHUB IMPLEMENTATION WITH ASP.NET SIGNALR ------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/


/* jamhub  impl */
$(function () {
    console.log("jamhub is reached");
    // reference the auto-generated proxy for the hub
    var jam = $.connection.jamHub;
    // create a function that the hub can call back to create sounds
    jam.client.soundWaveStackerPointer = soundWaveStacker;
    jam.client.waveRemoverPointer = waveRemover;
    jam.client.lfoActivatorPointer = lfoActivator;
    jam.client.lfoDeactivatorPointer = lfoDeactivator;
    jam.client.compRatioAdjusterPointer = compRatioAdjuster;
    jam.client.compKneeAdjusterPointer = compKneeAdjuster;
    jam.client.compThresholdAdjusterPointer = compThresholdAdjuster;
    jam.client.sessionSuspenderPointer = sessionSuspender;
    jam.client.sessionPlayerPointer = sessionPlayer;
    jam.client.masterGainPointer = masterGain;

    $.connection.hub.start().done(function () {

        /* -----------------------------
        ---------OSCILLATOR I-----------
        --------------------------------
        */

        // event listener stack oscillation 
        $('#sineButton').click(function () {
            console.log("sineButton clicked");
            
            
            // Call the GenerateSound method on the hub. 
            jam.server.stackSoundWave(getSineWaveFrequency(), oscIType);

        });

        // event listener remove last oscillation 
        $('#sineStopButton').click(function () {
            console.log("sineStopButton clicked");
            
            // Call the RemoveLastSound method on the hub. 
            jam.server.removeLastSound();

        });


        /* -----------------------------
       ------------ LFO I --------------
       ---------------------------------
       */

        // event listener activation LFO 
        $('#LFOButton').click(function () {
            console.log("LFOButton clicked");

            // Call the RemoveLastSound method on the hub. 
            jam.server.activateLFO(getLFOFrequency(), getLFOScale(), lfoIType);

        });

        // event listener deactivation LFO 
        $('#LFOStopButton').click(function () {
            console.log("LFOStopButton clicked");

            // Call the RemoveLastSound method on the hub. 
            jam.server.deactivateLFO();

        });


        /* -----------------------------
      ------------ COMPRESSOR ----------
      ---------------------------------
      */

        // event listener ratio Compressor 
        $('#compRatio').change(function () {
            console.log("compressor ratio adjusted");

            // Call the AdjustCompRatio method on the hub. 
            jam.server.adjustCompRatio(getCompressorRatio());

        });

        // event listener knee Compressor 
        $('#compKnee').change(function () {
            console.log("compressor knee adjusted");

            // Call the AdjustCompKnee method on the hub.
            jam.server.adjustCompKnee(getCompressorKnee());

        });

        // event listener treshold Compressor 
        $('#compThreshold').change(function () {
            console.log("compressor treshold adjusted");

            // Call the AdjustCompThreshold method on the hub.
            jam.server.adjustCompThreshold(getCompressorThreshold());

        });

      
        /* -----------------------------
   ------------ MASTER CONTROLS ----------
   ---------------------------------
   */
        // event listener suspend button
        $('#masterGain').change(function () {

            jam.server.changeMasterGain(getMasterGain());


        });
        
        // event listener suspend button
        $('#stopButton').click(function () {

            jam.server.stopSession();

        });

        // event listener suspend button
        $('#playButton').click(function () {

            jam.server.playSession();

        });




    });

});




