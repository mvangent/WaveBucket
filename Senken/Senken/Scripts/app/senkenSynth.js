
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
    function updateWiringCallBack() { wiring.updateConnections();
        return true;
    }

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

            return true;
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



