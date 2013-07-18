var myJS = (function (myJS, $) {
    var data = {
        Items: [],
        InventoryItems: [{
            Name: 'Soccer Ball',
            Price: 12.56,
            Quantity: 10,
            Taxable: false
        }, {
            Name: 'BasketBall',
            Price: 18.50,
            Quantity: 15,
            Taxable: true
        }, {
            Name: 'FootBall',
            Price: 21.95,
            Quantity: 10,
            Taxable: true
        }]
    };
    
    myJS.vm = function() {
        var self = this;

        self.mappingDirectives = {
            'Items': {
                create: function (options) {
                    return new myJS.CartItem(options.data.Quantity, options.data.Name, options.data.Taxable, options.data.Price);
                }
            }
        }

        ko.mapping.fromJS(data, self.mappingDirectives, self);

        self.removeItem = function (cartitem) {
            self.Items.remove(cartitem);
        };

        self.addItem = function (newcartitem) {
            var found = false;
            ko.utils.arrayForEach(self.Items(), function (incartitem) {
                if (incartitem.Name() === newcartitem.Name()) {
                    found = true;
                    self.increaseQuantity(incartitem);
                }
            });

            if (!found) {
                var newItem = new myJS.CartItem(1, newcartitem.Name(), newcartitem.Taxable(), newcartitem.Price());
                self.Items.push(newItem);
            }
        };

        self.increaseQuantity = function (cartitem) {
            cartitem.Quantity(cartitem.Quantity() + 1);

        };

        self.decreaseQuantity = function (cartitem) {
            cartitem.Quantity(cartitem.Quantity() - 1);
            if (cartitem.Quantity() < 1) {
                self.removeItem(cartitem);
            }
        };

        self.subtotal = ko.computed(function () {
            var total = 0;
            ko.utils.arrayForEach(self.Items(), function (cartitem) {
                var value = parseFloat(cartitem.Price()) * parseFloat(cartitem.Quantity());
                if (!isNaN(value)) {
                    total += value;
                }
            });
            return total.toFixed(2);
        }, self);

        self.taxtotal = ko.computed(function () {
            var total = 0;
            ko.utils.arrayForEach(self.Items(), function (cartitem) {
                var value = parseFloat(cartitem.Tax());
                if (!isNaN(value)) {
                    total += value;
                }
            });
            return total.toFixed(2);
        }, self);

        self.total = ko.computed(function () {
            var total = 0;
            ko.utils.arrayForEach(self.Items(), function (cartitem) {
                var value = parseFloat(cartitem.ItemTotal());
                if (!isNaN(value)) {
                    total += value;
                }
            });
            return total.toFixed(2);
        }, self);

        self.isBigSpender = ko.computed(function () {
            if (self.total() >= 100) {
                return true;
            }
            else {
                return false;
            }
        }, self);

        self.clearCart = function () {
            self.Items.removeAll();
        };
    }

    myJS.CartItem = function(quantity, name, taxable, price) {
        this.Quantity = ko.observable(quantity);
        this.Name = ko.observable(name);
        this.Taxable = ko.observable(taxable);
        this.Price = ko.observable(parseFloat(price).toFixed(2));
        this.Tax = ko.computed(function () {
            var total = 0.0;
            if (this.Taxable() === true) {
                total = parseFloat(this.Price()) * parseFloat(this.Quantity());
                total *= 0.06;
            }

            return total.toFixed(2);
        }, this);
        this.ItemTotal = ko.computed(function () {
            return (parseFloat(this.Quantity()) * parseFloat(this.Price()) + parseFloat(this.Tax())).toFixed(2);
        }, this);
    }

    // The Document.Ready jQuery event that fires once the DOM is loaded
    $(function () {
        ko.applyBindings(new myJS.vm());
    });

    return myJS;
}(window.myJS || {}, jQuery));