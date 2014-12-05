
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
        alert("no WebApi was found for your browser, try Chrome");

    }

/*------------------------------------------------------------------------------------------------------
** Init: initialising wiring class and connections. 
--------------------------------------------------------------------------------------------------------
*/
    
    var analyser = new Analyser(context);

        analyser.draw();

    var filterI = new BiquadFilter(context);

        

    var endController = new MasterController(context);
    var finalCompressor = new Compressor(context);
    var oscillatorI = new Oscillator(context, endController);
    var lfoI = new Lfo(context);


    var wiring = new Wiring(context, filterI, analyser, endController, finalCompressor, oscillatorI, lfoI);
    // because passing pointer variables in methods is not possible in js.:
    function updateWiringCallBack() { wiring.updateConnections();}

/*------------------------------------------------------------------------------------------------------
** Object: Wiring([] soundmodules) : prototype 
--------------------------------------------------------------------------------------------------------
*/

    function Wiring(context, filterI, analyser, endController, finalCompressor, oscillatorI, lfoI) {
        
        //endController.outputTo(analyser.input());
        //finalCompressor.outputTo(endController.input());
        //oscillatorI.outputTo(finalCompressor.input());
        //lfoI.outputTo(oscillatorI.gainNodeInputForLfo());

        this.updateConnections = function () {

            console.log("update connection reached");

            analyser.outputTo(context.destination);
            filterI.outputTo(analyser.input());
            endController.outputTo(filterI.input());
            finalCompressor.outputTo(endController.input());
            oscillatorI.outputTo(finalCompressor.input());
            lfoI.outputTo(oscillatorI.gainNodeInputForLfo());
        }
    }


/*------------------------------------------------------------------------------------------------------
** Object: Analyser(context) : prototype 
--------------------------------------------------------------------------------------------------------
*/

function Analyser(context) {
    /* canvas related code */
    var canvas;
    var canvasCtx;

    canvas = document.getElementById("oscIVisualiser");

    if (!canvas) {
        canvas = document.createElement('canvas');
        document.getElementsByTagName('body')[0].appendChild(canvas);
    }
    canvasCtx = canvas.getContext("2d");



    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    
    //var intendedWidth = document.querySelector('.wrapper').clientWidth;
    //canvas.setAttribute('width', intendedWidth);
    //var visualSelect = document.getElementById("visual");

    var drawVisual;
    var analyser = context.createAnalyser();
    

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var self = this;

    // clear canvas
    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    
    /* Method: draw()
    ------------------------------------------------------------------------
    ** Call this function once, and it will keep updating itself 
    ------------------------------------------------------------------------*/
    this.draw = function() {
        //console.log("draw OscI function entered");

        drawVisual = requestAnimationFrame(self.draw);
        analyser.getByteTimeDomainData(dataArray);

        //set canvas background
        canvasCtx.fillStyle = 'rgb(190, 230, 180)';
        canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
        // set canvas linewidth and stroke
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(90, 205, 90)';
        // begin drawing a path
        canvasCtx.beginPath();

        // slice canvas width segments according to number of bins from FFT
        var sliceWidth = canvasWidth * 1.0 / bufferLength;
        var position = 0;

        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * canvasHeight / 2;

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

    // connector methods: outputTo
    this.outputTo = function (destination) {
        analyser.connect(destination);

    }

    // : input
    this.input = function () {
        return analyser;
    }

    
}

/*------------------------------------------------------------------------------------------------------
** Object: BiQuadFilter(context) : prototype 
--------------------------------------------------------------------------------------------------------
** This filter consists of the following 8 types[enums]: "lowpass"[0], "highpass"[1], "bandpass"[2], "lowshelf"[3],
** "highshelf"[4], "peaking"[5], "notch"[6],"allpass"[7]. Frequency and q can be manipulated in all types. 
**  Gain except for lowpass, highpass and bandpass. 
*/

function BiquadFilter(context) {
    this.biQuadFilter = context.createBiquadFilter();
    console.log("filter created");
    
    var self = this;

    this.setType = function (enumType) {
        self.biQuadFilter.type = self.translateTypeEnumToString(enumType);
        console.log(self.biQuadFilter.type);
    }

    this.readType = function() {
        return self.biQuadFilter.type;
    }

    this.translateTypeEnumToString = function (typeEnum) {

        console.log("biQuadFilter type: " + typeof (typeEnum));

        switch (parseInt(typeEnum)) {
            case 0: return "lowpass";
            case 1: return "highpass";
            case 2: return "bandpass";
            case 3: return "lowshelf";
            case 4: return "highshelf";
            case 5: return "peaking";
            case 6: return "notch";
            case 7: return "allpass";
            
            default: return "lowpass";
        }
    }

    this.setFrequency = function (frequency) {
        self.biQuadFilter.frequency.value = frequency;
    }

    this.readFrequency = function () {
        return self.biQuadFilter.frequency.value;
    }

    this.setQ = function (q) {
        self.biQuadFilter.Q.value = q;
    }

    this.readQ = function () {
        return self.biQuadFilter.Q.value;
    }

    this.setGain = function (gain) {
        self.biQuadFilter.gain.value = gain;
    }

    this.readGain = function () {
        return self.biQuadFilter.gain.value;
    }

    // connector methods: outputTo
    this.outputTo = function (destination) {
        self.biQuadFilter.connect(destination);
    }

    // : input
    this.input = function () {
        return self.biQuadFilter;
    }

}

/*------------------------------------------------------------------------------------------------------
** Object: MasterController(context) : prototype 
--------------------------------------------------------------------------------------------------------
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



/*------------------------------------------------------------------------------------------------------
** Object: Compressor(context) : prototype 
--------------------------------------------------------------------------------------------------------
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
        
        $('#compRatio').val(compressorInstance.ratio.value);

        $('#compKnee').val(compressorInstance.knee.value);
        
        $('#compThreshold').val(compressorInstance.threshold.value);
    }

}

/*------------------------------------------------------------------------------------------------------
** Object: WaveBucket() : prototype 
--------------------------------------------------------------------------------------------------------
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
    var lastWaveRemoved = true;

    // self reference
    var self = this;


    /* Method: this.waveGenerator = function (frequency, oscType, updateConnectionsBool) 
    ------------------------------------------------------------------------------------------------------------------------
    IMPORTANT => this function has an dependency outside the object: global callbackfunction updateWiringCallback() is called  everytime
    a newly generated wave is added. Through this functionality the wavebucket feature becomes possible in an object oriented
    setting. The dependency is activated by setting the third parameter to true, otherwise generated sound won't stack when
    the wavebucket is loaded, and instead only the last sound is generated. 
    -----------------------------------------------------------------------------------------------------------------------*/

    this.waveGenerator = function (frequency, oscType, updateConnectionsBool) {
    
            console.log("makeSineWave reached");
            
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
            console.log("update connections called");
            updateWiringCallBack();
        }

        // add wave to the bucket
            return osc;
    };


    this.removeWave = function (index) { // set index

        self.freezeBucket();
        self.wavebucket.remove(index);
        self.startBucket();
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
            lastWaveRemoved = false;
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

    // Method: startBucket()

    this.startBucket = function () {
        
        if (!self.wavebucket.isActive()) {
            console.log("start function activated");
            var arrayLength = self.wavebucket.getSize();
            console.log(arrayLength);

            var i;

            for (i = 0; i < arrayLength; i++) {
                console.log("i = " + i);
                self.wavebucket.addWave(self.waveGenerator(self.wavebucket.select(i).frequency.value, self.wavebucket.select(i).type, true));
            }

            for (i = 0; i < arrayLength; i++) {
                self.wavebucket.removeFirstElement();
            }

            self.wavebucket.activate();
        }
    };

    
    // Method: freezeBucket()

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

    // Method: outputTo(destination)
    this.outputTo = function (destination) {
        console.log("osc output refreshed");

        osc.connect(gainNode);
        gainNode.connect(destination);
    }

    // Method: gainNodeInputForLfo() -> return gainNode.gain
    this.gainNodeInputForLfo = function() {
        return gainNode.gain;
    }

 
    // Method: updateDisplay(Oscillator)
    this.updateDisplay = function() {
        self.wavebucket.updateDisplay();

        // set field value to last value
        $('#sineFreq').val(osc.frequency.value);
        $('#oscIType').val(self.oscTypeEnum);

    }

}

