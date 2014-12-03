
/*---------------------------------------------------------------------------------------------------------
------- AudioContext // Global vars----------------------------------------------------------------------------------------
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
------- JQuery / CSS => Starting Display-------------------------------------------------------------------
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
    // member variables
    var masterVolume = context.createGain();
    this.active = false;

    // self reference
    var self = this;

    // gain methods
    this.gainAdjuster = function (masGain) {
        masterVolume.gain.value = masGain / 100;
        
    };

    this.readGain = function() {
        return masterVolume.gain.value;
    }

   
    // activation methods
    this.startSession = function ()
    {
        self.active = true;

        console.log("start session reached " + self.isActive());

    }

    this.stopSession = function ()
    {

        self.active = false;

        console.log("stop session reached, active = " + self.active);
    }

    this.isActive = function() {

        return self.active;
    }
  
    // connector methods: outputTo
    this.outputTo = function (destination) {
        masterVolume.connect(destination);

    }

    // : input
    this.input = function () {
        return masterVolume;
    }

    // display method: updateDisplay
    this.updateDisplay = function () {
        console.log("update display mastercontrols is reached");

        if (self.isActive()) {
            $('.senkenContainer').css({ 'opacity': 1.0 });
        } else {
            $('.senkenContainer').css({ 'opacity': 0.4 });
        }

        $('#masterGain').val(parseInt((masterVolume.gain.value) * 100));
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
    };

    this.readRatio = function() {
        return compressorInstance.ratio.value;
    }
 

    // knee
    this.kneeAdjuster = function (knee) {
        console.log("compressor knee set to " + knee);
        compressorInstance.knee.value = knee;
    };

    this.readKnee = function () {
        return compressorInstance.knee.value;
    }
   
    // threshold

    this.thresholdAdjuster = function (threshold) {
        console.log("compressor Threshold set to " + threshold);
        compressorInstance.threshold.value = threshold;
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

    // displayMethod 
    this.updateDisplay = function () {
        /
        $('#compRatio').val(compressorInstance.ratio.value);

        $('#compKnee').val(compressorInstance.knee.value);
        
        $('#compThreshold').val(compressorInstance.threshold.value);
    }

}




/*-----------------------------------------------------------------------------------------------------------
  -------  WAVEBUCKET --------------------------------------------------------------------------------------
  -----------------------------------------------------------------------------------------------------------
*/


function WaveBucket()
{
    // member variables: 
    var waveBucket = [];
    this.activated = false;

    // methods: 
    
    //addWave()
    this.addWave = function (osc) {

        waveBucket.push(osc);
    }
    
    // removeLastWave()
    this.removeLastWave = function() {
        waveBucket.pop();
    }

    // remove(index) - wave will be removed from wavebucket by index
    this.remove = function (index) {
        
        waveBucket.splice(index, 1);
    }

    // removeFirstElement() -> wrapper for array.shift()
    this.removeFirstElement = function() {

        waveBucket.shift();
    }
        
    // getSize() -> wrapper for array.length 
    this.getSize = function() {
        
        return waveBucket.length;
    }
    
    // select(elementbyIndex) 
    this.select = function(i) {

        return waveBucket[i];
    }

    // activate()
    this.activate = function()
    {
        self.activated = true;
    }

    // deactivate()
    this.deactivate = function()
    {
        self.activated = false;
    }

    // isActive();
    this.isActive = function()
    {
        return self.activated;
    }

    // updateDisplay()
    this.updateDisplay = function () {

        var arrayLength = waveBucket.length;

        var mydiv = document.getElementById("bucketlist");

        mydiv.innerHTML = "";

        for (var i = 0; i < arrayLength; i++) {

            var newcontent = document.createElement('li');
            newcontent.innerHTML = waveBucket[i].frequency.value + " " + waveBucket[i].type;

            mydiv.appendChild(newcontent);

        };
    }
}






/*------------------------------------------------------------------------------------------------------------
** OBJECT: Oscillator(ContextClass, MasterController) : prototype                                           **
--------------------------------------------------------------------------------------------------------------
** UML: has a WaveBucket, references MasterController(object) and AudioContextClass                                 **
** This object is responsible for generating sine, square, triangle and sawtooths waveforms and saves the   **
** generatad sounds in a wavebucket                                                                         **
--------------------------------------------------------------------------------------------------------------
*/


