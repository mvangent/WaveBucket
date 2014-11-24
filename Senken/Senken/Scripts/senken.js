var buttonelement;

            window.onload = function () {
                
                buttonelement = document.getElementById("sineButton");
                buttonelement.addEventListener("click", function () { makeSineWave(getSineWaveFrequency()) })

            }

            var contextClass = (window.AudioContext ||
                    window.webkitAudioContext ||
                    window.mozAudioContext ||
                    window.oAudioContext ||
                    window.msAudioContext);
            if (contextClass) {
                // Web Audio API is available.
                var context = new contextClass();
            } else {
                // Web Audio API is not available. Ask the user to use a supported browser.
                alert("no webapi was found for your browser")
            }

            var osc;

            function makeSineWave(sineFrequency) {
                // Create oscillator.
                var osc = context.createOscillator();
                osc.frequency.value = sineFrequency;

                osc.connect(context.destination);


                // Start immediately, and stop in 2 seconds.
                osc.start(0);
                //osc.stop(context.currentTime + DURATION);

            }

            function getSineWaveFrequency() {
                return document.getElementById("sineFreq").value

            }


            // event listeners 

