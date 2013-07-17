// The module pattern (with an exported namespace)
var myJS = (function (myJS, $) {

    // My ViewModel - this holds the data and functions surrounding the data
    var vm = function() {
        var self = this;

        self.firstName = ko.observable('Tim');
        self.lastName = ko.observable('Corey');
        self.twitterHandle = '@IAmTimCorey';
        self.emailAddress = 'me@timothycorey.com';

        self.fullName = ko.computed(function () {
            return self.firstName() + ' ' + self.lastName();
        });

        self.checkValues = function(){
            toastr.info(self.firstName(), "First Name");
            toastr.info(self.lastName(), "Last Name");
        };
    };

    // The Document.Ready jQuery event that fires once the DOM is loaded
    $(function () {
        ko.applyBindings(vm());
    });

    return myJS;
}(window.myJS || {}, jQuery));