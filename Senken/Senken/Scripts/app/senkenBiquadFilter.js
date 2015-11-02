/*------------------------------------------------------------------------------------------------------
** Object: BiQuadFilter(context) : prototype 
--------------------------------------------------------------------------------------------------------
** This filter consists of the following 8 types[enums]: "lowpass"[0], "highpass"[1], "bandpass"[2], "lowshelf"[3],
** "highshelf"[4], "peaking"[5], "notch"[6],"allpass"[7]. Frequency and q can be manipulated in all types. 
**  Gain except for lowpass, highpass and bandpass. 
*/

function BiquadFilter(context) {
    this.biQuadFilter = context.createBiquadFilter();
    
    // private
    var typeEnum = 0;
    var self = this;

    // public 
    self.setType = function (enumType) {
        typeEnum = enumType;
        self.biQuadFilter.type = self.translateTypeEnumToString(enumType);
        console.log(self.biQuadFilter.type);
    }

    self.readType = function () {
        return self.biQuadFilter.type;
    }

    self.translateTypeEnumToString = function (typeEnum) {
       switch (parseInt(typeEnum)) {
            case 0: return "lowpass";
            case 1: return "highpass";
            case 2: return "bandpass";
            case 3: return "lowshelf";
            case 4: return "highshelf";
            case 5: return "peaking";
            case 6: return "notch";
            case 7: return "allpass";
            default: return "lowpass";
        }
    }

    self.setFrequency = function (frequency) {
        self.biQuadFilter.frequency.value = frequency;
    }

    self.readFrequency = function () {
        return self.biQuadFilter.frequency.value;
    }

    self.setQ = function (q) {
        self.biQuadFilter.Q.value = q;
    }

    self.readQ = function () {
        return self.biQuadFilter.Q.value;
    }

    self.setGain = function (gain) {
        self.biQuadFilter.gain.value = gain;
    }

    self.readGain = function () {
        return self.biQuadFilter.gain.value;
    }

    // connector methods: outputTo
    self.outputTo = function (destination) {
        self.biQuadFilter.connect(destination);
        return true;
    }

    // : input
    self.input = function () {
        return self.biQuadFilter;
    }

    // displayMethod 
    self.updateDisplay = function (filterTypeId, filterFrequencyId, filterQId, filterGainId) {
        $(filterTypeId).val(typeEnum);
        $(filterFrequencyId).val(self.biQuadFilter.frequency.value);
        $(filterQId).val(self.biQuadFilter.Q.value);
        $(filterGainId).val(self.biQuadFilter.gain.value);
    }

}


