/*------------------------------------------------------------------------------------------------------
** Object: WaveBucket() : prototype 
--------------------------------------------------------------------------------------------------------
*/


function WaveBucket() {
    // member variables: 
    var waveBucket = [];
    this.activated = false;

    // methods: 

    //addWave()
    this.addWave = function (osc) {

        waveBucket.push(osc);
    }

    // removeLastWave()
    this.removeLastWave = function () {
        waveBucket.pop();
    }

    // remove(index) - wave will be removed from wavebucket by index
    this.remove = function (index) {

        waveBucket.splice(index, 1);
    }

    // removeFirstElement() -> wrapper for array.shift()
    this.removeFirstElement = function () {

        waveBucket.shift();
    }

    // getSize() -> wrapper for array.length 
    this.getSize = function () {

        return waveBucket.length;
    }

    // select(elementbyIndex) 
    this.select = function (i) {

        return waveBucket[i];
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

        var arrayLength = waveBucket.length;

        var mydiv = document.getElementById("bucketlist");

        mydiv.innerHTML = "";

        for (var i = 0; i < arrayLength; i++) {

            var newcontent = document.createElement('li');
            newcontent.innerHTML = waveBucket[i].frequency.value + " " + waveBucket[i].type;

            mydiv.appendChild(newcontent);

        };
    }
}