function Oscillator(context, endController) {

    // member variables oscillatorNode
    var osc = context.createOscillator();
    this.oscTypeEnum = 0; // enums: 0, 1, 2, 3 are valid. They correspond with sine, square, triangle and sawtooth.
    var gainNode = context.createGain();

    /* wavebucket */
    this.wavebucket = new WaveBucket();
    var lastWaveRemoved = false;

    // self reference
    var self = this;


    /* Method: this.waveGenerator = function (frequency, oscType, updateConnectionsBool) 
    ------------------------------------------------------------------------------------------------------------------------
    IMPORTANT => this function has an dependency outside the object: global method updateConnections() is called  everytime
    a newly generated wave is added. Through this functionality the wavebucket feature becomes possible in an object oriented
    setting. The dependency is activated by setting the third parameter to true, otherwise generated sound won't stack when
    the wavebucket is loaded.
    -----------------------------------------------------------------------------------------------------------------------*/

    this.waveGenerator = function (frequency, oscType, updateConnectionsBool) {
    
            console.log("makeSineWave reached");
            lastWaveRemoved = false;
            osc = context.createOscillator();
            osc.type = oscType;
            osc.frequency.value = frequency;

            // create gainNode
            //gainNode = context.createGain();
            //gainNode.gain.value = 1;
           
            osc.start(context.currentTime);
            //osc.stop(context.currentTime + DURATION);
            console.log("Osc I: started at freq " + osc.frequency.value + ", with shape " + oscType);

        /* GLOBAL DEPENDENCY TO MAKE WAVEBUCKET POSSIBLE*/
        if (updateConnectionsBool === true) {
            updateConnections();
        }

        // add wave to the bucket
            return osc;
    };


    this.removeWave = function (index) { // set index
        
        self.freezeBucket()
        self.wavebucket.remove(2);
        self.startBucket()
    };

    this.removeLastWave = function() {
        if (!lastWaveRemoved) {
            osc.stop();
            self.wavebucket.removeLastWave();
            lastWaveRemoved = true;
        }
    }

    this.soundWaveStacker = function (frequency, oscTypeEnum, updateConnectionsBool) {

        self.oscTypeEnum = oscTypeEnum;

        var oscType = self.translateOscTypeEnumToString(oscTypeEnum);

        console.log("osctype is NOWWW: " + oscType);

        if (endController.isActive()) {
            self.wavebucket.addWave(self.waveGenerator(frequency, oscType, updateConnectionsBool));
           
        }
    };

    this.translateOscTypeEnumToString = function (oscType) {

        console.log("oscType: " + typeof(oscType));

        switch (parseInt(oscType)) {
            case 0 : return "sine";
            case 1: return "square";
            case 2: return "triangle";
            case 3: return "sawtooth";
            default: return "sine";
        }
    }

    /* startBucket */

    this.startBucket = function () {
        
        if (!self.wavebucket.isActive()) {
            console.log("start function activated");
            var arrayLength = self.wavebucket.getSize();
            console.log(arrayLength);

            var i;

            for (i = 0; i < arrayLength; i++) {
                console.log("i = " + i)
                self.wavebucket.addWave(self.waveGenerator(self.wavebucket.select(i).frequency.value, self.wavebucket.select(i).type, true));
            }

            for (i = 0; i < arrayLength; i++) {
                self.wavebucket.removeFirstElement();
            }

            self.wavebucket.activate();
        }
    };

    
    /* freezeBucket */

    this.freezeBucket = function () {
        
        if (self.wavebucket.isActive()) {

            console.log("stop function wavebucket activated,");

            for (var i = 0; i < self.wavebucket.getSize(); i++) {
                console.log(i + " " + typeof self.wavebucket.select(i));
                self.wavebucket.select(i).stop();
            }

            console.log(self.wavebucket.waveBucketActive);

            self.wavebucket.deactivate();
        }
    };

    // outputTo
    this.outputTo = function (destination) {
        console.log("osc output refreshed");

        osc.connect(gainNode);
        gainNode.connect(destination);
    }

    // gainNodeInputForLfo
    this.gainNodeInputForLfo = function() {
        return gainNode.gain;
    }

 
    // updateDisplay(Oscillator)
    this.updateDisplay = function() {
        self.wavebucket.updateDisplay();

        // set field value to last value
        $('#sineFreq').val(osc.frequency.value);
        $('#oscIType').val(self.oscTypeEnum);
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



//var oscITypeElement = document.getElementById('oscIType');
//oscITypeElement.addEventListener("change", function () { oscillatorI.selectOscType($('#oscIType').val()); });



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

    // update connections between sound modules
    jam.client.updateConnectionsPointer = updateConnections;

    // update displays
    jam.client.updateEndControlDisplayPointer = endController.updateDisplay;
    jam.client.updateCompressorDisplayPointer = finalCompressor.updateDisplay;
    jam.client.updateOscillatorDisplayPointer = oscillatorI.updateDisplay


    $.connection.hub.start().done(function () {

        /* -----------------------------
        ---------OSCILLATOR I-----------
        --------------------------------
        */

        // event listener stack oscillation 
        $('#sineButton').click(function () {
            console.log("sineButton clicked");
            
            
            // Call the GenerateSound method on the hub. 
            jam.server.stackSoundWave($('#sineFreq').val(), $('#oscIType').val(), true);

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




