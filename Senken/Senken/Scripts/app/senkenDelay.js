/*------------------------------------------------------------------------------------------------------
** Object: Delay(context) : prototype 
--------------------------------------------------------------------------------------------------------
** This delay is connected to an oscillator. The delay has two parameters. The first being delay time(ms), 
** the second being dry/wet ratio (percentages). 
*/

function Delay(context) {
    this.delay = context.createDelay();
    console.log("filter created");

    var delayTime = 0;  // ms
    var dryWetRatio = 50; // percentage

    var self = this;

    this.setDelayTime = function (ms) {

        delayTime = ms;

        self.delay.delayTime = delayTime;
        console.log("delay time is set to " + self.delay.delayTime);
    }

    this.readDelayTime = function () {
        return self.delay.delayTime;
    }

   

    this.setDryWetRatio = function (frequency) {
        self.biQuadFilter.frequency.value = frequency;
    }

    this.readDryWetRatio = function () {
        return self.biQuadFilter.frequency.value;
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
    this.updateDisplay = function (filterTypeId, filterFrequencyId, filterQId, filterGainId) {

        $(filterTypeId).val(typeEnum);

        $(filterFrequencyId).val(self.biQuadFilter.frequency.value);

        $(filterQId).val(self.biQuadFilter.Q.value);

        $(filterGainId).val(self.biQuadFilter.gain.value);
    }

}


