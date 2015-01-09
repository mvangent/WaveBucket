/*------------------------------------------------------------------------------------------------------
** Object: WaveBucket() : prototype 
--------------------------------------------------------------------------------------------------------
*/


function WaveBucket(idName) {

    var id = idName;

    var self = this;
    
    // member variables: 
    this.waveBucket = [];
    this.waveBucketVolumes = [0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50];
    this.activated = false;

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

        console.log(self.waveBucketVolumes);
    }

    // removeLastWave()
    this.removeLastWave = function () {
        self.waveBucket.pop();
    }

    // remove(index) - wave will be removed from wavebucket by index
    this.remove = function (index) {

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
            newcontent.innerHTML = self.waveBucket[i].frequency.value + " " + self.waveBucket[i].type;

            mydiv.appendChild(newcontent);

            // volume fader per wave in bucket

            var volumeFaderID = "volumeFader" + id + i;

            console.log(volumeFaderID + " = volumeFaderID");

            var volumeFader = document.createElement("input");
            volumeFader.setAttribute("id", volumeFaderID);
            volumeFader.setAttribute("type", "range");                     
            
            volumeFader.setAttribute("class", "volumeFader");

            $(mydiv).append(volumeFader);

        };
    }

    this.saveBucket = function (hiddenBucketId) {

        console.log("save bucket reached on WaveBucket");

        var updateValue = "" + self.oscillationsToString();

        $(hiddenBucketId).val(updateValue);

        return true;
    }

    this.loadBucket = function(hiddenBucketId) {

        var bucketString;
        bucketString = $(hiddenBucketId).attr('value');

        return bucketString;
    }

    this.oscillationsToString = function() {

       var returnString= "";
        
        var arrayLength = self.waveBucket.length;

                for (var i = 0; i < arrayLength; i++) {
               
                    returnString = returnString.concat(self.waveBucket[i].frequency.value + " " + self.waveBucket[i].type + " " + self.readVolumeByIndex(i) + ",");

            };
        

        return returnString;
        
    }
}

