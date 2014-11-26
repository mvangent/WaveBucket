

/*---------------------------------------------------------------------------------------------------------
------- AudioContext ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

var contextClass = (window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext);
if (contextClass) {
    // Web Audio API is available.
    var context = new contextClass();
} else {
    // Web Audio API is not available. Ask the user to use a supported browser.
    alert("no webapi was found for your browser")
}




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
        var v = dataArray[i] / 128.0
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
------- MASTER GAIN ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

var masterGain = context.createGain();
masterGain.connect(analyser);

masterGain.gain.value = 1;

function changeMasterGain(masGain) {
    masterGain.gain.value = masGain;
}


function getMasterGain() {
    console.log("Master Gain change: " + document.getElementById("masterGain").value);
    var master = (parseFloat(document.getElementById("masterGain").value))
    return master;
};





/*---------------------------------------------------------------------------------------------------------
------- DYNAMIC COMPRESSOR ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

var compressor = context.createDynamicsCompressor();
compressor.connect(masterGain);

// ratio 

function setCompressorRatio(ratio) {
    console.log("compressor ratio set to 1 /  " + ratio);
    compressor.ratio.value = ratio;
}

function getCompressorRatio() {
    console.log("compressor Ratio request: " + document.getElementById("compRatio").value);
    var compressorRatio = (parseFloat(document.getElementById("compRatio").value))
    return compressorRatio;
};

// knee

function setCompressorKnee(knee) {
    console.log("compressor knee set to " + knee);
    compressor.knee.value = knee;
}

function getCompressorKnee() {
    console.log("compressor Knee request: " + document.getElementById("compKnee").value);
    var compressorKnee = (parseFloat(document.getElementById("compKnee").value))
    return compressorKnee;
};

// threshold

function setCompressorThreshold(threshold) {
    console.log("compressor Threshold set to " + threshold);
    compressor.threshold.value = threshold;
}

function getCompressorThreshold() {
    console.log("compressor Threshold request: " + document.getElementById("compThreshold").value);
    var compressorThreshold = (parseFloat(document.getElementById("compThreshold").value))
    return compressorThreshold;
};



/*---------------------------------------------------------------------------------------------------------
  ------- WAVE AND WAVEBUCKET ------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------------------
*/

var waveBucket = [];

function addWaveToBucket(freq, shape) {
    waveBucket.push(freq);

    updateWaveBucketDisplay();

}

function removeWaveFromBucket() {
    waveBucket.pop();

    updateWaveBucketDisplay();
}

function updateWaveBucketDisplay() {

    var arrayLength = waveBucket.length;

    var mydiv = document.getElementById("bucketlist");

    mydiv.innerHTML = "";

    for (var i = 0; i < arrayLength; i++) {

        var newcontent = document.createElement('li');
        newcontent.innerHTML = waveBucket[i];

        mydiv.appendChild(newcontent);

    };




}






/*---------------------------------------------------------------------------------------------------------
------- OSCILLATOR NO. ONE ------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/


/* SineStacker related Code */
var osc;

var oscIType = "sine";

var gainNode = context.createGain();



function makeSineWave(sineFrequency, oscType) {
    // Create oscillator.
    osc = context.createOscillator();
    osc.type = oscType;
    osc.frequency.value = sineFrequency;

    // create gainNode
    //gainNode = context.createGain();

    //gainNode.gain.value = 1;

    osc.connect(gainNode);

    gainNode.connect(compressor);



    analyser.connect(context.destination);


    // Start immediately, and stop in 2 seconds.
    osc.start(context.currentTime);
    //osc.stop(context.currentTime + DURATION);
    console.log("Osc I: started")

};


function selectOscType(oscType) {

    console.log("oscType: " + typeof(oscType));

    switch (parseInt(oscType)) {
        case 0 : oscIType = "sine";
            console.log("oscIType: " + oscIType + " selected")
            break;
        case 1: oscIType = "square";
            console.log("oscIType: " + oscIType + " selected")
            break;
        case 2: oscIType = "triangle";
            console.log("oscIType: " + oscIType + " selected")
            break;
        case 3: oscIType = "sawtooth";
            console.log("oscIType: " + oscIType + " selected")
            break;
        default: oscIType = "sine";
            console.log("default");

    }
}


