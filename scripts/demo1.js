var myJS = (function (myJS, $) {

    function vm() {
        var self = this;

        self.firstName = ko.observable('Tim');
        self.lastName = 'Corey';
        self.twitterHandle = '@IAmTimCorey';
        self.emailAddress = 'me@timothycorey.com';

        self.fullName = ko.computed(function () {
            return self.firstName() + ' ' + self.lastName;
        });

        self.checkValues = function(){
            toastr.info(self.firstName(), "First Name");
            toastr.info(self.lastName, "Last Name");
        };
    };

    $(function () {
        ko.applyBindings(vm());
    });

    return myJS;
}(window.myJS || {}, jQuery));