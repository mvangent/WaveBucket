/*------------------------------------------------------------------------------------------------------
** Object: Compressor(context) : prototype 
--------------------------------------------------------------------------------------------------------
*/

function Compressor(context) {
    this.compressorInstance = context.createDynamicsCompressor();

    var self = this;
    
    // ratio 
    self.ratioAdjuster = function (ratio) {
        self.compressorInstance.ratio.value = ratio;
    };

    self.readRatio = function () {
        return self.compressorInstance.ratio.value;
    }

    // knee
    self.kneeAdjuster = function (knee) {
        self.compressorInstance.knee.value = knee;
    };

    self.readKnee = function () {
        return self.compressorInstance.knee.value;
    }

    // threshold
    self.thresholdAdjuster = function (threshold) {
        self.compressorInstance.threshold.value = threshold;
    };

    self.readThreshold = function () {
        return self.compressorInstance.threshold.value;
    }

    // outputTo
    self.outputTo = function (destination) {
        self.compressorInstance.connect(destination);
        return true;
    }

    // input
    self.input = function () {
        return self.compressorInstance;
    }

    // displayMethod 
    self.updateDisplay = function (ratioID, kneeID, thresholdID) {
        $(ratioID).val(self.compressorInstance.ratio.value);
        $(kneeID).val(self.compressorInstance.knee.value);
        $(thresholdID).val(self.compressorInstance.threshold.value);
    }

}

