

/*------------------------------------------------------------------------------------------------------
** Object: Lfo(context) : prototype 
--------------------------------------------------------------------------------------------------------
** This Lfo is can be connected to the gainNode of an oscillator and manipulates
*/

function Lfo(context) {

    var selfLfo = this;

    this.lfo;
    selfLfo.lfo = context.createOscillator();
    selfLfo.lfo.frequency.value = 1;
    this.gain = context.createGain();
    this.oscTypeEnum = 0; // enums: 0, 1, 2, 3 are valid. They correspond with sine, square, triangle and sawtooth.
    this.lfoActive = false;


    // var gain = context.createGain();


    /* Method: this.lfoActivator = function (int lfoFreq, int scale, int lfoTypeEnum): void  
    -----------------------------------------------------------------------------------------------------------
    ** Activates Lfo's frequency, scale and shape. Sets member variable lfoActive to 'true'.
    */

    this.lfoActivator = function (lfoFreq, scale, lfoTypeEnum) {

        // Create oscillator.
        

           

            if (!selfLfo.lfoActive) {
                console.log("lfo started");
                selfLfo.lfo = context.createOscillator();
                selfLfo.lfo.type = selfLfo.translateLfoTypeEnumToString(lfoTypeEnum);
                selfLfo.lfo.frequency.value = lfoFreq;
                selfLfo.gain = context.createGain();
                selfLfo.gain.gain.value = scale;

                selfLfo.lfo.start(context.currentTime);

                selfLfo.lfoActive = true;

                console.log("lfo added");
            }
        


    };

    /* Method: this.lfoDeactivator = function (): void  
    -----------------------------------------------------------------------------------------------------------
    ** Deactivates Lfo and sets member variable lfoActive to 'false'.  
    */

    this.lfoDeactivator = function () {
        selfLfo.lfoActive = false;
        selfLfo.lfo.stop(context.currentTime);
        
        console.log("lfo stopped");
    };

    /* Method: this.translateLfoTypeEnumToString = function (int lfoTypeEnum): string lfoType  
    -----------------------------------------------------------------------------------------------------------
    ** Translates enum of lfoType into the corresponding string. Default value is sine. 
    */

    this.translateLfoTypeEnumToString = function (lfoTypeEnum) {

        console.log("oscType: " + typeof (lfoTypeEnum));

        switch (parseInt(lfoTypeEnum)) {
            case 0: return "sine";
            case 1: return "square";
            case 2: return "triangle";
            case 3: return "sawtooth";
            default: return "sine";
        }
    }

    this.readFrequency = function () {
        return selfLfo.lfo.frequency.value;
    }

    this.readScale = function () {
        return selfLfo.gain.gain.value;
    }

    this.readType = function () {
        return selfLfo.oscTypeEnum;
    }

    // (gain)OutputTo
    this.outputTo = function (destination) {
        console.log("lfo output refreshed");

        selfLfo.lfo.connect(selfLfo.gain);
        selfLfo.gain.connect(destination);

        return true;

    }

    this.updateDisplay = function (lfoFreqId, lfoScaleId, lfoTypeId) {
        $(lfoFreqId).val(selfLfo.lfo.frequency.value);
        $(lfoScaleId).val(selfLfo.gain.gain.value);
        $(lfoTypeId).val(selfLfo.oscTypeEnum);
    }


}
