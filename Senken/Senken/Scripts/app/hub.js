

/*------------------------------------------------------------------------------------------------------
** SignalR ControllerHub: implementation of event listeners through a WebSocket, based on seperation of 
** concerns model. 
--------------------------------------------------------------------------------------------------------
*/

/* jamhub  impl */
$(function() {
    console.log("jamhub is reached");
    // reference the auto-generated proxy for the hub
    var jam = $.connection.jamHub;

    // create a function that the hub can call back to create sounds

    // end controls: fields
    jam.client.masterGainAdjusterPointer = endController.gainAdjuster;
    jam.client.startSessionPointer = endController.startSession;
    jam.client.stopSessionPointer = endController.stopSession;
    jam.client.compRatioAdjusterPointer = finalCompressor.ratioAdjuster;
    jam.client.compKneeAdjusterPointer = finalCompressor.kneeAdjuster;
    jam.client.compThresholdAdjusterPointer = finalCompressor.thresholdAdjuster;
    // end controls: display
    jam.client.updateEndControlDisplayPointer = endController.updateDisplay;
    jam.client.updateCompressorDisplayPointer = finalCompressor.updateDisplay;

    // oscillator I & features: fields
    jam.client.stackSoundWavePointerI = oscillatorI.stackSoundWave,
        jam.client.waveRemoverPointerI = oscillatorI.removeLastWave;
    jam.client.lfoActivatorPointerI = lfoI.lfoActivator;
    jam.client.lfoDeactivatorPointerI = lfoI.lfoDeactivator;
    jam.client.startBucketPointerI = oscillatorI.startBucket;
    jam.client.freezeBucketPointerI = oscillatorI.freezeBucket;
    jam.client.changeFilterTypeOnePointer = filterI.setType;
    jam.client.changeFilterFrequencyOnePointer = filterI.setFrequency;
    jam.client.changeFilterQOnePointer = filterI.setQ;
    jam.client.changeFilterGainOnePointer = filterI.setGain;
    // oscillator I & features: update displays
    jam.client.updateLfoDisplayPointerI = function (){lfoI.updateDisplay('#LFOIFreq', '#LFOIScale', '#lfoIType');}
    jam.client.updateOscillatorDisplayPointerI = function (){ oscillatorI.updateDisplay('#OscIFrequency', '#oscIType');}
    jam.client.updateWaveBucketDisplayPointerI = function (){ oscillatorI.updateWaveBucketDisplay('bucketlistI');} // temp solution: get element by ID => double quotes, no #
    jam.client.updateBiquadFilterIDisplayPointer = function (){ filterI.updateDisplay('#filterTypeOne', '#filterFrequencyOne', '#filterQOne', '#filterGainOne');}
    // oscillator I & features: wavebucket client-server connection
    jam.client.saveWaveBucketPointerI = function (){ oscillatorI.saveWaveBucket('#hiddenWaveBucketI');}
    jam.client.loadWaveBucketPointerI = function (){ oscillatorI.loadWaveBucket('#hiddenWaveBucketI');}

    // oscillator II & features: fields
    jam.client.stackSoundWavePointerII = oscillatorII.stackSoundWave,
        jam.client.waveRemoverPointerII = oscillatorII.removeLastWave;
    jam.client.lfoActivatorPointerII = lfoII.lfoActivator;
    jam.client.lfoDeactivatorPointerII = lfoII.lfoDeactivator;
    jam.client.startBucketPointerII = oscillatorII.startBucket;
    jam.client.freezeBucketPointerII = oscillatorII.freezeBucket;
    jam.client.changeFilterTypeTwoPointer = filterII.setType;
    jam.client.changeFilterFrequencyTwoPointer = filterII.setFrequency;
    jam.client.changeFilterQTwoPointer = filterII.setQ;
    jam.client.changeFilterGainTwoPointer = filterII.setGain;
    // oscillator II & features: update displays
    jam.client.updateLfoDisplayPointerII = lfoII.updateDisplay;
    jam.client.updateOscillatorDisplayPointerII = function() { oscillatorII.updateDisplay('#OscIIFrequency', '#oscIIType'); }
    jam.client.updateWaveBucketDisplayPointerII = function (){ oscillatorII.updateWaveBucketDisplay('bucketlistII');} // temp solution: get element by ID => double quotes, no #
    jam.client.updateBiquadFilterIDisplayPointer = function () {filterII.updateDisplay('#filterTypeTwo', '#filterFrequencyTwo','#filterQTwo','#filterGainTwo');}
    // oscillator II & features: wavebucket client-server connection
    jam.client.saveWaveBucketPointerII = function() { oscillatorII.saveWaveBucket('#hiddenWaveBucketII');}
    jam.client.loadWaveBucketPointerII = function (){ oscillatorII.loadWaveBucket('#hiddenWaveBucketII');}



    // update connections between sound modules
    jam.client.updateConnectionsPointer = wiring.updateConnections;

  
    


    $.connection.hub.start().done(function () {

        /* OscillatorI Event Listeners */

        $('#oscStartButtonI').click(function () {
            console.log("oscStartButtonI clicked");
            jam.server.stackASoundWaveI($('#OscIFrequency').val(), $('#oscIType').val(), true);
        });


        $('#oscStopButtonI').click(function () {
            console.log("oscStopButtonI clicked");
            jam.server.removeLastSoundI();
        });

        /* Lfo I Event Listeners */

        // event listener activation LFO 
        $('#LFOIActive').change(
            function () {
                if ($('#LFOIActive').is(':checked')) {
                    console.log("LFOIButton clicked");
                    jam.server.activateLFOI($('#LFOIFreq').val(), $('#LFOIScale').val(), $('#lfoIType').val());

                } else {
                    console.log("LFOStopButtonI clicked");
                    jam.server.deactivateLFOI();
                }
        });

        $('#lfoIType').change(
           function () {

              var lfoType = $('#lfoIType').find("option:selected").attr("value");

               if ($('#LFOIActive').is(':checked')) {
                   jam.server.deactivateLFOI();
                   setTimeout(function() { jam.server.activateLFOI($('#LFOIFreq').val(), $('#LFOIScale').val(), lfoType) }, 10);
                   console.log("LFO type I is changed, while activated");
               } else {
                   console.log($('#LFOIActive').is(':checked'));
                   console.log("LFO type is changed I, but was not activated");
                   
               }
           });

        $('#LFOIFreq').change(
          function () {

              if ($('#LFOIActive').is(':checked')) {
                  jam.server.deactivateLFOI();
                  setTimeout(function() { jam.server.activateLFOI($('#LFOIFreq').val(), $('#LFOIScale').val(), $('#lfoIType').val()); }, 10);
                  console.log("LFO freq I is changed, while activated");
              } else {
                  console.log($('#LFOIActive').is(':checked'));
                  console.log("LFO freq I is changed, but was not activated");

              }
          });

        $('#LFOIScale').change(
       function () {

           if ($('#LFOIActive').is(':checked')) {
               jam.server.deactivateLFOI();
               setTimeout(function () { jam.server.activateLFOI($('#LFOIFreq').val(), $('#LFOIScale').val(), $('#lfoIType').val()); }, 10);
               console.log("LFO scale I is changed, while activated");
           } else {
               console.log($('#LFOIActive').is(':checked'));
               console.log("LFO scale I is changed, but was not activated");

           }
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


      

        /* Oscillator II Event Listeners */

        $('#oscStartButtonII').click(function () {
            console.log("oscStartButtonII clicked");
            jam.server.stackASoundWaveII($('#OscIIFrequency').val(), $('#oscIIType').val(), true);
        });


        $('#oscStopButtonII').click(function () {
            console.log("oscStopButtonII clicked");
            jam.server.removeLastSoundII();
        });

        /* Lfo II Event Listeners */

        // event listener activation LFO 
        $('#LFOIIActive').change(
            function () {
                if ($('#LFOIIActive').is(':checked')) {
                    console.log("LFOButtonII clicked");
                    jam.server.activateLFOII($('#LFOIIFreq').val(), $('#LFOIIScale').val(), $('#lfoIIType').val());

                } else {
                    console.log("LFOStopButtonII clicked");
                    jam.server.deactivateLFOII();
                }
            });

        $('#lfoIIType').change(
           function () {

               var lfoType = $('#lfoIIType').find("option:selected").attr("value");

               if ($('#LFOIIActive').is(':checked')) {
                   jam.server.deactivateLFOII();
                   setTimeout(function () { jam.server.activateLFOII($('#LFOIIFreq').val(), $('#LFOIIScale').val(), lfoType) }, 10);
                   console.log("LFO type II is changed, while activated");
               } else {
                   console.log($('#LFOIIActive').is(':checked'));
                   console.log("LFO type II is changed, but was not activated");

               }
           });

        $('#LFOIIFreq').change(
          function () {

              if ($('#LFOIIActive').is(':checked')) {
                  jam.server.deactivateLFOII();
                  setTimeout(function () { jam.server.activateLFOII($('#LFOIIFreq').val(), $('#LFOIIScale').val(), $('#lfoIIType').val()); }, 10);
                  console.log("LFO freq II is changed, while activated");
              } else {
                  console.log($('#LFOIIActive').is(':checked'));
                  console.log("LFO freq II is changed, but was not activated");

              }
          });

        $('#LFOIIScale').change(
       function () {

           if ($('#LFOIIActive').is(':checked')) {
               jam.server.deactivateLFOII();
               setTimeout(function () { jam.server.activateLFOII($('#LFOIIFreq').val(), $('#LFOIIScale').val(), $('#lfoIIType').val()); }, 10);
               console.log("LFO scale II is changed, while activated");
           } else {
               console.log($('#LFOIIActive').is(':checked'));
               console.log("LFO scale II is changed, but was not activated");

           }
       });

        /* BiquadFilter II Event Listeners */
        // event listener type box
        $('#filterTypeTwo').change(function () {
            jam.server.changeFilterTypeTwo($('#filterTypeTwo').val());
        });

        // event listener frequency field
        $('#filterFrequencyTwo').change(function () {
            jam.server.changeFilterFrequencyTwo($('#filterFrequencyTwo').val());
        });

        // event listener Q field
        $('#filterQTwo').change(function () {
            jam.server.changeFilterQTwo($('#filterQTwo').val());
        });

        // event listener gain field
        $('#filterGainTwo').change(function () {
            jam.server.changeFilterGainTwo($('#filterGainTwo').val());
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



      

    });

});