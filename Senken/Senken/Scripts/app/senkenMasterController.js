/*------------------------------------------------------------------------------------------------------
** Object: MasterController(context) : prototype 
--------------------------------------------------------------------------------------------------------
*/
function MasterController(context) {
    // self reference
    var self = this;

    // member variables
    var masterVolume = context.createGain();
    self.active = false;

    // gain methods
    self.gainAdjuster = function (masGain) {
        masterVolume.gain.value = masGain / 100;
    };

    self.readGain = function () {
        return masterVolume.gain.value;
    }

    // activation methods
    self.startSession = function () {
        self.active = true;
    }

    self.stopSession = function () {
        self.active = false;
    }

    self.isActive = function () {
        return self.active;
    }

    // connector methods: outputTo
    this.outputTo = function (destination) {
        masterVolume.connect(destination);
        return true;
    }

    // : input
    this.input = function () {
        return masterVolume;
    }

    // display method: updateDisplay
    this.updateDisplay = function () {
        if (self.isActive()) {
            $('.senkenContainer').css({ 'opacity': 1.0 });
        } else {
            $('.senkenContainer').css({ 'opacity': 0.4 });
        }
        $('#masterGain').val(parseInt((masterVolume.gain.value) * 100));
    }
}

