/*------------------------------------------------------------------------------------------------------------
** OBJECT: Oscillator(ContextClass, MasterController) : prototype                                           **
--------------------------------------------------------------------------------------------------------------
** UML: has a WaveBucket, references MasterController(object) and AudioContextClass                         **
** This object is responsible for generating sine, square, triangle and sawtooths waveforms and saves the   **
** generatad sounds in a wavebucket                                                                         **
--------------------------------------------------------------------------------------------------------------
*/


function Oscillator(context, endController) {

    // member variables oscillatorNode
    this.osc = context.createOscillator();
    this.oscTypeEnum = 0; // enums: 0, 1, 2, 3 are valid. They correspond with sine, square, triangle and sawtooth.
    this.gainNode = context.createGain();

    /* wavebucket */
    this.wavebucket = new WaveBucket();
    this.lastWaveRemoved = true;

    // self reference
    var selfOsc = this;


    /* Method: this.waveGenerator = function (int frequency, string oscType, bool updateConnectionsBool) : Oscillation
    ------------------------------------------------------------------------------------------------------------------------
    IMPORTANT => this function has an dependency outside the object: global callbackfunction updateWiringCallback() is called  everytime
    a newly generated wave is added. Through this functionality the wavebucket feature becomes possible in an object oriented
    setting. The dependency is activated by setting the third parameter to true, otherwise generated sound won't stack when
    the wavebucket is loaded, and instead only the last sound is generated. 
    -----------------------------------------------------------------------------------------------------------------------*/

    this.waveGenerator = function (frequency, oscType, updateConnections) {

        console.log("makeSineWave reached");

        selfOsc.osc = context.createOscillator();
        selfOsc.osc.type = oscType;
        selfOsc.osc.frequency.value = frequency;

        selfOsc.osc.start(context.currentTime);
        //osc.stop(context.currentTime + DURATION);
        console.log("Osc I: started at freq " + selfOsc.osc.frequency.value + ", with shape " + selfOsc.oscType);

        /* GLOBAL DEPENDENCY TO MAKE WAVEBUCKET POSSIBLE BY UPDATING THE CONNECTIONS OF ALL OBJECTS*/
        if (updateConnections === true) {
            console.log("update connections called");
            updateWiringCallBack();
        }

        // add wave to the bucket
        return selfOsc.osc;
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

    /* Method: this.removeWave = function (): void  
   ----------------------------------------------------------------------------------------------------------------
   ** Removes last wave added to the wavebucket. This function creates a better performance than removing by index, 
   ** because no reload and connectionUpdate is needed. 
   */

    this.removeLastWave = function () {
        if (!selfOsc.lastWaveRemoved) {
            selfOsc.osc.stop();
            selfOsc.wavebucket.removeLastWave();
            selfOsc.lastWaveRemoved = true;
        }
    }


    /* Method: this.stackSoundWave = function (int frequency, int oscTypeEnum, bool updateConnections): void  
    ----------------------------------------------------------------------------------------------------------------------
    ** Translates the enum of Oscillation Type into a string. Calls WaveGenerator while adding the the generated 
    ** oscillation to the wave bucket. Checks if it can perform this action, by making a call to IsActive() of 
    ** the the mastercontroller object. 
    */

    this.stackSoundWave = function (frequency, oscTypeEnum, updateConnections) {

        console.log("stack soundwave reached");

        /*!!!! */   selfOsc.oscTypeEnum = oscTypeEnum;

        var oscType = selfOsc.translateOscTypeEnumToString(selfOsc.oscTypeEnum);

        console.log("osctype is NOWWW: " + oscType);

        if (endController.isActive()) {
            selfOsc.wavebucket.addWave(selfOsc.waveGenerator(frequency, oscType, updateConnections));
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



    /* Method: this.startBucket = function (): void  
     -----------------------------------------------------------------------------------------------------------
    ** Starts up the oscillations present in the wavebucket. 
    */

    this.startBucket = function () {

        if (!selfOsc.wavebucket.isActive()) {

            var arrayLength = selfOsc.wavebucket.getSize();
            console.log(arrayLength);

            var i;

            for (i = 0; i < arrayLength; i++) {
                console.log("i = " + i);
                selfOsc.wavebucket.addWave(selfOsc.waveGenerator(selfOsc.wavebucket.select(i).frequency.value, selfOsc.wavebucket.select(i).type, true));
            }

            for (i = 0; i < arrayLength; i++) {
                selfOsc.wavebucket.removeFirstElement();
            }

            selfOsc.wavebucket.activate();
        }
    };


    /* Method: this.freezeBucket = function (): void  
    -----------------------------------------------------------------------------------------------------------
    ** Calls the stop method on every Oscillation Node in the wavebucket and checks if the wavebucket is 
    ** active. 
    */

    this.freezeBucket = function () {

        if (selfOsc.wavebucket.isActive()) {

            console.log("stop function wavebucket activated,");

            for (var i = 0; i < selfOsc.wavebucket.getSize() ; i++) {
                console.log(i + " " + typeof selfOsc.wavebucket.select(i));
                selfOsc.wavebucket.select(i).stop();
            }

            console.log(selfOsc.wavebucket.waveBucketActive);

            selfOsc.wavebucket.deactivate();
        }
    };

    // Method: outputTo(destination)
    this.outputTo = function (destination) {
        console.log("osc output refreshed");

        selfOsc.osc.connect(selfOsc.gainNode);
        selfOsc.gainNode.connect(destination);

        return true;
    }

    // Method: gainNodeInputForLfo() -> return gainNode.gain
    this.gainNodeInputForLfo = function () {
        return selfOsc.gainNode.gain;
    }

    this.updateWaveBucketDisplay = function() {
        
            selfOsc.wavebucket.updateDisplay();
        

    }

    // Method: updateDisplay(Oscillator)
    this.updateDisplay = function () {
        

        // set field value to last value
        $('#sineFreq').val(selfOsc.osc.frequency.value);
        $('#oscIType').val(selfOsc.oscTypeEnum);

    }

}
