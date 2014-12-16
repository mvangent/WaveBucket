/*------------------------------------------------------------------------------------------------------
** Object: Compressor(context) : prototype 
--------------------------------------------------------------------------------------------------------
*/

function Compressor(context) {
    this.compressorInstance = context.createDynamicsCompressor();

    var selfCompressor = this;

    // ratio 
    this.ratioAdjuster = function (ratio) {
        console.log("compressor ratio set to 1 /  " + ratio);
        selfCompressor.compressorInstance.ratio.value = ratio;
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
    }

    // input
    this.input = function () {
        return selfCompressor.compressorInstance;
    }

    // displayMethod 
    this.updateDisplay = function () {

        $('#compRatio').val(compressorInstance.ratio.value);

        $('#compKnee').val(compressorInstance.knee.value);

        $('#compThreshold').val(compressorInstance.threshold.value);
    }

}

