/*------------------------------------------------------------------------------------------------------
** Object: WaveBucket() : prototype 
--------------------------------------------------------------------------------------------------------
*/
function WaveBucket(context, idName, oscillator) {
    var self = this;

    // private
    var id = idName;

    // public member variables: 
    self.waveBucket = [];
    self.waveBucketVolumes = [];
    self.activated = false;

    // gain nodes
    self.gainCh0 = context.createGain();
    self.waveBucketVolumes[0] = self.gainCh0;

    self.gainCh1 = context.createGain();
    self.waveBucketVolumes[1] = self.gainCh1;

    self.gainCh2 = context.createGain();
    self.waveBucketVolumes[2] = self.gainCh2;

    self.gainCh3 = context.createGain();
    self.waveBucketVolumes[3] = self.gainCh3;

    self.gainCh4 = context.createGain();
    self.waveBucketVolumes[4] = self.gainCh4;

    self.gainCh5 = context.createGain();
    self.waveBucketVolumes[5] = self.gainCh5;

    self.gainCh6 = context.createGain();
    self.waveBucketVolumes[6] = self.gainCh6;

    self.gainCh7 = context.createGain();
    self.waveBucketVolumes[7] = self.gainCh7;

    self.gainCh8 = context.createGain();
    self.waveBucketVolumes[8] = self.gainCh8;

    self.gainCh9 = context.createGain();
    self.waveBucketVolumes[9] = self.gainCh9;

    // methods: 

    //addWave()
    self.addWave = function (osc) {
        self.waveBucket.push(osc);
    }

    self.readVolumeByIndex = function (index) {
        return self.waveBucketVolumes[index].gain.value;
    }

    // changeVolume(index, volume)
    self.changeVolume = function (index, volume) {
        var volumeFloat = parseFloat(volume);
        self.waveBucketVolumes[index].gain.value = volumeFloat;
    }

    // removeLastWave() DEPRECEATED
    self.removeLastWave = function () {
        self.waveBucket.pop();
    }

    // remove(index) - wave will be removed from wavebucket by index
    self.remove = function (index) {
        self.waveBucket[index].stop();
        self.waveBucket.splice(index, 1);

        // synching the gainNodes with the new wavebucket
        var gainNodeToBeReplaced = self.waveBucketVolumes[index];
        self.waveBucketVolumes.splice(index, 1);
        self.waveBucketVolumes[9] = gainNodeToBeReplaced;
    }

    // removeFirstElement() -> wrapper for array.shift()
    self.removeFirstElement = function () {
        self.waveBucket.shift();
    }

    // getSize() -> wrapper for array.length 
    self.getSize = function () {
        return self.waveBucket.length;
    }

    // select(elementbyIndex) 
    self.select = function (i) {
        return self.waveBucket[i];
    }

    // activate()
    self.activate = function () {
        self.activated = true;
    }

    // deactivate()
    self.deactivate = function () {
        self.activated = false;
    }

    // isActive();
    self.isActive = function () {
        return self.activated;
    }

    // updateDisplay()
    self.updateDisplay = function (bucketTable) {
        var arrayLength = self.waveBucket.length;
        var mydiv = document.getElementById(bucketTable);
        mydiv.innerHTML = "";

        for (var i = 0; i < arrayLength; i++) {

            var newcontent = document.createElement('li');
            var removeImageId = "removeImage" + id + i;
            var removeImage = document.createElement("img");
            removeImage.setAttribute("src", "/../../Images/deleteSymbol.png");
            removeImage.setAttribute("id", removeImageId);
            removeImage.setAttribute("class", "removeImage");

            var volumeImageId = "volumeImage" + id + i;
            var volumeImage = document.createElement("img");
            volumeImage.setAttribute("src", "/../../Images/volumeSymbol.png");
            volumeImage.setAttribute("id", volumeImageId);
            volumeImage.setAttribute("class", "volumeImage");

            newcontent.innerHTML = self.waveBucket[i].frequency.value + " " + self.waveBucket[i].type;
            mydiv.appendChild(newcontent);
            mydiv.appendChild(volumeImage);

            // volume fader per wave in bucket
            var volumeFaderId = "volumeFader" + id + i;
            var displayVolume = (self.readVolumeByIndex(i)) * 100;

            var volumeFader = document.createElement("input");
            volumeFader.setAttribute("id", volumeFaderId);
            volumeFader.setAttribute("type", "range");
            volumeFader.setAttribute("value", displayVolume);
            volumeFader.setAttribute("class", "volumeFader");

            $(mydiv).append(volumeFader);
            mydiv.appendChild(removeImage);
        };
    }

    // returns a stringed version of all oscillations in the bucket
    self.oscillationsToString = function () {
        var returnString = "";
        var arrayLength = self.waveBucket.length;

        for (var i = 0; i < arrayLength; i++) {
            returnString = returnString.concat(self.waveBucket[i].frequency.value + " " + self.waveBucket[i].type + " " + self.readVolumeByIndex(i) + ",");
        };
        return returnString;
    }

    // : gainNode
    this.gainNode = function (index) {
        return self.waveBucketVolumes[index];
    }
}

