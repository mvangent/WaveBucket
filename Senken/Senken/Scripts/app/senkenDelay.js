/*------------------------------------------------------------------------------------------------------
** Object: Delay(context) : prototype 
--------------------------------------------------------------------------------------------------------
** This delay is connected to an oscillator. The delay has two parameters. The first being delay time(ms), 
** the second being dry/wet ratio (percentages). 
*/

function Delay(context) {
    // privates
    var self = this;
    var channelSplitter = context.createChannelSplitter();
    var nonDelayGain = context.createGain();
    var delayGain = context.createGain();
    var delay = context.createDelay(10);
    var dryWetRatioInPercentage = 0;

    // connection scheme
    channelSplitter.connect(nonDelayGain);
    channelSplitter.connect(delay);
    delay.connect(delayGain);

    // initial setup
    var delayInMs = 0;
    nonDelayGain.gain.value = 1;
    delayGain.gain.value = 0;

    self.setDelayTime = function (ms) {
        delayInMs = ms;
        delay.delayTime.value = ms / 1000;
    }

    self.readDelayTime = function () {
        return delay.delayTime.value;
    }

    self.setDryWetRatio = function (ratio) {
        nonDelayGain.gain.value = (100 - ratio) / 100.0;
        delayGain.gain.value = ratio / 100.0;
        dryWetRatioInPercentage = ratio;
    }

    this.readDryWetRatio = function () {
        return dryWetRatioInPercentage;
    }

    // connector methods: outputTo
    this.outputTo = function (destination) {
        nonDelayGain.connect(destination);
        delayGain.connect(destination);
        return true;
    }

    // : input
    this.input = function () {
        return channelSplitter;
    }

    // displayMethod 
    this.updateDisplay = function (delayTime, delayRatio) {
        $(delayTime).val(delayInMs);
        $(delayRatio).val(self.readDryWetRatio);
    }
}


