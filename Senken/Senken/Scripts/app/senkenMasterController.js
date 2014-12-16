/*------------------------------------------------------------------------------------------------------
** Object: MasterController(context) : prototype 
--------------------------------------------------------------------------------------------------------
*/


function MasterController(context) {
    // member variables
    var masterVolume = context.createGain();
    this.active = false;

    // self reference
    var self = this;

    // gain methods
    this.gainAdjuster = function (masGain) {
        masterVolume.gain.value = masGain / 100;

    };

    this.readGain = function () {
        return masterVolume.gain.value;
    }


    // activation methods
    this.startSession = function () {
        self.active = true;

        console.log("start session reached " + self.isActive());

    }

    this.stopSession = function () {

        self.active = false;

        console.log("stop session reached, active = " + self.active);
    }

    this.isActive = function () {

        return self.active;
    }

    // connector methods: outputTo
    this.outputTo = function (destination) {
        masterVolume.connect(destination);

    }

    // : input
    this.input = function () {
        return masterVolume;
    }

    // display method: updateDisplay
    this.updateDisplay = function () {
        console.log("update display mastercontrols is reached");

        if (self.isActive()) {
            $('.senkenContainer').css({ 'opacity': 1.0 });
        } else {
            $('.senkenContainer').css({ 'opacity': 0.4 });
        }

        $('#masterGain').val(parseInt((masterVolume.gain.value) * 100));
    }

}

