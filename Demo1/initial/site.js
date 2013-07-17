// The module pattern (with an exported namespace)
var myJS = (function (myJS, $) {

    // My ViewModel - this holds the data and functions surrounding the data
    var vm = function() {
        var self = this;

    };

    // The Document.Ready jQuery event that fires once the DOM is loaded
    $(function () {
        
    });

    return myJS;
}(window.myJS || {}, jQuery));