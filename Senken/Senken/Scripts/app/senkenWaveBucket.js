/*------------------------------------------------------------------------------------------------------
** Object: WaveBucket() : prototype 
--------------------------------------------------------------------------------------------------------
*/


function WaveBucket(context, idName, oscillator) {

    var id = idName;

    var self = this;
    
    // member variables: 
    this.waveBucket = [];
    this.waveBucketVolumes = [];
    this.activated = false;

    // gain nodes
    this.gainCh0 = context.createGain();
    //self.gainCh0.gain.value = 0.5;
    self.waveBucketVolumes[0] = self.gainCh0;

    this.gainCh1 = context.createGain();
    //self.gainCh1.gain.value = 0.5;
    self.waveBucketVolumes[1] = self.gainCh1;

    this.gainCh2 = context.createGain();
    //self.gainCh2.gain.value = 0.5;
    self.waveBucketVolumes[2] = self.gainCh2;

    this.gainCh3 = context.createGain();
    //self.gainCh3.gain.value = 0.5;
    self.waveBucketVolumes[3] = self.gainCh3;

    this.gainCh4 = context.createGain();
    //self.gainCh4.gain.value = 0.5;
    self.waveBucketVolumes[4] = self.gainCh4;

    this.gainCh5 = context.createGain();
    //self.gainCh5.gain.value = 0.5;
    self.waveBucketVolumes[5] = self.gainCh5;

    this.gainCh6 = context.createGain();
    //self.gainCh6.gain.value = 0.5;
    self.waveBucketVolumes[6] = self.gainCh6;

    this.gainCh7 = context.createGain();
    //self.gainCh7.gain.value = 0.5;
    self.waveBucketVolumes[7] = self.gainCh7;

    this.gainCh8 = context.createGain();
    //.gainCh8.gain.value = 0.5;
    self.waveBucketVolumes[8] = self.gainCh8;

    this.gainCh9 = context.createGain();
    //self.gainCh9.gain.value = 0.5;
    self.waveBucketVolumes[9] = self.gainCh9;



    // methods: 

    //addWave()
    this.addWave = function (osc) {

        self.waveBucket.push(osc);
    }

    this.readVolumeByIndex = function (index) {
        return self.waveBucketVolumes[index].gain.value;
    }

    // changeVolume(index, volume)
    this.changeVolume = function (index, volume) {
        console.log("changeVolume on Oscillator volume = " + volume);
        var volumeFloat = parseFloat(volume);
        self.waveBucketVolumes[index].gain.value = volumeFloat;       
        console.log(self.waveBucketVolumes);
       // console.log(bucketID);
       // self.updateDisplay(bucketID);
    }

    // removeLastWave() DEPRECEATED
    this.removeLastWave = function () {
        self.waveBucket.pop();
    } 

    // remove(index) - wave will be removed from wavebucket by index
    this.remove = function (index) {

        console.log("remove(index) on wavebucket reached");

        self.waveBucket[index].stop();

        console.log("spliced on index:  " + index);

        self.waveBucket.splice(index, 1);

        // synching the gainNodes with the new wavebucket
        var gainNodeToBeReplaced = self.waveBucketVolumes[index];
        self.waveBucketVolumes.splice(index, 1);
        self.waveBucketVolumes[9] = gainNodeToBeReplaced;

        

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
                    console.log("saving bucket.... " + returnString);
            };
        

        return returnString;
        
    }

    // : gainNode
    this.gainNode = function (index) {

       return self.waveBucketVolumes[index];

    }
}

