var compressorViewModel = {
    ratio: ko.observable(finalCompressor.adjustRatio(20)),
    knee: ko.observable(finalCompressor.readKnee()),
    threshold: ko.observable(finalCompressor.readThreshold())
}