
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
** Object: Lfo(context) : prototype 
--------------------------------------------------------------------------------------------------------
** 
*/

function Lfo(context) {
    
    var lfo;
    lfo = context.createOscillator();
    var gain = context.createGain();
    this.oscTypeEnum = 0; // enums: 0, 1, 2, 3 are valid. They correspond with sine, square, triangle and sawtooth.
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
//$('#compRatio').val(12);
//$('#compKnee').val(30);
//$('#compThreshold').val(-23);
//$('#masterGain').val(100);



