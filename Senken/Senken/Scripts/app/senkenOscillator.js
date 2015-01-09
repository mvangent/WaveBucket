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
    var selfOsc = this;

    var oscName = name;

    // member variables oscillatorNode
    this.osc = context.createOscillator();
    selfOsc.osc.frequency.value = 220;
    this.oscTypeEnum = 0; // enums: 0, 1, 2, 3 are valid. They correspond with sine, square, triangle and sawtooth.
    this.gainNode = context.createGain();

    


    /* wavebucket */
    this.wavebucket = new WaveBucket(context, oscName, selfOsc);
    this.lastWaveRemoved = true;
    this.bucketLoaded = false;
    this.currentFreeIndexInBucket = 0;

    

    

    


    /* Method: this.waveGenerator = function (int frequency, string oscType, int waveBucketIndex, bool updateConnectionsBool) : Oscillation
    ------------------------------------------------------------------------------------------------------------------------
    IMPORTANT => this function has an dependency outside the object: global callbackfunction updateWiringCallback() is called  everytime
    a newly generated wave is added. Through this functionality the wavebucket feature becomes possible in an object oriented
    setting. The dependency is activated by setting the third parameter to true, otherwise generated sound won't stack when
    the wavebucket is loaded, and instead only the last sound is generated. 
    -----------------------------------------------------------------------------------------------------------------------*/

    this.waveGenerator = function (frequency, oscType, volume, waveBucketIndex, updateConnections) {

        console.log("waveGenerator reached");

        selfOsc.osc = context.createOscillator();
        selfOsc.osc.type = oscType;
        selfOsc.osc.frequency.value = frequency;
        
        /*var gainForWaveNode = context.createGain();
        gainForWaveNode.gain.value = volume;
        console.log("gainForWaveNode gain value = " + gainForWaveNode.gain.value);
        selfOsc.osc.connect(gainForWaveNode);
        gainForWaveNode.gain.connect(selfOsc.gainNode.gain);

        */

        selfOsc.wavebucket.changeVolume(waveBucketIndex, volume);


        selfOsc.osc.start(context.currentTime);
        //osc.stop(context.currentTime + DURATION);
        console.log("Osc I: started at freq " + selfOsc.osc.frequency.value + ", with shape " + selfOsc.osc.type + " with volume: " + volume);

        selfOsc.osc.connect(selfOsc.wavebucket.gainNode(waveBucketIndex));

        /* GLOBAL DEPENDENCY TO MAKE WAVEBUCKET POSSIBLE BY UPDATING THE CONNECTIONS OF ALL OBJECTS*/
        if (updateConnections === true) {
            console.log("update connections called");
            updateWiringCallBack();
        }

        // add wave to the bucket
        return selfOsc.osc;
    };

    /* Method: this.changeWaveVolume = function (int index, int volume): void  
   -----------------------------------------------------------------------------------------------------------
   ** Changes wave's volume from wavebucket by index
   */

    this.changeWaveVolume = function (index, volume) { // set index
        console.log("changeVolume on Oscillator volume = " + volume);
        selfOsc.freezeBucket();
        selfOsc.wavebucket.changeVolume(index, volume);
        selfOsc.startBucket();
    };


    /* Method: this.removeWave = function (int index): void  
    -----------------------------------------------------------------------------------------------------------
    ** Removes wave from wavebucket by index
    */

    this.removeWave = function (index) { // set index

        selfOsc.freezeBucket();
        selfOsc.wavebucket.remove(index);
        selfOsc.startBucket();
    };

    /* Method: this.removeWave = function (): bool  
   ----------------------------------------------------------------------------------------------------------------
   ** Removes last wave added to the wavebucket. This function creates a better performance than removing by index, 
   ** because no reload and connectionUpdate is needed. 
   */

    this.removeLastWave = function () {
        if (!selfOsc.lastWaveRemoved) {
            selfOsc.osc.stop();
            selfOsc.wavebucket.removeLastWave();
            selfOsc.lastWaveRemoved = true;

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

    this.stackSoundWave = function (frequency, oscTypeEnum, updateConnections) {

        console.log("stack soundwave reached");

        /*!!!! */   selfOsc.oscTypeEnum = oscTypeEnum;

        var volume = 0.5;

        var oscType = selfOsc.translateOscTypeEnumToString(selfOsc.oscTypeEnum);

        console.log("osctype is NOWWW: " + oscType);

        var waveBucketIndex = selfOsc.currentFreeIndexInBucket;

        if (endController.isActive()) {
            selfOsc.wavebucket.addWave(selfOsc.waveGenerator(frequency, oscType, volume, waveBucketIndex, updateConnections));
            selfOsc.currentFreeIndexInBucket += 1;
            console.log("currentFreeBucketIndex = " + selfOsc.currentFreeIndexInBucket);
            selfOsc.lastWaveRemoved = false;
        }
    };


    /* Method: this.translateOscTypeEnumToString = function (int oscTypeEnum): string oscType  
     -----------------------------------------------------------------------------------------------------------
    ** Translates enum of OscType into the corresponding string. Default value is sine. 
    */

    this.translateOscTypeEnumToString = function (oscTypeEnum) {

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

    this.translateStringToTypeEnum = function (type) {

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

    this.startBucket = function () {

        if (!selfOsc.wavebucket.isActive()) {

            var arrayLength = selfOsc.wavebucket.getSize();
            console.log(arrayLength);

            var i;

            for (i = 0; i < arrayLength; i++) {
                console.log("i = " + i);
                selfOsc.wavebucket.addWave(selfOsc.waveGenerator(selfOsc.wavebucket.select(i).frequency.value, selfOsc.wavebucket.select(i).type, selfOsc.wavebucket.readVolumeByIndex(i), i, true)); // i is wavebucket index

                selfOsc.currentFreeIndexInBucket += 1;
                console.log("currentFreeBucketIndex = " + selfOsc.currentFreeIndexInBucket);
            }

            for (i = 0; i < arrayLength; i++) {
                selfOsc.wavebucket.removeFirstElement();
            }

            selfOsc.wavebucket.activate();

            return true;
        }
    };


    /* Method: this.freezeBucket = function (): bool  
    -----------------------------------------------------------------------------------------------------------
    ** Calls the stop method on every Oscillation Node in the wavebucket and checks if the wavebucket is 
    ** active. This all happens on the client side.
    */

    this.freezeBucket = function () {

        if (selfOsc.wavebucket.isActive()) {

            console.log("stop function wavebucket activated,");

            for (var i = 0; i < selfOsc.wavebucket.getSize() ; i++) {
                console.log(i + " " + typeof selfOsc.wavebucket.select(i));
                selfOsc.wavebucket.select(i).stop();
            }

            console.log(selfOsc.wavebucket.isActive());

            selfOsc.wavebucket.deactivate();

            console.log(selfOsc.wavebucket.isActive());

            selfOsc.currentFreeIndexInBucket = 0;
            console.log("currentFreeBucketIndex = " + selfOsc.currentFreeIndexInBucket);

            return true;
        }
    };


    /* Method: this.saveWaveBucket = function (): bool  
   -----------------------------------------------------------------------------------------------------------
   ** Saves wave bucket to hidden field. 
   ** !! SET INPUT FOR FIELD NAME !! 
   */

    this.saveWaveBucket = function (hiddenBucketId) {

        console.log("save bucket reached on Osc");

        selfOsc.wavebucket.saveBucket(hiddenBucketId);

        return true;
    }


    /* Method: this.loadWaveBucket = function (): bool  
  -----------------------------------------------------------------------------------------------------------
  ** Loads wave bucket from hidden field value that is loaded from the server side
  ** !! SET INPUT FOR FIELD NAME !! 
  */

    this.loadWaveBucket = function (hiddenBucketId) {

        console.log("load bucket reached on Osc but not loading: ");

        if (!selfOsc.bucketLoaded) {

            console.log("load bucket reached on Osc and starts loading: ");

            var bucketString;

            bucketString = selfOsc.wavebucket.loadBucket(hiddenBucketId);

            console.log(bucketString);

            var oscsArray = bucketString.split(",");

            console.log("Oscillation Array in loadWaveBucket method: "+  oscsArray);

           // if (oscsArray[0].length > 4) { // check if the first element in the array is really an array carrying oscillation info

                for (var i = 0; i < oscsArray.length - 1; i++) {

                    var oscillationInStrings;

                    oscillationInStrings = oscsArray[i].split(" ");

                    console.log("load wave in loadbucket function");

                    var waveBucketIndex = selfOsc.currentFreeIndexInBucket;

                    selfOsc.wavebucket.addWave(selfOsc.waveGenerator(oscillationInStrings[0], selfOsc.translateStringToTypeEnum(oscillationInStrings[1]), oscillationInStrings[2], waveBucketIndex, true));

                    selfOsc.currentFreeIndexInBucket += 1;
                    console.log("currentFreeBucketIndex = " + selfOsc.currentFreeIndexInBucket);

                    selfOsc.lastWaveRemoved = false;
                                        
                }

       //     }

            selfOsc.bucketLoaded = true; 
        }

    return true;

    }

    // Method: outputTo(destination)
    this.outputTo = function (destination) {
        console.log("osc output refreshed");

        // selfOsc.osc.connect(selfOsc.gainNode);
        selfOsc.gainNode.connect(destination);

        return true;
    }

    // Method: generatorOutputTo(destination)
    this.generatorOutputTo = function (destination) {
        console.log("generator output reached to destination: " + destination);

        selfOsc.osc.connect(destination);
        
        return true;
    }

    // Method: gainNodeInputForLfo() -> return gainNode.gain
    this.gainNodeInputForLfo = function () {
        return selfOsc.gainNode.gain;
    }

    // Method: gainNodeInputForWaveBucket() -> return gainNode
    this.gainNodeInputForWaveBucket = function () {
        return selfOsc.gainNode;
    }

    // Method: updateWaveBucketDisplay() -> bucketListId : void
    this.updateWaveBucketDisplay = function(bucketListId) {
        
        selfOsc.wavebucket.updateDisplay(bucketListId);
        

    }

    // Method: updateDisplay(Oscillator)
    this.updateDisplay = function (oscFreqId, oscTypeId) {

        console.log("update Display oscillator reached");

        // set field value to last value
        $(oscFreqId).val(selfOsc.osc.frequency.value);
        $(oscTypeId).val(selfOsc.oscTypeEnum);

    }
    
}
