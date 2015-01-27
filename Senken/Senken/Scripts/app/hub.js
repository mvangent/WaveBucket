

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
    }()

    jam.client.lfoIIRunner = function () {
        
        if ($('#LfoIIActive').is(':checked')) {
            console.log("lfo active in runner TWO is true");
            lfoII.lfoActivator($('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val())
        }
        console.log("lfo runner II initiated")
        wiring.updateConnections();
    }()

    jam.client.filterIRunner = function () {

        filterI.setType($('#filterTypeOne').val());
        filterI.setFrequency($('#filterFrequencyOne').val());
        filterI.setQ($('#filterQOne').val());
        filterI.setGain($('#filterGainOne').val());

        console.log("filter runner I initiated");

    }()

    jam.client.filterIIRunner = function () {

        filterII.setType($('#filterTypeTwo').val());
        filterII.setFrequency($('#filterFrequencyTwo').val());
        filterII.setQ($('#filterQTwo').val());
        filterII.setGain($('#filterGainTwo').val());

        console.log("filter runner II initiated");

    }()

    jam.client.delayIRunner = function () {

        delayI.setDelayTime($('#delayITime').val());
        delayI.setDryWetRatio($('#delayIDryWet').val());
        

        console.log("delayI runner initiated");

    }()

    jam.client.delayIIRunner = function () {

        delayII.setDelayTime($('#delayIITime').val());
        delayII.setDryWetRatio($('#delayIIDryWet').val());

        console.log("delay II runner initiated");

    }()

    
    jam.client.masterVolumeRunner = function () {

        endController.gainAdjuster($('#masterGain').val());

        console.log("masterGain RUNNER");

    }()

    jam.client.compressorRunner = function () {

        finalCompressor.ratioAdjuster($('#compRatio').val());
        finalCompressor.kneeAdjuster($('#compKnee').val());
        finalCompressor.thresholdAdjuster($('#compThreshold').val());

        console.log("compressor RUNNER");

    }()


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
    jam.client.updateWaveBucketDisplayPointerI = function (){ oscillatorI.updateWaveBucketDisplay('bucketlistI')} // temp solution: get element by ID => double quotes, no #
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
    jam.client.updateWaveBucketDisplayPointerII = function (){setTimeout(function() { oscillatorII.updateWaveBucketDisplay('bucketlistII') }, 500)} // temp solution: get element by ID => double quotes, no #
    jam.client.updateBiquadFilterIIDisplayPointer = function () {filterII.updateDisplay('#filterTypeTwo', '#filterFrequencyTwo','#filterQTwo','#filterGainTwo');}
    jam.client.updateDelayIIDisplayPointer = function () { setTimeout(function () { delayII.updateDisplay('#delayIITime', '#delayIIDryWet') }, 100) }
    // oscillator II & features: wavebucket client-server connection
    jam.client.saveWaveBucketPointerII = function() { oscillatorII.saveWaveBucket('#hiddenWaveBucketII');}
    jam.client.loadWaveBucketPointerII = function (){ oscillatorII.loadWaveBucket('#hiddenWaveBucketII');}

    // wavebucket I
    jam.client.changeWaveVolumeInBucketIPointer = function(waveNumber, volume){oscillatorI.changeWaveVolume(waveNumber, volume); oscillatorI.updateWaveBucketDisplay('bucketlistI')};
    jam.client.removeWaveByIndexInBucketIPointer = function (waveNumber) {oscillatorI.removeWave(waveNumber); oscillatorI.updateWaveBucketDisplay('bucketlistI') };

     // wavebucket II
    jam.client.changeWaveVolumeInBucketIIPointer = function (waveNumber, volume) {oscillatorII.changeWaveVolume(waveNumber, volume); oscillatorII.updateWaveBucketDisplay('bucketlistII') };
    jam.client.removeWaveByIndexInBucketIIPointer = function (waveNumber) {oscillatorII.removeWave(waveNumber); oscillatorII.updateWaveBucketDisplay('bucketlistII') };

    


    // update connections between sound modules
    jam.client.updateConnectionsPointer = wiring.updateConnections;

  
    


    $.connection.hub.start().done(function () {

        /*----------------------------------------------------------------------------
        ** Membership Buttons Event Listeners 
        ** ---------------------------------------------------------------------------
        ** !! Important: Both the OnOffButton and JoinGroup eventListeners are necessary
        ** to establish a signalR connection. Clicking these buttons does not only result in 
        ** visual effects, but a least equally importantly calls a method that connects the 
        ** user to the jamRoom. 
        */

        var sessionInt = $('#SessionID').val();
        var sessionIDString = sessionInt.toString();

       /*----------------------------------------------------------------------------
       ** Event Listener: OnOffButton: values (Controller, Minimize)
       ** ---------------------------------------------------------------------------
       ** Sets up a single user connection with the signalR hub. 
       */

        $('#OnOffButton').click(function () {

            console.log($('#SessionID').val() + " OnOffButton clicked");

           

            if ($('#SessionID').val() != null && $('#OnOffButton').val() === "Controller") {



                jam.server.joinRoom(sessionIDString);

                // non server methods
                $('.senkenContainer').show("slow");
                $('#compressor').show("fast");
                $('#masterControls').show("fast");
                $('#SaveButton').show("fast");

                // set join button to disjoin and colors to complementary color scheme
                $('#OnOffButton').val("Minimize");
                $('#OnOffButton').css({ 'background': '#FFFFFF' });
                $('#OnOffButton').css({ 'color': '#7f004c' });





            } else {

                jam.server.leaveRoom(sessionIDString);

                // non server methods
                $('.senkenContainer').hide("fast");
                $('#compressor').hide("slow");
                $('#masterControls').hide("slow");
               

                // set join button to disjoin and colors to complementary color scheme
                $('#OnOffButton').val("Controller");
                $('#OnOffButton').css({ 'background': '#5EFF9F' });
                $('#OnOffButton').css({ 'color': '#007f33' });


            }
        });

        /*----------------------------------------------------------------------------
      ** Event Listener: JoinButton: values (Join, Disengage)
      ** ---------------------------------------------------------------------------
      ** Sets up a multi-user connection with the signalR hub. 
      */

        $('#JoinButton').click(function () {

            console.log($('#SessionID').val() + " JoinButton clicked");
            
           // var sessionInt = $('#SessionID').val();
           // var sessionIDString = sessionInt.toString();

            if ($('#SessionID').val() != null && $('#JoinButton').val() === "Connect") {

                

                jam.server.joinRoom(sessionIDString);

                // non server methods
                $('.senkenContainer').show("slow");
                $('#compressor').show("fast");
                $('#masterControls').show("fast");
                $('#SaveButton').show("fast");

                // set join button to disjoin and colors to complementary color scheme
                $('#JoinButton').val("Disengage");
                $('#JoinButton').css({ 'background': '#FFFFFF' });
                $('#JoinButton').css({ 'color': '#7f004c' });
                
                
             


            } else {

                jam.server.leaveRoom(sessionIDString);

                // non server methods
                $('.senkenContainer').hide("fast");
                $('#compressor').hide("slow");
                $('#masterControls').hide("slow");
                

                // set join button to disjoin and colors to complementary color scheme
                $('#JoinButton').val("Connect");
                $('#JoinButton').css({ 'background': '#5EFF9F' });
                $('#JoinButton').css({ 'color': '#007f33' });


            }
        });


        $('#SaveButton').click(function () {
            if ($('#sessionId').val() != null) {
                jam.server.leaveRoom(sessionIDString);
            }
        });

        $('#QuitButton').click(function () {
            if ($('#sessionId').val() != null) {
                jam.server.leaveRoom(sessionIDString);
            }
        });

        /* membership initializers */
        $('#ExploreAgainButton').click(function () {
            if ($('#sessionId').val() != null) {
                jam.server.leaveRoom(sessionIDString);
            }
        });


        /*----------------------------------------------------------------------------
        ** Master Controller Event Listeners 
        ** ---------------------------------------------------------------------------
        */


        // event listener gain field
        $('#masterGain').change(function () {
            jam.server.changeMasterGain(sessionIDString, $('#masterGain').val());
        });

        // event listener suspend button
        $('#stopButton').click(function () {
            jam.server.stopSession(sessionIDString);
        });

        // event listener start button
        $('#playButton').click(function () {

            console.log(sessionIDString);
            jam.server.playSession(sessionIDString);
        });


        

        /*----------------------------------------------------------------------------
        ** Compressor Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        /* Compressor Event Listeners */
        // event listener ratio Compressor 
        $('#compRatio').change(function () {
            console.log("compressor ratio adjusted");
            jam.server.adjustCompRatio(sessionIDString, $('#compRatio').val());
        });

        // event listener knee Compressor 
        $('#compKnee').change(function () {
            console.log("compressor knee adjusted");
            jam.server.adjustCompKnee(sessionIDString, $('#compKnee').val());
        });

        // event listener treshold Compressor 
        $('#compThreshold').change(function () {
            console.log("compressor treshold adjusted");
            jam.server.adjustCompThreshold(sessionIDString, $('#compThreshold').val());
        });

        /*----------------------------------------------------------------------------
        ** Oscillator I Event Listeners 
        ** ---------------------------------------------------------------------------
        */


        $('#oscStartButtonI').click(function () {
            console.log("oscStartButtonI clicked");
            jam.server.stackASoundWaveI(sessionIDString, $('#OscIFrequency').val(), $('#oscIType').val(), true); // standard start volume is 0.5;
        });


        $('#oscStopButtonI').click(function () {
            console.log("oscStopButtonI clicked");
            jam.server.removeLastSoundI(sessionIDString);
        });

        /*----------------------------------------------------------------------------
        ** LFO I Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        // event listener activation LFO 
        $('#LfoIActive').change(
            function () {
                if ($('#LfoIActive').is(':checked')) {
                    console.log("LfoIButton clicked");
                    jam.server.activateLFOI(sessionIDString, $('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val());

                } else {
                    console.log("LFOStopButtonI clicked");
                    jam.server.deactivateLFOI(sessionIDString);
                }
        });

        $('#LfoIType').change(
           function () {

              var lfoType = $('#LfoIType').find("option:selected").attr("value");

               if ($('#LfoIActive').is(':checked')) {
                   jam.server.deactivateLFOI(sessionIDString);
                   setTimeout(function () { jam.server.activateLFOI(sessionIDString, $('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val()) }, 0);
                   console.log("LFO type I is changed, while activated");
               } else {
                   console.log($('#LfoIActive').is(':checked'));
                   console.log("LFO type is changed I, but was not activated");
                   
               }
           });

        $('#LfoIFrequency').change(
          function () {

              if ($('#LfoIActive').is(':checked')) {
                  jam.server.deactivateLFOI(sessionIDString);
                  setTimeout(function() { jam.server.activateLFOI(sessionIDString, $('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val()); }, 0);
                  console.log("LFO freq I is changed, while activated");
              } else {
                  console.log($('#LfoIActive').is(':checked'));
                  console.log("LFO freq I is changed, but was not activated");

              }
          });

        $('#LfoIScale').change(
       function () {

           if ($('#LfoIActive').is(':checked')) {
               jam.server.deactivateLFOI(sessionIDString);
               setTimeout(function () { jam.server.activateLFOI(sessionIDString, $('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val()); }, 10);

               console.log("LFO scale I is changed, while activated");
           } else {
               console.log($('#LfoIActive').is(':checked'));
               console.log("LFO scale I is changed, but was not activated");

           }
       });

        /*----------------------------------------------------------------------------
        ** BiquadFilter I Event Listeners 
        ** ---------------------------------------------------------------------------
        */
        // event listener type box
        $('#filterTypeOne').change(function () {
            jam.server.changeFilterTypeOne(sessionIDString, $('#filterTypeOne').val());
        });

        // event listener frequency field
        $('#filterFrequencyOne').change(function () {
            jam.server.changeFilterFrequencyOne(sessionIDString, $('#filterFrequencyOne').val());
        });

        // event listener Q field
        $('#filterQOne').change(function () {
            jam.server.changeFilterQOne(sessionIDString, $('#filterQOne').val());
        });

        // event listener gain field
        $('#filterGainOne').change(function () {
            jam.server.changeFilterGainOne(sessionIDString, $('#filterGainOne').val());
        });

        /*----------------------------------------------------------------------------
        ** Delay I Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        // time
        $('#delayITime').change(function () {
            jam.server.changeDelayITime(sessionIDString, $('#delayITime').val());
        })

        // dryWetRatio
        $('#delayIDryWet').change(function () {
            jam.server.changeDelayIDryWet(sessionIDString, $('#delayIDryWet').val());
        })

      

        /*----------------------------------------------------------------------------
        ** Oscillator II Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        $('#oscStartButtonII').click(function () {
            console.log("oscStartButtonII clicked");
            jam.server.stackASoundWaveII(sessionIDString, $('#OscIIFrequency').val(), $('#oscIIType').val(), true); // standard start volume is 0.5
        });


        $('#oscStopButtonII').click(function () {
            console.log("oscStopButtonII clicked");
            jam.server.removeLastSoundII(sessionIDString);
        });

        /*----------------------------------------------------------------------------
        ** LFO II Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        // event listener activation LFO 
        $('#LfoIIActive').change(
            function () {
                if ($('#LfoIIActive').is(':checked')) {
                    console.log("LfoButtonII clicked");
                    jam.server.activateLFOII(sessionIDString, $('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val());

                } else {
                    console.log("LFOStopButtonII clicked");
                    jam.server.deactivateLFOII(sessionIDString);
                }
            });

        $('#LfoIIType').change(
           function () {

               var lfoType = $('#LfoIIType').find("option:selected").attr("value");

               if ($('#LfoIIActive').is(':checked')) {
                   jam.server.deactivateLFOII(sessionIDString);
                   setTimeout(function () { jam.server.activateLFOII(sessionIDString, $('#LfoIIFrequency').val(), $('#LfoIIScale').val(), lfoType) }, 10);
                   console.log("LFO type II is changed, while activated");
               } else {
                   console.log($('#LfoIIActive').is(':checked'));
                   console.log("LFO type II is changed, but was not activated");

               }
           });

        $('#LfoIIFrequency').change(
          function () {

              if ($('#LfoIIActive').is(':checked')) {
                  jam.server.deactivateLFOII(sessionIDString);
                  setTimeout(function () { jam.server.activateLFOII(sessionIDString, $('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val()); }, 10);
                  console.log("LFO freq II is changed, while activated");
              } else {
                  console.log($('#LfoIIActive').is(':checked'));
                  console.log("LFO freq II is changed, but was not activated");

              }
          });

        $('#LfoIIScale').change(
       function () {

           if ($('#LfoIIActive').is(':checked')) {
               jam.server.deactivateLFOII(sessionIDString);
               setTimeout(function () { jam.server.activateLFOII(sessionIDString, $('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val()); }, 10);
               console.log("LFO scale II is changed, while activated");
           } else {
               console.log($('#LfoIIActive').is(':checked'));
               console.log("LFO scale II is changed, but was not activated");

           }
       });

        /*----------------------------------------------------------------------------
        ** BiquadFIlter II Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        // event listener type box
        $('#filterTypeTwo').change(function () {
            jam.server.changeFilterTypeTwo(sessionIDString, $('#filterTypeTwo').val());
        });

        // event listener frequency field
        $('#filterFrequencyTwo').change(function () {
            jam.server.changeFilterFrequencyTwo(sessionIDString, $('#filterFrequencyTwo').val());
        });

        // event listener Q field
        $('#filterQTwo').change(function () {
            jam.server.changeFilterQTwo(sessionIDString, $('#filterQTwo').val());
        });

        // event listener gain field
        $('#filterGainTwo').change(function () {
            jam.server.changeFilterGainTwo(sessionIDString, $('#filterGainTwo').val());
        });



        /*----------------------------------------------------------------------------
        ** Delay II Event Listeners 
        ** ---------------------------------------------------------------------------
        */
        // time
        $('#delayIITime').change(function () {
            jam.server.changeDelayIITime(sessionIDString, $('#delayIITime').val());
        })

        // dryWetRatio
        $('#delayIIDryWet').change(function () {
            jam.server.changeDelayIIDryWet(sessionIDString, $('#delayIIDryWet').val());
        })


       
        



        /* -------------------------------------------------------------------------------------
        ** WaveBucket waves are listened for after a DOM mutation. Because the bucket is created 
        ** dynamically, a mutation listener must be implemented first. Currently every bucket can
        ** allow volume manipulation up until 10 waves/bucket
        ** -------------------------------------------------------------------------------------
        */
        

        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        var observer = new MutationObserver(function (mutations, observer) {
            // fired when a mutation occurs
            console.log(mutations);
            

            /*-------------------------------------------------------------------------------
            **                          ___   __          ____      ___  ______    ___      **
            **  \      /   /\   \    / |     |  \  |   | |     | / |       |        |       **
            **   \    /   / _\   \  /  |--   |---| |   | |     |   |--     |        |       **
            **    \/\/   /    \   \/   |___  |__/  |___| |____ | \ |___    |       _|_      **
            **                                                                              **
            **-------------------------------------------------------------------------------

            /* waveBucketI volume fader event listeners */

            $('#volumeFaderoscI0').change(function () {

                var volume = $('#volumeFaderoscI0').val() / 100;
                console.log("volumeFaderoscI0 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 0)

                ;
            });

            $('#volumeFaderoscI1').change(function () {
                var volume = $('#volumeFaderoscI1').val() / 100;
                console.log("volumeFaderoscI1 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 1);
            });

            $('#volumeFaderoscI2').change(function () {
                var volume = $('#volumeFaderoscI2').val() / 100;
                console.log("volumeFaderoscI2 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 2);
            });

            $('#volumeFaderoscI3').change(function () {
                var volume = $('#volumeFaderoscI3').val() / 100;
                console.log("volumeFaderoscI3 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 3);
            });

            $('#volumeFaderoscI4').change(function () {
                var volume = $('#volumeFaderoscI4').val() / 100;
                console.log("volumeFaderoscI4 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 4);
            });

            $('#volumeFaderoscI5').change(function () {
                var volume = $('#volumeFaderoscI5').val() / 100;
                console.log("volumeFaderoscI5 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 5);
            });

            $('#volumeFaderoscI6').change(function () {
                var volume = $('#volumeFaderoscI6').val() / 100;
                console.log("volumeFaderoscI6 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 6);
            });

            $('#volumeFaderoscI7').change(function () {
                var volume = $('#volumeFaderoscI7').val() / 100;
                console.log("volumeFaderoscI7 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 7);
            });

            $('#volumeFaderoscI8').change(function () {
                var volume = $('#volumeFaderoscI8').val() / 100;
                console.log("volumeFaderoscI8 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 8);
            });

            $('#volumeFaderoscI9').change(function () {
                var volume = $('#volumeFaderoscI9').val() / 100;
                console.log("volumeFaderoscI9 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 0, 9);
            });

            /* wavebucket I removeSymbolEvent listeners */

            $('#removeImageoscI0').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 0);
                console.log("remove wave clicked oscI0");
            });

            $('#removeImageoscI1').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 1);
                console.log("remove wave clicked oscI1");
            });

            $('#removeImageoscI2').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 2);
                console.log("remove wave clicked oscI2");
            });

            $('#removeImageoscI3').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 3);
                console.log("remove wave clicked oscI3");
            });

            $('#removeImageoscI4').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 4);
                console.log("remove wave clicked oscI4");
            });

            $('#removeImageoscI5').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 5);
                console.log("remove wave clicked oscI5");
            });

            $('#removeImageoscI6').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 6);
                console.log("remove wave clicked oscI6");
            });

            $('#removeImageoscI7').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 7);
                console.log("remove wave clicked oscI7");
            });

            $('#removeImageoscI8').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 8);
                console.log("remove wave clicked oscI8");
            });

            $('#removeImageoscI9').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 0, 9);
                console.log("remove wave clicked oscI9");
            });


            /*-------------------------------------------------------------------------------
            **                          ___   __          ____      ___  ______    ___ ___  **
            **  \      /   /\   \    / |     |  \  |   | |     | / |       |        |   |   **
            **   \    /   / _\   \  /  |--   |---| |   | |     |   |--     |        |   |   **
            **    \/\/   /    \   \/   |___  |__/  |___| |____ | \ |___    |       _|_ _|_  **
            **                                                                              **
            **-------------------------------------------------------------------------------

            /* waveBucketII volume fader event listeners */
            $('#volumeFaderoscII0').change(function () {
                
                var volume = $('#volumeFaderoscII0').val() / 100;
                console.log("volumeFaderoscII0 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 0)

                ;
            });

            $('#volumeFaderoscII1').change(function () {
                var volume = $('#volumeFaderoscII1').val() / 100;
                console.log("volumeFaderoscII1 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 1);
            });

            $('#volumeFaderoscII2').change(function () {
                var volume = $('#volumeFaderoscII2').val() / 100;
                console.log("volumeFaderoscII2 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 2);
            });

            $('#volumeFaderoscII3').change(function () {
                var volume = $('#volumeFaderoscII3').val() / 100;
                console.log("volumeFaderoscII3 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 3);
            });

            $('#volumeFaderoscII4').change(function () {
                var volume = $('#volumeFaderoscII4').val() / 100;
                console.log("volumeFaderoscII4 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 4);
            });

            $('#volumeFaderoscII5').change(function () {
                var volume = $('#volumeFaderoscII5').val() / 100;
                console.log("volumeFaderoscII5 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 5);
            });

            $('#volumeFaderoscII6').change(function () {
                var volume = $('#volumeFaderoscII6').val() / 100;
                console.log("volumeFaderoscII6 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 6);
            });

            $('#volumeFaderoscII7').change(function () {
                var volume = $('#volumeFaderoscII7').val() / 100;
                console.log("volumeFaderoscII7 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 7);
            });

            $('#volumeFaderoscII8').change(function () {
                var volume = $('#volumeFaderoscII8').val() / 100;
                console.log("volumeFaderoscII8 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 8);
            });

            $('#volumeFaderoscII9').change(function () {
                var volume = $('#volumeFaderoscII9').val() / 100;
                console.log("volumeFaderoscII9 adjusted with volume: " + volume);
                jam.server.adjustWaveVolume(sessionIDString, volume, 1, 9);
            });


            /* wavebucket II removeSymbolEvent listeners */

            $('#removeImageoscII0').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 0);
                console.log("remove wave clicked oscII0");
            });

            $('#removeImageoscII1').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 1);
                console.log("remove wave clicked oscII1");
            });

            $('#removeImageoscII2').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 2);
                console.log("remove wave clicked oscII2");
            });

            $('#removeImageoscII3').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 3);
                console.log("remove wave clicked oscII3");
            });

            $('#removeImageoscII4').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 4);
                console.log("remove wave clicked oscII4");
            });

            $('#removeImageoscII5').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 5);
                console.log("remove wave clicked oscII5");
            });

            $('#removeImageoscII6').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 6);
                console.log("remove wave clicked oscII6");
            });

            $('#removeImageoscII7').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 7);
                console.log("remove wave clicked oscII7");
            });

            $('#removeImageoscII8').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 8);
                console.log("remove wave clicked oscII8");
            });

            $('#removeImageoscII9').click(function () {
                jam.server.removeWaveByIndex(sessionIDString, 1, 9);
                console.log("remove wave clicked oscII9");
            });



        });

        // define what element should be observed by the observer
        // and what types of mutations trigger the callback
        observer.observe(document, {
            subtree: true,
            attributes: true,
            childList: true,
            characterData: true,
            attributeOldValue: true,
            characterDataOldValue: true
        });

           

    });

});