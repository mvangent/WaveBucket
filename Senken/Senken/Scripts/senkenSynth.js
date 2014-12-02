
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


function MasterController(context)
{
     /* gain */
    var masterVolume = context.createGain();

    /* start/stop */
    var active = false;
    
    

    this.gainAdjuster = function (masGain) {
        masterVolume.gain.value = masGain / 100;
        $('#masterGain').val(masGain);
    };

    this.readGain = function() {
        return masterVolume.gain.value;
    }

    // outputTo
    this.outputTo = function (destination) {
        masterVolume.connect(destination);
        
    }

    // input
    this.input = function () {
        return masterVolume;
    }

    // activateSession
    this.startSession = function ()
    {
        active = true;
    }

    this.stopSession = function () {

        active = false;
    }
  
    this.isActive = function() {
        return active;
    }
    
}









/*---------------------------------------------------------------------------------------------------------
------- DYNAMIC COMPRESSOR ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

function Compressor(context)
{
    var compressorInstance = context.createDynamicsCompressor();

  
    // ratio 

    this.ratioAdjuster = function (ratio) {
        console.log("compressor ratio set to 1 /  " + ratio);
        compressorInstance.ratio.value = ratio;

        // change value in field
        $('#compRatio').val(ratio);
    };

    this.readRatio = function() {
        return compressorInstance.ratio.value;
    }
 

    // knee

    this.kneeAdjuster = function (knee) {
        console.log("compressor knee set to " + knee);
        compressorInstance.knee.value = knee;

        // change value in field
        $('#compKnee').val(knee);
    };

    this.readKnee = function () {
        return compressorInstance.knee.value;
    }
   

    // threshold

    this.thresholdAdjuster = function (threshold) {
        console.log("compressor Threshold set to " + threshold);
        compressorInstance.threshold.value = threshold;

        // change value in field
        $('#compThreshold').val(threshold);
    };

    this.readThreshold = function () {
        return compressorInstance.threshold.value;
    }


    // outputTo
    this.outputTo = function(destination) {
        compressorInstance.connect(destination);
        console.log(destination.toString());
    }
    
    // input
    this.input = function() {
        return compressorInstance;
    }

}




/*-----------------------------------------------------------------------------------------------------------
  -------  WAVEBUCKET --------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------------------
*/


function WaveBucket()
{
    var waveBucket = [];

    waveBucketActive = false;
    
    this.addWaveToBucket = function(osc) {
        waveBucket.push(osc);
        
       // this.updateWaveBucketDisplay(osc);
    }

    this.removeWaveFromBucket = function(index) {

         
            waveBucket.pop();
        

        this.updateWaveBucketDisplay();
    }

    this.updateWaveBucketDisplay = function() {

        var arrayLength = waveBucket.length;

        var mydiv = document.getElementById("bucketlist");

        mydiv.innerHTML = "";

        for (var i = 0; i < arrayLength; i++) {

            var newcontent = document.createElement('li');
            newcontent.innerHTML = waveBucket[i].frequency.value + " " + waveBucket[i].type;

            mydiv.appendChild(newcontent);

        };

    this.length = function() {
        return waveBucket.length
    }

    this.select = function(i) {
        return waveBucket[i];
    }


    this.isShining = function() {
        waveBucketActive = true;
        console.log("bucket active true");
    }

    this.isSilent = function() {
        waveBucketActive = false;
    }

    this.isActive = function() {
        return waveBucketActive;
    }

}










}






