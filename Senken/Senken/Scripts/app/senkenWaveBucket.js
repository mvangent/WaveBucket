/*------------------------------------------------------------------------------------------------------
** Object: WaveBucket() : prototype 
--------------------------------------------------------------------------------------------------------
*/


function WaveBucket() {

    var self = this;
    
    // member variables: 
    this.waveBucket = [];
    this.activated = false;

    // methods: 

    //addWave()
    this.addWave = function (osc) {

        self.waveBucket.push(osc);
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
    this.updateDisplay = function () {

        console.log('updateDisplay in WaveBucket reached');

        var arrayLength = self.waveBucket.length;

        var mydiv = document.getElementById("bucketlist");

        mydiv.innerHTML = "";

        for (var i = 0; i < arrayLength; i++) {

            var newcontent = document.createElement('li');
            newcontent.innerHTML = self.waveBucket[i].frequency.value + " " + self.waveBucket[i].type;

            mydiv.appendChild(newcontent);

        };
    }

    this.saveWaveBucket = function () {

        var updateValue = "" + self.oscillationsToString();

        $('#hiddenWaveBucket').val(updateValue);

        return true;
    }

    this.loadBucket = function() {

        var bucketString;
        bucketString = $('#hiddenWaveBucket').attr('value');

        return bucketString;
    }

    this.oscillationsToString = function() {

       var returnString= "";
        
        var arrayLength = self.waveBucket.length;

        

            for (var i = 0; i < arrayLength; i++) {
               
                returnString = returnString.concat(self.waveBucket[i].frequency.value + " " + self.waveBucket[i].type + ",");

            };
        

        return returnString;
        
    }
}

