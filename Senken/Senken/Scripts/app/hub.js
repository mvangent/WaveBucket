

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

    // module runners
    jam.client.lfoIRunner = function () {
        if ($('#LfoIActive').is(':checked')) {
            console.log("lfo active in runner ONE is true");
            lfoI.lfoActivator($('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val())
            wiring.updateConnections();
        }
        console.log("lfo runner I initiated")
    };

    jam.client.lfoIIRunner = function () {
        
        if ($('#LfoIIActive').is(':checked')) {
            console.log("lfo active in runner TWO is true");
            lfoII.lfoActivator($('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val())
        }
        console.log("lfo runner II initiated")
        wiring.updateConnections();
    };

    jam.client.filterIRunner = function () {

        filterI.setType($('#filterTypeOne').val());
        filterI.setFrequency($('#filterFrequencyOne').val());
        filterI.setQ($('#filterQOne').val());
        filterI.setGain($('#filterGainOne').val());

        console.log("filter runner I initiated");

    }

    jam.client.filterIIRunner = function () {

        filterII.setType($('#filterTypeTwo').val());
        filterII.setFrequency($('#filterFrequencyTwo').val());
        filterII.setQ($('#filterQTwo').val());
        filterII.setGain($('#filterGainTwo').val());

        console.log("filter runner II initiated");

    }

    jam.client.delayIRunner = function () {

        delayI.setDelayTime($('#delayITime').val());
        delayI.setDryWetRatio($('#delayIDryWet').val());
        

        console.log("delayI runner initiated");

    }

    jam.client.delayIIRunner = function () {

        delayII.setDelayTime($('#delayIITime').val());
        delayII.setDryWetRatio($('#delayIIDryWet').val());

        console.log("delay II runner initiated");

    }

    jam.client.masterVolumeRunner = function () {

        endController.gainAdjuster($('#masterGain').val());

        console.log("masterGain RUNNER");

    }

    jam.client.compressorRunner = function () {

        finalCompressor.ratioAdjuster($('#compRatio').val());
        finalCompressor.kneeAdjuster($('#compKnee').val());
        finalCompressor.thresholdAdjuster($('#compThreshold').val());

        console.log("compressor RUNNER");

    }


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
    jam.client.changeDelayITimePointer = delayI.setDelayTime;
    jam.client.changeDelayIDryWetPointer = delayI.setDryWetRatio;
    // oscillator I & features: update displays
    jam.client.updateLfoDisplayPointerI = function (){setTimeout(function() {lfoI.updateDisplay('#LfoIActive', '#LfoIFrequency', '#LfoIScale', '#LfoIType')}, 100)}
    jam.client.updateOscillatorDisplayPointerI = function (){ oscillatorI.updateDisplay('#OscIFrequency', '#oscIType');}
    jam.client.updateWaveBucketDisplayPointerI = function (){ oscillatorI.updateWaveBucketDisplay('bucketlistI');} // temp solution: get element by ID => double quotes, no #
    jam.client.updateBiquadFilterIDisplayPointer = function () { filterI.updateDisplay('#filterTypeOne', '#filterFrequencyOne', '#filterQOne', '#filterGainOne'); }
    jam.client.updateDelayIDisplayPointer = function () { setTimeout(function () { delayI.updateDisplay('#delayITime', '#delayIDryWet') }, 100) }
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
    jam.client.changeDelayIITimePointer = delayII.setDelayTime;
    jam.client.changeDelayIIDryWetPointer = delayII.setDryWetRatio;
    // oscillator II & features: update displays
    jam.client.updateLfoDisplayPointerII = function () { setTimeout(function () { lfoII.updateDisplay('#LfoIIActive', '#LfoIIFrequency', '#LfoIIScale', '#LfoIIType') }, 100) }
    jam.client.updateOscillatorDisplayPointerII = function() { oscillatorII.updateDisplay('#OscIIFrequency', '#oscIIType'); }
    jam.client.updateWaveBucketDisplayPointerII = function (){ oscillatorII.updateWaveBucketDisplay('bucketlistII');} // temp solution: get element by ID => double quotes, no #
    jam.client.updateBiquadFilterIIDisplayPointer = function () {filterII.updateDisplay('#filterTypeTwo', '#filterFrequencyTwo','#filterQTwo','#filterGainTwo');}
    jam.client.updateDelayIIDisplayPointer = function () { setTimeout(function () { delayII.updateDisplay('#delayIITime', '#delayIIDryWet') }, 100) }
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
        $('#LfoIActive').change(
            function () {
                if ($('#LfoIActive').is(':checked')) {
                    console.log("LfoIButton clicked");
                    jam.server.activateLFOI($('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val());

                } else {
                    console.log("LFOStopButtonI clicked");
                    jam.server.deactivateLFOI();
                }
        });

        $('#LfoIType').change(
           function () {

              var lfoType = $('#LfoIType').find("option:selected").attr("value");

               if ($('#LfoIActive').is(':checked')) {
                   jam.server.deactivateLFOI();
                   setTimeout(function () { jam.server.activateLFOI($('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val()) }, 0);
                   console.log("LFO type I is changed, while activated");
               } else {
                   console.log($('#LfoIActive').is(':checked'));
                   console.log("LFO type is changed I, but was not activated");
                   
               }
           });

        $('#LfoIFrequency').change(
          function () {

              if ($('#LfoIActive').is(':checked')) {
                  jam.server.deactivateLFOI();
                  setTimeout(function() { jam.server.activateLFOI($('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val()); }, 0);
                  console.log("LFO freq I is changed, while activated");
              } else {
                  console.log($('#LfoIActive').is(':checked'));
                  console.log("LFO freq I is changed, but was not activated");

              }
          });

        $('#LfoIScale').change(
       function () {

           if ($('#LfoIActive').is(':checked')) {
               jam.server.deactivateLFOI();
               setTimeout(function () { jam.server.activateLFOI($('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val()); }, 10);

               console.log("LFO scale I is changed, while activated");
           } else {
               console.log($('#LfoIActive').is(':checked'));
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

        /* Delay I Event Listeners */

        // time
        $('#delayITime').change(function () {
            jam.server.changeDelayITime($('#delayITime').val());
        })

        // dryWetRatio
        $('#delayIDryWet').change(function () {
            jam.server.changeDelayIDryWet($('#delayIDryWet').val());
        })

      

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
        $('#LfoIIActive').change(
            function () {
                if ($('#LfoIIActive').is(':checked')) {
                    console.log("LfoButtonII clicked");
                    jam.server.activateLFOII($('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val());

                } else {
                    console.log("LFOStopButtonII clicked");
                    jam.server.deactivateLFOII();
                }
            });

        $('#LfoIIType').change(
           function () {

               var lfoType = $('#LfoIIType').find("option:selected").attr("value");

               if ($('#LfoIIActive').is(':checked')) {
                   jam.server.deactivateLFOII();
                   setTimeout(function () { jam.server.activateLFOII($('#LfoIIFrequency').val(), $('#LfoIIScale').val(), lfoType) }, 10);
                   console.log("LFO type II is changed, while activated");
               } else {
                   console.log($('#LfoIIActive').is(':checked'));
                   console.log("LFO type II is changed, but was not activated");

               }
           });

        $('#LfoIIFrequency').change(
          function () {

              if ($('#LfoIIActive').is(':checked')) {
                  jam.server.deactivateLFOII();
                  setTimeout(function () { jam.server.activateLFOII($('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val()); }, 10);
                  console.log("LFO freq II is changed, while activated");
              } else {
                  console.log($('#LfoIIActive').is(':checked'));
                  console.log("LFO freq II is changed, but was not activated");

              }
          });

        $('#LfoIIScale').change(
       function () {

           if ($('#LfoIIActive').is(':checked')) {
               jam.server.deactivateLFOII();
               setTimeout(function () { jam.server.activateLFOII($('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val()); }, 10);
               console.log("LFO scale II is changed, while activated");
           } else {
               console.log($('#LfoIIActive').is(':checked'));
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



        /* Delay II Event Listeners */
        // time
        $('#delayIITime').change(function () {
            jam.server.changeDelayIITime($('#delayIITime').val());
        })

        // dryWetRatio
        $('#delayIIDryWet').change(function () {
            jam.server.changeDelayIIDryWet($('#delayIIDryWet').val());
        })


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