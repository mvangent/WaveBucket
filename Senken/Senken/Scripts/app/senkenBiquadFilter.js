/*------------------------------------------------------------------------------------------------------
** Object: BiQuadFilter(context) : prototype 
--------------------------------------------------------------------------------------------------------
** This filter consists of the following 8 types[enums]: "lowpass"[0], "highpass"[1], "bandpass"[2], "lowshelf"[3],
** "highshelf"[4], "peaking"[5], "notch"[6],"allpass"[7]. Frequency and q can be manipulated in all types. 
**  Gain except for lowpass, highpass and bandpass. 
*/

function BiquadFilter(context) {
    this.biQuadFilter = context.createBiquadFilter();
    console.log("filter created");

    var typeEnum = 0;

    var self = this;

    this.setType = function (enumType) {

        typeEnum = enumType;

        self.biQuadFilter.type = self.translateTypeEnumToString(enumType);
        console.log(self.biQuadFilter.type);
    }

    this.readType = function () {
        return self.biQuadFilter.type;
    }

    this.translateTypeEnumToString = function (typeEnum) {

        console.log("biQuadFilter type: " + typeof (typeEnum));

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

    this.setFrequency = function (frequency) {
        self.biQuadFilter.frequency.value = frequency;
    }

    this.readFrequency = function () {
        return self.biQuadFilter.frequency.value;
    }

    this.setQ = function (q) {
        self.biQuadFilter.Q.value = q;
    }

    this.readQ = function () {
        return self.biQuadFilter.Q.value;
    }

    this.setGain = function (gain) {
        self.biQuadFilter.gain.value = gain;
    }

    this.readGain = function () {
        return self.biQuadFilter.gain.value;
    }

    // connector methods: outputTo
    this.outputTo = function (destination) {
        self.biQuadFilter.connect(destination);

        return true;
    }

    // : input
    this.input = function () {
        return self.biQuadFilter;
    }

    // displayMethod 
    this.updateDisplay = function () {

        $('#filterTypeOne').val(typeEnum);

        $('#filterFrequencyOne').val(self.biQuadFilter.frequency.value);

        $('#filterQOne').val(self.biQuadFilter.Q.value);

        $('#filterGainOne').val(self.biQuadFilter.gain.value);
    }

}


