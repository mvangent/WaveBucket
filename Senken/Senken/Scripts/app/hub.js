/*------------------------------------------------------------------------------------------------------
** SignalR ControllerHub: implementation of event listeners through a WebSocket, based on seperation of 
** concerns model. 
--------------------------------------------------------------------------------------------------------
*/

/* jamhub  impl */
$(function () {
    // reference the auto-generated proxy for the hub
    var jam = $.connection.jamHub;

    // create a function that the hub can call back to create sounds

    // module runners
    jam.client.lfoIRunner = function () {
        if ($('#LfoIActive').is(':checked')) {
            lfoI.lfoActivator($('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val());
            wiring.updateConnections();
        }
    }();

    jam.client.lfoIIRunner = function () {

        if ($('#LfoIIActive').is(':checked')) {
            lfoII.lfoActivator($('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val());
        }
        wiring.updateConnections();
    }();

    jam.client.filterIRunner = function () {
        filterI.setType($('#filterTypeOne').val());
        filterI.setFrequency($('#filterFrequencyOne').val());
        filterI.setQ($('#filterQOne').val());
        filterI.setGain($('#filterGainOne').val());
    }();

    jam.client.filterIIRunner = function () {
        filterII.setType($('#filterTypeTwo').val());
        filterII.setFrequency($('#filterFrequencyTwo').val());
        filterII.setQ($('#filterQTwo').val());
        filterII.setGain($('#filterGainTwo').val());
    }();

    jam.client.delayIRunner = function () {
        delayI.setDelayTime($('#delayITime').val());
        delayI.setDryWetRatio($('#delayIDryWet').val());
    }();

    jam.client.delayIIRunner = function () {
        delayII.setDelayTime($('#delayIITime').val());
        delayII.setDryWetRatio($('#delayIIDryWet').val());
    }();

    jam.client.masterVolumeRunner = function () {
        endController.gainAdjuster($('#masterGain').val());
    }();

    jam.client.compressorRunner = function () {
        finalCompressor.ratioAdjuster($('#compRatio').val());
        finalCompressor.kneeAdjuster($('#compKnee').val());
        finalCompressor.thresholdAdjuster($('#compThreshold').val());
    }();

    // end controls: fields
    jam.client.masterGainAdjusterPointer = endController.gainAdjuster;
    jam.client.startSessionPointer = endController.startSession;
    jam.client.stopSessionPointer = endController.stopSession;
    jam.client.compRatioAdjusterPointer = finalCompressor.ratioAdjuster;
    jam.client.compKneeAdjusterPointer = finalCompressor.kneeAdjuster;
    jam.client.compThresholdAdjusterPointer = finalCompressor.thresholdAdjuster;

    // end controls: display
    jam.client.updateEndControlDisplayPointer = endController.updateDisplay;
    jam.client.updateCompressorDisplayPointer = function () { setTimeout(function () { finalCompressor.updateDisplay('#compRatio', '#compKnee', '#compThreshold') }, 150) };

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
    //--------------------------------------------------------------
    jam.client.updateLfoDisplayPointerI = function () { setTimeout(function () { lfoI.updateDisplay('#LfoIActive', '#LfoIFrequency', '#LfoIScale', '#LfoIType') }, 100) }
    jam.client.updateOscillatorDisplayPointerI = function () { oscillatorI.updateDisplay('#OscIFrequency', '#oscIType'); }
    jam.client.updateWaveBucketDisplayPointerI = function () { setTimeout(function () { oscillatorI.updateWaveBucketDisplay('bucketlistI') }, 300) } // temp solution: get element by ID => double quotes, no #
    jam.client.updateBiquadFilterIDisplayPointer = function () { filterI.updateDisplay('#filterTypeOne', '#filterFrequencyOne', '#filterQOne', '#filterGainOne'); }
    jam.client.updateDelayIDisplayPointer = function () { setTimeout(function () { delayI.updateDisplay('#delayITime', '#delayIDryWet') }, 100) }

    // oscillator I & features: wavebucket client-server connection
    jam.client.saveWaveBucketPointerI = function () { oscillatorI.saveWaveBucket('#hiddenWaveBucketI'); }
    jam.client.loadWaveBucketPointerI = function () { oscillatorI.loadWaveBucket('#hiddenWaveBucketI'); }

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
    jam.client.updateOscillatorDisplayPointerII = function () { oscillatorII.updateDisplay('#OscIIFrequency', '#oscIIType'); }
    jam.client.updateWaveBucketDisplayPointerII = function () { setTimeout(function () { oscillatorII.updateWaveBucketDisplay('bucketlistII') }, 300) } // temp solution: get element by ID => double quotes, no #
    jam.client.updateBiquadFilterIIDisplayPointer = function () { filterII.updateDisplay('#filterTypeTwo', '#filterFrequencyTwo', '#filterQTwo', '#filterGainTwo'); }
    jam.client.updateDelayIIDisplayPointer = function () { setTimeout(function () { delayII.updateDisplay('#delayIITime', '#delayIIDryWet') }, 150) }

    // oscillator II & features: wavebucket client-server connection
    jam.client.saveWaveBucketPointerII = function () { oscillatorII.saveWaveBucket('#hiddenWaveBucketII'); }
    jam.client.loadWaveBucketPointerII = function () { oscillatorII.loadWaveBucket('#hiddenWaveBucketII'); }

    // wavebucket I
    jam.client.changeWaveVolumeInBucketIPointer = function (waveNumber, volume) { oscillatorI.changeWaveVolume(waveNumber, volume); oscillatorI.updateWaveBucketDisplay('bucketlistI') };
    jam.client.removeWaveByIndexInBucketIPointer = function (waveNumber) { oscillatorI.removeWave(waveNumber); oscillatorI.updateWaveBucketDisplay('bucketlistI') };

    // wavebucket II
    jam.client.changeWaveVolumeInBucketIIPointer = function (waveNumber, volume) { oscillatorII.changeWaveVolume(waveNumber, volume); oscillatorII.updateWaveBucketDisplay('bucketlistII') };
    jam.client.removeWaveByIndexInBucketIIPointer = function (waveNumber) { oscillatorII.removeWave(waveNumber); oscillatorII.updateWaveBucketDisplay('bucketlistII') };

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
        var sessionIdString = sessionInt.toString();

        /*----------------------------------------------------------------------------
        ** Event Listener: OnOffButton: values (Controller, Minimize)
        ** ---------------------------------------------------------------------------
        ** Sets up a single user connection with the signalR hub. 
        */

        $('#OnOffButton').click(function () {
            if ($('#SessionID').val() != null && $('#OnOffButton').val() === "Controller") {
                jam.server.joinRoom(sessionIdString);

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
                jam.server.leaveRoom(sessionIdString);
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
            if ($('#SessionID').val() != null && $('#JoinButton').val() === "Connect") {
                jam.server.joinRoom(sessionIdString);

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
                jam.server.leaveRoom(sessionIdString);

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
                jam.server.leaveRoom(sessionIdString);
            }
        });

        $('#QuitButton').click(function () {
            if ($('#sessionId').val() != null) {
                jam.server.leaveRoom(sessionIdString);
            }
        });

        /* membership initializers */
        $('#ExploreAgainButton').click(function () {
            if ($('#sessionId').val() != null) {
                jam.server.leaveRoom(sessionIdString);
            }
        });

        /*----------------------------------------------------------------------------
        ** Master Controller Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        // event listener gain field
        $('#masterGain').change(function () {
            jam.server.changeMasterGain(sessionIdString, $('#masterGain').val());
        });

        // event listener suspend button
        $('#stopButton').click(function () {
            jam.server.stopSession(sessionIdString);
        });

        // event listener start button
        $('#playButton').click(function () {

            console.log(sessionIdString);
            jam.server.playSession(sessionIdString);
        });

        /*----------------------------------------------------------------------------
        ** Compressor Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        /* Compressor Event Listeners */
        // event listener ratio Compressor 
        $('#compRatio').change(function () {
            jam.server.adjustCompRatio(sessionIdString, $('#compRatio').val(), '#compRatio', '#compKnee', '#compThreshold');
        });

        // event listener knee Compressor 
        $('#compKnee').change(function () {
            jam.server.adjustCompKnee(sessionIdString, $('#compKnee').val());
        });

        // event listener treshold Compressor 
        $('#compThreshold').change(function () {
            jam.server.adjustCompThreshold(sessionIdString, $('#compThreshold').val());
        });

        /*----------------------------------------------------------------------------
        ** Oscillator I Event Listeners 
        ** ---------------------------------------------------------------------------
        */
        $('#oscStartButtonI').click(function () {
            jam.server.stackASoundWaveI(sessionIdString, $('#OscIFrequency').val(), $('#oscIType').val(), true); // standard start volume is 0.5;
        });

        $('#oscStopButtonI').click(function () {
            jam.server.removeLastSoundI(sessionIdString);
        });

        /*----------------------------------------------------------------------------
        ** LFO I Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        // event listener activation LFO 
        $('#LfoIActive').change(
            function () {
                if ($('#LfoIActive').is(':checked')) {
                    jam.server.activateLFOI(sessionIdString, $('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val());

                } else {
                    jam.server.deactivateLFOI(sessionIdString);
                }
            });

        $('#LfoIType').change(
           function () {
               if ($('#LfoIActive').is(':checked')) {
                   jam.server.deactivateLFOI(sessionIdString);
                   setTimeout(function () { jam.server.activateLFOI(sessionIdString, $('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val()) }, 0);
               }
           });

        $('#LfoIFrequency').change(
          function () {
              if ($('#LfoIActive').is(':checked')) {
                  jam.server.deactivateLFOI(sessionIdString);
                  setTimeout(function () { jam.server.activateLFOI(sessionIdString, $('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val()); }, 0);
              }
          });

        $('#LfoIScale').change(
       function () {
           if ($('#LfoIActive').is(':checked')) {
               jam.server.deactivateLFOI(sessionIdString);
               setTimeout(function () { jam.server.activateLFOI(sessionIdString, $('#LfoIFrequency').val(), $('#LfoIScale').val(), $('#LfoIType').val()); }, 10);
           }
       });

        /*----------------------------------------------------------------------------
        ** BiquadFilter I Event Listeners 
        ** ---------------------------------------------------------------------------
        */
        // event listener type box
        $('#filterTypeOne').change(function () {
            jam.server.changeFilterTypeOne(sessionIdString, $('#filterTypeOne').val());
        });

        // event listener frequency field
        $('#filterFrequencyOne').change(function () {
            jam.server.changeFilterFrequencyOne(sessionIdString, $('#filterFrequencyOne').val());
        });

        // event listener Q field
        $('#filterQOne').change(function () {
            jam.server.changeFilterQOne(sessionIdString, $('#filterQOne').val());
        });

        // event listener gain field
        $('#filterGainOne').change(function () {
            jam.server.changeFilterGainOne(sessionIdString, $('#filterGainOne').val());
        });

        /*----------------------------------------------------------------------------
        ** Delay I Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        // time
        $('#delayITime').change(function () {
            jam.server.changeDelayITime(sessionIdString, $('#delayITime').val());
        });

        // dryWetRatio
        $('#delayIDryWet').change(function () {
            jam.server.changeDelayIDryWet(sessionIdString, $('#delayIDryWet').val());
        });

        /*----------------------------------------------------------------------------
        ** Oscillator II Event Listeners 
        ** ---------------------------------------------------------------------------
        */
        $('#oscStartButtonII').click(function () {
            console.log("oscStartButtonII clicked");
            jam.server.stackASoundWaveII(sessionIdString, $('#OscIIFrequency').val(), $('#oscIIType').val(), true); // standard start volume is 0.5
        });

        $('#oscStopButtonII').click(function () {
            console.log("oscStopButtonII clicked");
            jam.server.removeLastSoundII(sessionIdString);
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
                    jam.server.activateLFOII(sessionIdString, $('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val());

                } else {
                    console.log("LFOStopButtonII clicked");
                    jam.server.deactivateLFOII(sessionIdString);
                }
            });

        $('#LfoIIType').change(
           function () {
               var lfoType = $('#LfoIIType').find("option:selected").attr("value");

               if ($('#LfoIIActive').is(':checked')) {
                   jam.server.deactivateLFOII(sessionIdString);
                   setTimeout(function () { jam.server.activateLFOII(sessionIdString, $('#LfoIIFrequency').val(), $('#LfoIIScale').val(), lfoType) }, 10);
                   console.log("LFO type II is changed, while activated");
               } else {
                   console.log($('#LfoIIActive').is(':checked'));
                   console.log("LFO type II is changed, but was not activated");

               }
           });

        $('#LfoIIFrequency').change(
          function () {
              if ($('#LfoIIActive').is(':checked')) {
                  jam.server.deactivateLFOII(sessionIdString);
                  setTimeout(function () { jam.server.activateLFOII(sessionIdString, $('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val()); }, 10);
                  console.log("LFO freq II is changed, while activated");
              }
          });

        $('#LfoIIScale').change(
       function () {
           if ($('#LfoIIActive').is(':checked')) {
               jam.server.deactivateLFOII(sessionIdString);
               setTimeout(function () { jam.server.activateLFOII(sessionIdString, $('#LfoIIFrequency').val(), $('#LfoIIScale').val(), $('#LfoIIType').val()); }, 10);
               console.log("LFO scale II is changed, while activated");
           }
       });

        /*----------------------------------------------------------------------------
        ** BiquadFIlter II Event Listeners 
        ** ---------------------------------------------------------------------------
        */

        // event listener type box
        $('#filterTypeTwo').change(function () {
            jam.server.changeFilterTypeTwo(sessionIdString, $('#filterTypeTwo').val());
        });

        // event listener frequency field
        $('#filterFrequencyTwo').change(function () {
            jam.server.changeFilterFrequencyTwo(sessionIdString, $('#filterFrequencyTwo').val());
        });

        // event listener Q field
        $('#filterQTwo').change(function () {
            jam.server.changeFilterQTwo(sessionIdString, $('#filterQTwo').val());
        });

        // event listener gain field
        $('#filterGainTwo').change(function () {
            jam.server.changeFilterGainTwo(sessionIdString, $('#filterGainTwo').val());
        });

        /*----------------------------------------------------------------------------
        ** Delay II Event Listeners 
        ** ---------------------------------------------------------------------------
        */
        // time
        $('#delayIITime').change(function () {
            jam.server.changeDelayIITime(sessionIdString, $('#delayIITime').val());
        });

        // dryWetRatio
        $('#delayIIDryWet').change(function () {
            jam.server.changeDelayIIDryWet(sessionIdString, $('#delayIIDryWet').val());
        });

        /* -------------------------------------------------------------------------------------
        ** WaveBucket waves are listened for after a DOM mutation. Because the bucket is created 
        ** dynamically, a mutation listener must be implemented first. Currently every bucket can
        ** allow volume manipulation up until 10 waves/bucket
        ** -------------------------------------------------------------------------------------
        */

        var mutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        var observer = new mutationObserver(function () {

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
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 0);
            });

            $('#volumeFaderoscI1').change(function () {
                var volume = $('#volumeFaderoscI1').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 1);
            });

            $('#volumeFaderoscI2').change(function () {
                var volume = $('#volumeFaderoscI2').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 2);
            });

            $('#volumeFaderoscI3').change(function () {
                var volume = $('#volumeFaderoscI3').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 3);
            });

            $('#volumeFaderoscI4').change(function () {
                var volume = $('#volumeFaderoscI4').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 4);
            });

            $('#volumeFaderoscI5').change(function () {
                var volume = $('#volumeFaderoscI5').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 5);
            });

            $('#volumeFaderoscI6').change(function () {
                var volume = $('#volumeFaderoscI6').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 6);
            });

            $('#volumeFaderoscI7').change(function () {
                var volume = $('#volumeFaderoscI7').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 7);
            });

            $('#volumeFaderoscI8').change(function () {
                var volume = $('#volumeFaderoscI8').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 8);
            });

            $('#volumeFaderoscI9').change(function () {
                var volume = $('#volumeFaderoscI9').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 0, 9);
            });

            /* wavebucket I removeSymbolEvent listeners */
            $('#removeImageoscI0').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 0);
            });

            $('#removeImageoscI1').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 1);
            });

            $('#removeImageoscI2').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 2);
            });

            $('#removeImageoscI3').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 3);
            });

            $('#removeImageoscI4').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 4);
            });

            $('#removeImageoscI5').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 5);
            });

            $('#removeImageoscI6').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 6);
            });

            $('#removeImageoscI7').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 7);
            });

            $('#removeImageoscI8').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 8);
            });

            $('#removeImageoscI9').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 0, 9);
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
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 0);
            });

            $('#volumeFaderoscII1').change(function () {
                var volume = $('#volumeFaderoscII1').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 1);
            });

            $('#volumeFaderoscII2').change(function () {
                var volume = $('#volumeFaderoscII2').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 2);
            });

            $('#volumeFaderoscII3').change(function () {
                var volume = $('#volumeFaderoscII3').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 3);
            });

            $('#volumeFaderoscII4').change(function () {
                var volume = $('#volumeFaderoscII4').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 4);
            });

            $('#volumeFaderoscII5').change(function () {
                var volume = $('#volumeFaderoscII5').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 5);
            });

            $('#volumeFaderoscII6').change(function () {
                var volume = $('#volumeFaderoscII6').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 6);
            });

            $('#volumeFaderoscII7').change(function () {
                var volume = $('#volumeFaderoscII7').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 7);
            });

            $('#volumeFaderoscII8').change(function () {
                var volume = $('#volumeFaderoscII8').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 8);
            });

            $('#volumeFaderoscII9').change(function () {
                var volume = $('#volumeFaderoscII9').val() / 100;
                jam.server.adjustWaveVolume(sessionIdString, volume, 1, 9);
            });

            /* wavebucket II removeSymbolEvent listeners */
            $('#removeImageoscII0').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 0);
            });

            $('#removeImageoscII1').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 1);
            });

            $('#removeImageoscII2').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 2);
            });

            $('#removeImageoscII3').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 3);
            });

            $('#removeImageoscII4').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 4);
            });

            $('#removeImageoscII5').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 5);
            });

            $('#removeImageoscII6').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 6);
            });

            $('#removeImageoscII7').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 7);
            });

            $('#removeImageoscII8').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 8);
            });

            $('#removeImageoscII9').click(function () {
                jam.server.removeWaveByIndex(sessionIdString, 1, 9);
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