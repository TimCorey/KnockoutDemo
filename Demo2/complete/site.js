// The module pattern (with an exported namespace)
var myJS = (function (myJS, $) {

    // A pre-set array of my pets
    var data = {
        firstName: 'Tim',
        lastName: 'Corey',
        twitterHandle: '@IAmTimCorey',
        emailAddress: 'me@timothycorey.com',
        pets: [{
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
        }]
    };

    // My ViewModel - this holds the data and functions surrounding the data
    var vm = function() {
        var self = this;

        ko.mapping.fromJS(data, {}, self);

        // Computed observable that concatinates the first and last name to form a full name
        self.fullName = ko.computed(function () {
            return self.firstName() + ' ' + self.lastName();
        });

        self.checkValues = function () {
            // Shows the value of the name properties
            toastr.info(self.firstName(), "First Name");
            toastr.info(self.lastName(), "Last Name");

            // Adds new pet to the observable array
            self.pets.push({ animalType: 'rat', name: 'Lawrence', age: 1, petImage: '../../content/images/rat.png' });
        };
    };

    // The Document.Ready jQuery event that fires once the DOM is loaded
    $(function () {
        ko.applyBindings(vm());
    });

    return myJS;
}(window.myJS || {}, jQuery));