/*---------------------------------------------------------------------------------------------------------
------- OSCILLATOR // has a WAVEBUCKET --------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/


function Oscillator(context, endController) {

    // member variables

    var osc = context.createOscillator();
    var oscIType = "sine";
    var gainNode = context.createGain();
    /* wavebucket */
    var wavebucket = new WaveBucket();
    


    function waveGenerator(sineFrequency, oscType) {

        if (true) { // checken

            console.log("makeSineWave reached");
            
            osc = context.createOscillator();
            osc.type = oscType;
            osc.frequency.value = sineFrequency;
            // create gainNode
            //gainNode = context.createGain();

            //gainNode.gain.value = 1;

            
            
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


    this.waveRemover = function (index) { // set index
        osc.stop(context.currentTime);
        console.log("Osc I: stopped"); // remove wave from the bucket
        wavebucket.removeWaveFromBucket();
    };



    this.soundWaveStacker = function (frequency, oscType) {

        wavebucket.addWaveToBucket(waveGenerator(frequency, oscType));
    };

    this.selectOscType = function (oscType) {

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

    /* start stacking */

    this.startStacking = function () {

        if (!(wavebucket.isActive)) {

            //  oscActive = true;

            console.log("start function activated");

            var arrayLength = wavebucket.length;
            var i;
            for (i = 0; i < arrayLength; i++) {
                wavebucket.push(this.waveGenerator(wavebucket.select(i).frequency.value, wavebucket.select(i).type));

            }

            for (i = 0; i < arrayLength; i++) {
                wavebucket.shift();

            }

            waveBucket.updateWaveBucketDisplay();

            wavebucket.waveBucketActive = true;
            

            $('.senkenContainer').css({ 'opacity': 1.0 });
        }

    };



    /* stop stacking */

    this.freezeBucket = function () {

        if (wavebucket.isActive) {

            // oscActive = false;

            console.log("stop function activated,");

            for (var i = 0; i < wavebucket.length; i++) {
                console.log(i + " " + typeof wavebucket.select(i));
                wavebucket.select(i).stop();
            }

            wavebucket.waveBucketActive = false;

            console.log(wavebucket.waveBucketActive);
            

            $('.senkenContainer').css({ 'opacity': 0.4 });

        }
    };

    this.sessionOscillations = function () {
        return wavebucket.length;




    }

    // outputTo
    this.outputTo = function (destination) {
        console.log("osc output refreshed");

        osc.connect(gainNode);

        gainNode.connect(destination);
    }

    this.gainNodeInputForLfo = function() {
        return gainNode.gain;
    }

}



/*---------------------------------------------------------------------------------------------------------
------- LFO NO. ONE ----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

function Lfo(context) {
    
    /* LFO */
    var DURATION = 20;
    var FREQUENCY = 4;
    var SCALE = .4;

    var lfo;

    lfo = context.createOscillator();

    var gain = context.createGain();

    var lfoIType = "sine";

    var lfoActive = false;


    this.lfoActivator = function (lfoFreq, scale, lfoType) {

        // Create oscillator.

        if (!lfoActive) {
            lfo = context.createOscillator();
            lfo.type = lfoType;
            lfo.frequency.value = lfoFreq;
            gain = context.createGain();
            gain.gain.value = scale;
           

            lfo.start(context.currentTime);

            lfoActive = true;

            console.log("lfo added");

            // change value in field
            $('#LFOFreq').val(lfoFreq);
            $('#LFOScale').val(scale);




        }
    };

    this.lfoDeactivator = function () {
        lfo.stop(context.currentTime);
        lfoActive = false;
        console.log("lfo stopped");
    };

    this.getLFOFrequency = function() {
        console.log("LFO freq request: " + document.getElementById("LFOFreq").value);
        var lfoF = (parseFloat(document.getElementById("LFOFreq").value));
        return lfoF;
    };

    this.getLFOScale = function() {
        console.log("LFO scale request: " + document.getElementById("LFOScale").value);
        var lfoS = (parseFloat(document.getElementById("LFOScale").value));
        return lfoS;
    };


    this.selectLFOType = function(oscType) {

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


    this.getLFOIType = function() {
        var lfoType = document.getElementById("lfoIType").value;
        return lfoType;

    }


   
    // (gain)OutputTo
    this.outputTo = function (destination) {
        console.log("lfo output refreshed");

        lfo.connect(gain);

        gain.connect(destination);
        
    }






}



/*---------------------------------------------------------------------------------------------------------
------- ARCHITECTURAL SETUP // WIRING----------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/

var endController = new MasterController(context);
//endController.outputTo(analyser);

var finalCompressor = new Compressor(context);
//finalCompressor.outputTo(endController.input());

var oscillatorI = new Oscillator(context, endController);
//oscillatorI.outputTo(finalCompressor.input());

var lfoI = new Lfo(context);
//lfoI.outputTo(oscillatorI.gainNodeInputForLfo());

var waveBucket = new WaveBucket(context);

var updateConnections = function() {
    endController.outputTo(analyser);
    finalCompressor.outputTo(endController.input());
    oscillatorI.outputTo(finalCompressor.input());
    lfoI.outputTo(oscillatorI.gainNodeInputForLfo());

}

/*---------------------------------------------------------------------------------------------------------
------- EVENT HANDLERS ------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/



var oscITypeElement = document.getElementById('oscIType');
oscITypeElement.addEventListener("change", function () { oscillatorI.selectOscType($('#oscIType').val()); });



/* LFO I */


var LFOLoadButtonElement;


LFOLoadButtonElement = document.getElementById("LFOButton");
//LFOLoadButtonElement.addEventListener("click", function () { activateLFO(getLFOFrequency(), getLFOScale(), lfoIType) });

var LFOStopButtonElement;

LFOStopButtonElement = document.getElementById("LFOStopButton");
//LFOStopButtonElement.addEventListener("click", function () { deactivateLFO() });

var lfoITypeElement = document.getElementById("lfoIType");
lfoITypeElement.addEventListener("change", function () { selectLFOType(getLFOIType()); }); /* Compressor  */





/*---------------------------------------------------------------------------------------------------------
------- JAMHUB IMPLEMENTATION WITH ASP.NET SIGNALR ------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------
*/


/* jamhub  impl */
$(function() {
    console.log("jamhub is reached");
    // reference the auto-generated proxy for the hub
    var jam = $.connection.jamHub;


// create a function that the hub can call back to create sounds
    jam.client.soundWaveStackerPointer = oscillatorI.soundWaveStacker, 
    jam.client.waveRemoverPointer = oscillatorI.waveRemover;
    jam.client.lfoActivatorPointer = lfoI.lfoActivator;
    jam.client.lfoDeactivatorPointer = lfoI.lfoDeactivator;
    jam.client.compRatioAdjusterPointer = finalCompressor.ratioAdjuster;
    jam.client.compKneeAdjusterPointer = finalCompressor.kneeAdjuster;
    jam.client.compThresholdAdjusterPointer = finalCompressor.thresholdAdjuster;
    jam.client.sessionSuspenderPointer = oscillatorI.freezeBucket;
    jam.client.sessionPlayerPointer = oscillatorI.startStacking, updateConnections();
    jam.client.masterGainAdjusterPointer = endController.gainAdjuster;

    // update connection
    jam.client.updateConnectionsPointer = updateConnections;


    $.connection.hub.start().done(function () {

        /* -----------------------------
        ---------OSCILLATOR I-----------
        --------------------------------
        */

        // event listener stack oscillation 
        $('#sineButton').click(function () {
            console.log("sineButton clicked");
            
            
            // Call the GenerateSound method on the hub. 
            jam.server.stackSoundWave($('#sineFreq').val(), oscillatorI.oscIType);

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
            jam.server.activateLFO(lfoI.getLFOFrequency(), lfoI.getLFOScale(), lfoI.lfoIType);

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
            jam.server.adjustCompRatio($('#compRatio').val());

        });

        // event listener knee Compressor 
        $('#compKnee').change(function () {
            console.log("compressor knee adjusted");

            // Call the AdjustCompKnee method on the hub.
            jam.server.adjustCompKnee($('#compKnee').val());

        });

        // event listener treshold Compressor 
        $('#compThreshold').change(function () {
            console.log("compressor treshold adjusted");

            // Call the AdjustCompThreshold method on the hub.
            jam.server.adjustCompThreshold($('#compThreshold').val());

        });

      
        /* -----------------------------
   ------------ MASTER CONTROLS ----------
   ---------------------------------
   */
        // event listener suspend button
        $('#masterGain').change(function () {

            jam.server.changeMasterGain($('#masterGain').val());


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




