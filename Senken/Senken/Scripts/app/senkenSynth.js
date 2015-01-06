
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
    var filterI = new BiquadFilter(context);
    var oscillatorI = new Oscillator(context, endController);
    var lfoI = new Lfo(context);

    // oscillator II & related modules
    var filterII = new BiquadFilter(context);
    var oscillatorII = new Oscillator(context, endController);
    var lfoII = new Lfo(context);


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

                    
            //analyser
            analyser.outputTo(context.destination);
            // master controls
            endController.outputTo(analyser.input());
            finalCompressor.outputTo(endController.input());
            // oscillator I with lfo and filter
            filterI.outputTo(finalCompressor.input());
            oscillatorI.outputTo(filterI.input());
            lfoI.outputTo(oscillatorI.gainNodeInputForLfo());

            // oscillator I with lfo and filter
            filterII.outputTo(finalCompressor.input());
            oscillatorII.outputTo(filterII.input());
            lfoII.outputTo(oscillatorII.gainNodeInputForLfo());


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
//$('#compRatio').val(12);
//$('#compKnee').val(30);
//$('#compThreshold').val(-23);
$('#masterGain').val(30);



