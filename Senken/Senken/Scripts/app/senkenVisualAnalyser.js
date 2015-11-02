/*------------------------------------------------------------------------------------------------------
** Object: Analyser(context) : prototype 
--------------------------------------------------------------------------------------------------------
*/

function Analyser(context) {
    var self = this;

    /* privates */
    var canvas;
    var canvasCtx;

    canvas = document.getElementById("oscIVisualiser");

    if (!canvas) {
        canvas = document.createElement('canvas');
        document.getElementsByTagName('body')[0].appendChild(canvas);
    }

    canvasCtx = canvas.getContext("2d");

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var drawVisual;
    var analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    // clear canvas
    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    /* Method: draw()
    ------------------------------------------------------------------------------
    ** Call this function once, and it will keep updating itself through callback
    ------------------------------------------------------------------------------*/
    self.draw = function () {
        drawVisual = requestAnimationFrame(self.draw);
        analyser.getByteTimeDomainData(dataArray);

        //set canvas background
        canvasCtx.fillStyle = 'rgb(72, 127, 94)'; // 34, 120, 141 (blue)
        canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
        // set canvas linewidth and stroke
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(94, 255, 159)'; // 179, 0, 40    gb(94, 255, 159
        // begin drawing a path
        canvasCtx.beginPath();

        // slice canvas width segments according to number of bins from FFT
        var sliceWidth = canvasWidth * 1.0 / bufferLength;
        var position = 0;

        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * canvasHeight / 2;

            if (i === 0) {
                canvasCtx.moveTo(position, y);
            } else {
                canvasCtx.lineTo(position, y);
            }
            position += sliceWidth;
        }
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
    }

    // connector methods: outputTo
    self.outputTo = function (destination) {
        analyser.connect(destination);
        return true;
    }

    // : input
    self.input = function () {
        return analyser;
    }
}