function getOscIType() {
    var oscType = document.getElementById("oscIType").value;
    return oscType;

}


function makeLastSineWaveStop() {
    osc.stop(context.currentTime);
    console.log("Osc I: stopped")
};

function getSineWaveFrequency() {
    return document.getElementById("sineFreq").value

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


function activateLFO(lfoFreq, scale, lfoType) {

    // Create oscillator.
    lfo = context.createOscillator();
    lfo.type = lfoType;
    lfo.frequency.value = lfoFreq;
    var gain = context.createGain();
    gain.gain.value = scale;
    lfo.connect(gain);



    gain.connect(gainNode.gain);


    lfo.start(context.currentTime);

    console.log("lfo added");
};

function deactivateLFO() {
    lfo.stop(context.currentTime);
    console.log("lfo stopped");
};

function getLFOFrequency() {
    console.log("LFO freq request: " + document.getElementById("LFOFreq").value);
    var lfoF = (parseFloat(document.getElementById("LFOFreq").value))
    return lfoF;
};

function getLFOScale() {
    console.log("LFO scale request: " + document.getElementById("LFOScale").value);
    var lfoS = (parseFloat(document.getElementById("LFOScale").value))
    return lfoS;
};


function selectLFOType(oscType) {

    console.log("LFOIType: " + oscType + " selected")

    switch (parseInt(oscType)) {
        case 0: lfoIType = "sine";
            console.log("lfoIType: " + lfoIType + " selected")
            break;
        case 1: lfoIType = "square";
            console.log("lfoIType: " + lfoIType + " selected")
            break;
        case 2: lfoIType = "triangle";
            console.log("lfoIType: " + lfoIType + " selected")
            break;
        case 3: lfoIType = "sawtooth";
            console.log("lfoIType: " + lfoIType + " selected")
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
var sineLoadButtonElement;


sineLoadButtonElement = document.getElementById("sineButton");
sineLoadButtonElement.addEventListener("click", function () { makeSineWave(getSineWaveFrequency(), oscIType) })
sineLoadButtonElement.addEventListener("click", function () { addWaveToBucket(getSineWaveFrequency(), getOscIType()) })



var sineStopButtonElement;

sineStopButtonElement = document.getElementById("sineStopButton");
sineStopButtonElement.addEventListener("click", function () { makeLastSineWaveStop() })
sineStopButtonElement.addEventListener("click", function () { removeWaveFromBucket() })

var oscITypeElement = document.getElementById("oscIType");
oscITypeElement.addEventListener("change", function () { selectOscType(getOscIType()) })


/* LFO I */
var LFOLoadButtonElement;


LFOLoadButtonElement = document.getElementById("LFOButton");
LFOLoadButtonElement.addEventListener("click", function () { activateLFO(getLFOFrequency(), getLFOScale(), lfoIType) });

var LFOStopButtonElement;

LFOStopButtonElement = document.getElementById("LFOStopButton");
LFOStopButtonElement.addEventListener("click", function () { deactivateLFO() });

var lfoITypeElement = document.getElementById("lfoIType");
lfoITypeElement.addEventListener("change", function () { selectLFOType(getLFOIType()) })


/* Compressor  */
var compressorRatioButtonElement;

compressorRatioButtonElement = document.getElementById("compRationButton");
compressorRatioButtonElement.addEventListener("click", function () { setCompressorRatio(getCompressorRatio()) });

var compressorKneeButtonElement;

compressorKneeButtonElement = document.getElementById("compKneeButton");
compressorKneeButtonElement.addEventListener("click", function () { setCompressorKnee(getCompressorKnee()) });

var compressorThresholdButtonElement;

compressorThresholdButtonElement = document.getElementById("compThresholdButton");
compressorThresholdButtonElement.addEventListener("click", function () { setCompressorThreshold(getCompressorThreshold()) });

/* Master */
var masterGainField;

masterGainField = document.getElementById("masterGain");
masterGainField.addEventListener("change", function () { changeMasterGain(getMasterGain()) });