/*------------------------------------------------------------------------------------------------------
** Object: Lfo(context) : prototype 
--------------------------------------------------------------------------------------------------------
*/

function Lfo(context) {
    
    var lfo;
    lfo = context.createOscillator();
    var gain = context.createGain();
    var lfoType = "sine";
    var lfoActive = false;
    var self = this;

    var gain = context.createGain();

    this.lfoActivator = function (lfoFreq, scale, lfoTypeEnum) {

        lfoType = self.translateLfoTypeEnumToString(lfoTypeEnum);

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
       
       }
    };

    this.lfoDeactivator = function () {
        lfo.stop(context.currentTime);
        lfoActive = false;
        console.log("lfo stopped");
    };

  
    this.translateLfoTypeEnumToString = function (lfoTypeEnum) {

        console.log("oscType: " + typeof (lfoTypeEnum));

        switch (parseInt(lfoTypeEnum)) {
            case 0: return "sine";
            case 1: return "square";
            case 2: return "triangle";
            case 3: return "sawtooth";
            default: return "sine";
        }
    }

    this.readFrequency = function() {
        return lfo.frequency.value;
    }

    this.readScale = function() {
        return gain.gain.value;
    }

    this.readType = function() {
        return self.oscTypeEnum;
    }
    
    // (gain)OutputTo
    this.outputTo = function (destination) {
        console.log("lfo output refreshed");

        lfo.connect(gain);

        gain.connect(destination);
       
    }

    this.updateDisplay = function() {
        $('#LFOFreq').val(lfo.frequency.value);
        $('#LFOScale').val(gain.gain.value);
        $('#lfoIType').val(self.oscTypeEnum);
    }
    

}




/*------------------------------------------------------------------------------------------------------
** View: Initialising values in the view
--------------------------------------------------------------------------------------------------------
*/

$('.senkenContainer').css({ 'opacity': 0.4 });
$('#senkenLeftColumn').css({ 'float': 'left' }).width('60%');
$('#senkenRightColumn').css({ 'float': 'right' }).width('39%'); // initialize fields
$('#compRatio').val(12);
$('#compKnee').val(30);
$('#compThreshold').val(-23);
$('#masterGain').val(100);



