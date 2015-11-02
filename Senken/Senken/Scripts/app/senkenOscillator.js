/*------------------------------------------------------------------------------------------------------------
** OBJECT: Oscillator(ContextClass, MasterController) : prototype                                           **
--------------------------------------------------------------------------------------------------------------
** UML: has a WaveBucket, references MasterController(object) and AudioContextClass                         **
** This object is responsible for generating sine, square, triangle and sawtooths waveforms and saves the   **
** generatad sounds in a wavebucket                                                                         **
--------------------------------------------------------------------------------------------------------------
*/
function Oscillator(context, endController, name) {
    // self reference
    var self = this;

    // private
    var oscName = name;

    // member variables oscillatorNode
    self.osc = context.createOscillator();
    self.osc.frequency.value = 220;
    self.oscTypeEnum = 0; // enums: 0, 1, 2, 3 are valid. They correspond with sine, square, triangle and sawtooth.
    self.gainNode = context.createGain();

    /* wavebucket */
    self.wavebucket = new WaveBucket(context, oscName, self);
    self.lastWaveRemoved = true;
    self.bucketLoaded = false;
    self.currentFreeIndexInBucket = 0;

    /* Method: self.waveGenerator = function (int frequency, string oscType, int volume, int waveBucketIndex, bool updateConnectionsBool) : Oscillation
    ------------------------------------------------------------------------------------------------------------------------
    IMPORTANT => this function has an dependency outside the object: global callbackfunction updateWiringCallback() is called  everytime
    a newly generated wave is added. Through this functionality the wavebucket feature becomes possible in an object oriented
    setting. The dependency is activated by setting the third parameter to true, otherwise generated sound won't stack when
    the wavebucket is loaded, and instead only the last sound is generated. 
    -----------------------------------------------------------------------------------------------------------------------*/
    self.waveGenerator = function (frequency, oscType, volume, waveBucketIndex, updateConnections) {
        self.osc = context.createOscillator();
        self.osc.type = oscType;
        self.osc.frequency.value = frequency;
        self.wavebucket.changeVolume(waveBucketIndex, volume);

        self.osc.start(context.currentTime);
        self.osc.connect(self.wavebucket.gainNode(waveBucketIndex));
        self.wavebucket.changeVolume(waveBucketIndex, volume);

        /* GLOBAL DEPENDENCY TO MAKE WAVEBUCKET POSSIBLE BY UPDATING THE CONNECTIONS OF ALL OBJECTS*/
        if (updateConnections === true) {
            updateWiringCallBack();
        }

        self.currentFreeIndexInBucket += 1;

        // add wave to the bucket
        return self.osc;
    };

    /* Method: this.changeWaveVolume = function (int index, int volume): void  
   -----------------------------------------------------------------------------------------------------------
   ** Changes wave's volume from wavebucket by index
   */
    self.changeWaveVolume = function (index, volume) { // set index
        self.wavebucket.changeVolume(index, volume);
    };

    /* Method: this.removeWave = function (int index): void  
    -----------------------------------------------------------------------------------------------------------
    ** Removes wave from wavebucket by index. 
    */

    self.removeWave = function (index) { // set index
        self.wavebucket.remove(index);
        self.currentFreeIndexInBucket -= 1;
    };

    /* Method: this.removeWave = function (): bool  
   ----------------------------------------------------------------------------------------------------------------
   ** Removes last wave added to the wavebucket. This function creates a better performance than removing by index, 
   ** because no reload and connectionUpdate is needed. 
   */
    self.removeLastWave = function () {
        if (!self.lastWaveRemoved) {
            self.osc.stop();
            self.wavebucket.removeLastWave();
            self.lastWaveRemoved = true;
            self.currentFreeIndexInBucket -= 1;
            return true;
        } else {
            return false;
        }
    }

    /* Method: this.stackSoundWave = function (int frequency, int oscTypeEnum, int volume, bool updateConnections): void  
    ----------------------------------------------------------------------------------------------------------------------
    ** Translates the enum of Oscillation Type into a string. Calls WaveGenerator while adding the the generated 
    ** oscillation to the wave bucket. Checks if it can perform this action, by making a call to IsActive() of 
    ** the the mastercontroller object. 
    */
    self.stackSoundWave = function (frequency, oscTypeEnum, updateConnections) {
        if (self.currentFreeIndexInBucket < 10) {
            self.oscTypeEnum = oscTypeEnum;
            var volume = 0.5;
            var oscType = self.translateOscTypeEnumToString(self.oscTypeEnum);
            var waveBucketIndex = self.currentFreeIndexInBucket;

            if (endController.isActive()) {
                self.wavebucket.addWave(self.waveGenerator(frequency, oscType, volume, waveBucketIndex, updateConnections));
                self.lastWaveRemoved = false;
            }
        } else {
            alert("maximum amount of oscillations on this bucket has been reached");
        }
    };

    /* Method: this.translateOscTypeEnumToString = function (int oscTypeEnum): string oscType  
     -----------------------------------------------------------------------------------------------------------
    ** Translates enum of OscType into the corresponding string. Default value is sine. 
    */
    self.translateOscTypeEnumToString = function (oscTypeEnum) {
        switch (parseInt(oscTypeEnum)) {
            case 0: return "sine";
            case 1: return "square";
            case 2: return "triangle";
            case 3: return "sawtooth";
            default: return "sine";
        }
    }

    /* Method: this.translateStringToTypeEnum = function (string type): enum oscType  
    -----------------------------------------------------------------------------------------------------------
   ** Translates string of of OscType into the corresponding enum. Default value is sine. 
   */

    self.translateStringToTypeEnum = function (type) {
        switch (type) {
            case "sine": return 0;
            case "square": return 1;
            case "triangle": return 2;
            case "sawtooth": return 3;
            default: return 0;
        }
    };


    /* Method: this.startBucket = function (): bool  
     -----------------------------------------------------------------------------------------------------------
    ** Starts up the oscillations present in the wavebucket after they have been frozen on the client side.
    */
    self.startBucket = function () {
        if (!self.wavebucket.isActive()) {
            var arrayLength = self.wavebucket.getSize();
            console.log(arrayLength);
            var i;
            for (i = 0; i < arrayLength; i++) {
                console.log("i = " + i);
                self.wavebucket.addWave(self.waveGenerator(self.wavebucket.select(i).frequency.value, self.wavebucket.select(i).type, self.wavebucket.readVolumeByIndex(i), i, true)); // i is wavebucket index
            }

            for (i = 0; i < arrayLength; i++) {
                self.wavebucket.removeFirstElement();
            }
            self.wavebucket.activate();

            return true;
        }
        return false;
    };


    /* Method: this.freezeBucket = function (): bool  
    -----------------------------------------------------------------------------------------------------------
    ** Calls the stop method on every Oscillation Node in the wavebucket and checks if the wavebucket is 
    ** active. This all happens on the client side.
    */
    self.freezeBucket = function () {
        if (self.wavebucket.isActive()) {
            for (var i = 0; i < self.wavebucket.getSize() ; i++) {
                console.log(i + " " + typeof self.wavebucket.select(i));
                self.wavebucket.select(i).stop();
            }
            self.wavebucket.deactivate();
            self.currentFreeIndexInBucket = 0;
            return true;
        }
        return false;
    };


    /* Method: self.saveWaveBucket = function (): bool  
   -----------------------------------------------------------------------------------------------------------
   ** Saves wave bucket to hidden field. 
   */
    self.saveWaveBucket = function (hiddenBucketId) {
        var oscillationsString = self.wavebucket.oscillationsToString();
        $(hiddenBucketId).val(oscillationsString);
        return true;
    }


    /* Method: self.loadWaveBucket = function (): bool  
  -----------------------------------------------------------------------------------------------------------
  ** Loads wave bucket from hidden field value that is loaded from the server side
  ** !! SET INPUT FOR FIELD NAME !! 
  */

    self.loadWaveBucket = function (hiddenBucketId) {
        if (!self.bucketLoaded) {
            var bucketString = $(hiddenBucketId).attr('value');
            var oscsArray = bucketString.split(",");

            for (var i = 0; i < oscsArray.length - 1; i++) {
                var waveCharacteristics = oscsArray[i].split(" ");
                var waveBucketIndex = self.currentFreeIndexInBucket;
                var frequency = waveCharacteristics[0];
                var waveForm = waveCharacteristics[1];
                var waveVolume = waveCharacteristics[2];

                self.wavebucket.addWave(self.waveGenerator(frequency, waveForm, waveVolume, waveBucketIndex, true));
                self.lastWaveRemoved = false;
            }
            self.bucketLoaded = true;
        }
        return true;
    }

    // Method: outputTo(destination)
    self.outputTo = function (destination) {
        self.gainNode.connect(destination);
        return true;
    }


    // Method: gainNodeInputForLfo() -> return gainNode.gain
    self.gainNodeInputForLfo = function () {
        return self.gainNode.gain;
    }

    // Method: gainNodeInputForWaveBucket() -> return gainNode
    self.gainNodeInputForWaveBucket = function () {
        return self.gainNode;
    }

    // Method: updateWaveBucketDisplay() -> bucketListId : void
    self.updateWaveBucketDisplay = function (bucketListId) {
        self.wavebucket.updateDisplay(bucketListId);
    }

    // Method: updateDisplay(Oscillator)
    self.updateDisplay = function (oscFreqId, oscTypeId) {
        // set field value to last value
        $(oscFreqId).val(self.osc.frequency.value);
        $(oscTypeId).val(self.oscTypeEnum);
    }
}
