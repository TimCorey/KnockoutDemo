// The module pattern (with an exported namespace)
var myJS = (function (myJS, $) {

    // A pre-set array of my pets
    var pets = [{
        animalType: 'dog',
        name: 'Jake',
        age: 5,
        petImage: '../../content/images/dog.png'
    }, {
        animalType: 'dog',
        name: 'Boris',
        age: 2,
        petImage: '../../content/images/dog.png'
    }, {
        animalType: 'cat',
        name: 'Percival',
        age: 14,
        petImage: '../../content/images/cat.png'
    }, {
        animalType: 'turtle',
        name: 'Nitro',
        age: 82,
        petImage: '../../content/images/turtle.png'
    }];

    // My ViewModel - this holds the data and functions surrounding the data
    var vm = function() {
        var self = this;

    };

    // The Document.Ready jQuery event that fires once the DOM is loaded
    $(function () {
        
    });

    return myJS;
}(window.myJS || {}, jQuery));