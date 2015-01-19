/*------------------------------------------------------------------------------------------------------
** Object: WaveBucket() : prototype 
--------------------------------------------------------------------------------------------------------
*/


function WaveBucket(context, idName, oscillator) {

    var id = idName;

    var self = this;
    
    // member variables: 
    this.waveBucket = [];
    this.waveBucketVolumes = [0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50];
    this.activated = false;

    // gain nodes
    this.gainCh0 = context.createGain();
    self.gainCh0.gain.value = 0.5;
    this.gainCh1 = context.createGain();
    self.gainCh1.gain.value = 0.5;
    this.gainCh2 = context.createGain();
    self.gainCh2.gain.value = 0.5;
    this.gainCh3 = context.createGain();
    self.gainCh3.gain.value = 0.5;
    this.gainCh4 = context.createGain();
    self.gainCh4.gain.value = 0.5;
    this.gainCh5 = context.createGain();
    self.gainCh5.gain.value = 0.5;
    this.gainCh6 = context.createGain();
    self.gainCh6.gain.value = 0.5;
    this.gainCh7 = context.createGain();
    self.gainCh7.gain.value = 0.5;
    this.gainCh8 = context.createGain();
    self.gainCh8.gain.value = 0.5;
    this.gainCh9 = context.createGain();
    self.gainCh9.gain.value = 0.5;



    // methods: 

    //addWave()
    this.addWave = function (osc) {

        self.waveBucket.push(osc);
    }

    this.readVolumeByIndex = function (index) {
        return self.waveBucketVolumes[index];
    }

    // changeVolume(index, volume)
    this.changeVolume = function (index, volume) {
        console.log("changeVolume on Oscillator volume = " + volume);
        var volumeFloat = parseFloat(volume);
        self.waveBucketVolumes[index] = volumeFloat;

        switch (index) {
            case 0: return self.gainCh0.gain.value = volumeFloat;
            case 1: return self.gainCh1.gain.value = volumeFloat;
            case 2: return self.gainCh2.gain.value = volumeFloat;
            case 3: return self.gainCh3.gain.value = volumeFloat;
            case 4: return self.gainCh4.gain.value = volumeFloat;
            case 5: return self.gainCh5.gain.value = volumeFloat;
            case 6: return self.gainCh6.gain.value = volumeFloat;
            case 7: return self.gainCh7.gain.value = volumeFloat;
            case 8: return self.gainCh8.gain.value = volumeFloat;
            case 9: return self.gainCh9.gain.value = volumeFloat;

        }

        
        console.log(self.waveBucketVolumes);
    }

    // removeLastWave()
    this.removeLastWave = function () {
        self.waveBucket.pop();
    }

    // remove(index) - wave will be removed from wavebucket by index
    this.remove = function (index) {

        console.log("remove(index) on wavebucket reached");

        // self.waveBucket[index].stop();

        console.log("spliced on index:  " + index);

        self.waveBucket.splice(index, 1);
    }

    // removeFirstElement() -> wrapper for array.shift()
    this.removeFirstElement = function () {

        self.waveBucket.shift();
    }

    // getSize() -> wrapper for array.length 
    this.getSize = function () {

        return self.waveBucket.length;
    }

    // select(elementbyIndex) 
    this.select = function (i) {

        return self.waveBucket[i];
    }

    // activate()
    this.activate = function () {
        self.activated = true;
    }

    // deactivate()
    this.deactivate = function () {
        self.activated = false;
    }

    // isActive();
    this.isActive = function () {
        return self.activated;
    }

    // updateDisplay()
    this.updateDisplay = function(bucketTable) {

        console.log('updateDisplay in WaveBucket reached');

        var arrayLength = self.waveBucket.length;

        //var bucketTableToJqueryString = "'" + bucketTable + "'";

        console.log(bucketTable);

        var mydiv = document.getElementById(bucketTable);

        console.log(mydiv);

        mydiv.innerHTML = "";

        for (var i = 0; i < arrayLength; i++) {

            var newcontent = document.createElement('li');

            var removeImageID = "removeImage" + id + i;

            var removeImage = document.createElement("img");
            removeImage.setAttribute("src", "/../../Images/deleteSymbol.png");
            removeImage.setAttribute("id", removeImageID);
            removeImage.setAttribute("class", "removeImage");

            var volumeImageID = "volumeImage" + id + i;

            var volumeImage = document.createElement("img");
            volumeImage.setAttribute("src", "/../../Images/volumeSymbol.png");
            volumeImage.setAttribute("id", volumeImageID);
            volumeImage.setAttribute("class", "volumeImage");

            newcontent.innerHTML = self.waveBucket[i].frequency.value + " " + self.waveBucket[i].type;
            mydiv.appendChild(newcontent);
            
            mydiv.appendChild(volumeImage);

            // volume fader per wave in bucket

            var volumeFaderID = "volumeFader" + id + i;

            var displayVolume = (self.readVolumeByIndex(i)) * 100;

            console.log(volumeFaderID + " = volumeFaderID");

            var volumeFader = document.createElement("input");
            volumeFader.setAttribute("id", volumeFaderID);
            volumeFader.setAttribute("type", "range");                     
            volumeFader.setAttribute("value", displayVolume);
            volumeFader.setAttribute("class", "volumeFader");

            $(mydiv).append(volumeFader);
            mydiv.appendChild(removeImage);

        };
    }

  
    // returns a stringed version of all oscillations in the bucket

    this.oscillationsToString = function () {

       var returnString= "";
        
        var arrayLength = self.waveBucket.length;

                for (var i = 0; i < arrayLength; i++) {
               
                    returnString = returnString.concat(self.waveBucket[i].frequency.value + " " + self.waveBucket[i].type + " " + self.readVolumeByIndex(i) + ",");

            };
        

        return returnString;
        
    }

    // : gainNode
    this.gainNode = function (index) {
        switch (index)
        {
            case 0: return self.gainCh0;
            case 1: return self.gainCh1;
            case 2: return self.gainCh2;
            case 3: return self.gainCh3;
            case 4: return self.gainCh4;
            case 5: return self.gainCh5;
            case 6: return self.gainCh6;
            case 7: return self.gainCh7;
            case 8: return self.gainCh8;
            case 9: return self.gainCh9;
        }
    }
}

