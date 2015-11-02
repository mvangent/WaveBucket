/*------------------------------------------------------------------------------------------------------
** Object: Lfo(context) : prototype 
--------------------------------------------------------------------------------------------------------
** This Lfo is can be connected to the gainNode of an oscillator and manipulates
*/

function Lfo(context) {
    // private
    var self = this;

    //initialize
    self.lfo = context.createOscillator();
    self.lfo.frequency.value = 1;
    this.gain = context.createGain();
    this.oscTypeEnum = 0; // enums: 0, 1, 2, 3 are valid. They correspond with sine, square, triangle and sawtooth.
    this.lfoActive = false;

    /* Method: this.lfoActivator = function (int lfoFreq, int scale, int lfoTypeEnum): void  
    -----------------------------------------------------------------------------------------------------------
    ** Activates Lfo's frequency, scale and shape. Sets member variable lfoActive to 'true'.
    */
    self.lfoActivator = function (lfoFreq, scale, lfoTypeEnum) {
        // Create oscillator.
        self.oscTypeEnum = lfoTypeEnum;
        if (!self.lfoActive) {
            self.lfo = context.createOscillator();
            self.lfo.type = self.translateLfoTypeEnumToString(lfoTypeEnum);
            self.lfo.frequency.value = lfoFreq;
            self.gain = context.createGain();
            self.gain.gain.value = scale;
            self.lfo.start(context.currentTime);
            self.lfoActive = true;
        }
    };

    /* Method: this.lfoDeactivator = function (): void  
    -----------------------------------------------------------------------------------------------------------
    ** Deactivates Lfo and sets member variable lfoActive to 'false'.  
    */
    self.lfoDeactivator = function () {
        self.lfoActive = false;
        self.lfo.stop(context.currentTime);
    };

    /* Method: this.translateLfoTypeEnumToString = function (int lfoTypeEnum): string lfoType  
    -----------------------------------------------------------------------------------------------------------
    ** Translates enum of lfoType into the corresponding string. Default value is sine. 
    */
    self.translateLfoTypeEnumToString = function (lfoTypeEnum) {
        switch (parseInt(lfoTypeEnum)) {
            case 0: return "sine";
            case 1: return "square";
            case 2: return "triangle";
            case 3: return "sawtooth";
            default: return "sine";
        }
    }

    self.readFrequency = function () {
        return self.lfo.frequency.value;
    }

    self.readScale = function () {
        return self.gain.gain.value;
    }

    self.readType = function () {
        return self.oscTypeEnum;
    }

    self.isActive = function () {
        return self.lfoActive;
    }

    // (gain)OutputTo
    self.outputTo = function (destination) {
        self.lfo.connect(self.gain);
        self.gain.connect(destination);
        return true;
    }

    self.updateDisplay = function (lfoActive, lfoFreqId, lfoScaleId, lfoTypeId) {
        $(lfoActive).prop('checked', self.lfoActive);
        $(lfoFreqId).val(self.lfo.frequency.value);
        $(lfoScaleId).val(self.gain.gain.value);
        $(lfoTypeId).val(self.oscTypeEnum);
    }
}
