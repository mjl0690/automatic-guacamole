var app = angular.module('app', []);

app.controller('testCtrl', function ($scope) {

    var width = window.innerWidth;
    var height = window.innerHeight;
    this.pixels = [];
    for (var i = 0; i < width/*10.07725*/; i++) {

        this.pixels.push({
            style: {
                backgroundColor: '#000000'
            }
        });
    }


    this.randomStyle = angular.bind(this, function (index, endIndex, done) {this.done = false;  if(!$scope.$$phase) {
        $scope.$apply();
    }
        var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];


        for (index; index <= endIndex; index++) {


            if (index !== 0 && index % endIndex === 0) {

                setTimeout(angular.bind(this, function () {


                        this.randomStyle(index + 1, this.pixels.length < endIndex + 1000 ? this.pixels.length -1 : index + 1000, this.pixels.length < endIndex + 1000 ? true : false)
                    }
                ), 0);
            }


            var test;
            for (var j = 1; j < this.pixels[index].style.backgroundColor.length; j++) {
                var workingCopy = test || this.pixels[index].style.backgroundColor;
                var random = hex[Math.floor(Math.random() * hex.length)];

                /*  Strings are immutable so this doesnt work
                 pixel.style.backgroundColor[j] = random;
                 */
                test = workingCopy.substr(0, j) + random + workingCopy.substr(j + 1);
            }

            this.pixels[index].style.backgroundColor = test;
        }
       this.done = done;

        if(!$scope.$$phase) {
            $scope.$apply();
        }
    })
    ;

    this.randomStyle(0, this.pixels.length <= 1000 ? this.pixels.length : 1000, this.pixels.length <= 1000 ? true : false);
})
;
