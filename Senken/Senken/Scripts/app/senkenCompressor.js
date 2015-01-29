/*------------------------------------------------------------------------------------------------------
** Object: Compressor(context) : prototype 
--------------------------------------------------------------------------------------------------------
*/

function Compressor(context) {
    this.compressorInstance = context.createDynamicsCompressor();

    var selfCompressor = this;

    selfCompressor.compressorInstance.ratio.value = 


    // ratio 
    this.ratioAdjuster = function (ratio) {
        console.log("compressor ratio set to 1 /  " + ratio);
        selfCompressor.compressorInstance.ratio.value = ratio;

       // selfCompressor.updateDisplay(ratioID, kneeID, ThresholdID)
        
    };

    this.readRatio = function () {
        return selfCompressor.compressorInstance.ratio.value;
    }

    // knee
    this.kneeAdjuster = function (knee) {
        console.log("compressor knee set to " + knee);
        selfCompressor.compressorInstance.knee.value = knee;
    };

    this.readKnee = function () {
        return selfCompressor.compressorInstance.knee.value;
    }

    // threshold
    this.thresholdAdjuster = function (threshold) {
        console.log("compressor Threshold set to " + threshold);
        selfCompressor.compressorInstance.threshold.value = threshold;
    };

    this.readThreshold = function () {
        return selfCompressor.compressorInstance.threshold.value;
    }

    // outputTo
    this.outputTo = function (destination) {
        selfCompressor.compressorInstance.connect(destination);
        console.log(destination.toString());

        return true;
    }

    // input
    this.input = function () {
        return selfCompressor.compressorInstance;
    }

    // displayMethod 
    this.updateDisplay = function (ratioID, kneeID, thresholdID) {

        $(ratioID).val(selfCompressor.compressorInstance.ratio.value);

        $(kneeID).val(selfCompressor.compressorInstance.knee.value);

        $(thresholdID).val(selfCompressor.compressorInstance.threshold.value);
    }

}

