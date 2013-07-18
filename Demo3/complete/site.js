var myJS = (function (myJS, $) {

    // Represents the incoming JSON data - nothing in the cart but three items in inventory
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
    
    // The view model for the page
    myJS.vm = function() {
        var self = this;

        // Tells the mapper how to handle the array items
        self.mappingDirectives = {
            'Items': {
                create: function (options) {
                    return new myJS.CartItem(options.data.Quantity, options.data.Name, options.data.Taxable, options.data.Price);
                }
            },
            'InventoryItems': {
                key: function (data) {
                    return ko.unwrap(data.Name);
                }
            }
        }

        // Maps the incoming data
        ko.mapping.fromJS(data, self.mappingDirectives, self);

        // Takes an item out of the cart
        self.removeItem = function (cartitem) {
            self.Items.remove(cartitem);
        };

        // Adds an item to the cart (or increases the quantity if it is already in the cart)
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

        // Bumps up the quantity of the item by one
        self.increaseQuantity = function (cartitem) {
            cartitem.Quantity(cartitem.Quantity() + 1);
        };

        // Reduces the quantity by one (or removes it if the quantity is less than one)
        self.decreaseQuantity = function (cartitem) {
            cartitem.Quantity(cartitem.Quantity() - 1);
            if (cartitem.Quantity() < 1) {
                self.removeItem(cartitem);
            }
        };

        // Calculates the cost of the entire cart before tax
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

        // Calculates the sum of the tax to be paid
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

        // Calculates the final amount due after tax
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

        // Adds a banner if the user spends over $100
        self.isBigSpender = ko.computed(function () {
            if (self.total() >= 100) {
                return true;
            }
            else {
                return false;
            }
        }, self);

        // Removes all of the items from the cart
        self.clearCart = function () {
            self.Items.removeAll();
        };

        // Simulates bringing down a new inventory list and merging it into the viewmodel
        self.refreshInventory = function () {
            data = data = {
                InventoryItems: [{
                    Name: 'Soccer Ball',
                    Price: 150.56,
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
                }, {
                    Name: 'Baseball',
                    Price: 18.50,
                    Quantity: 15,
                    Taxable: true
                }, {
                    Name: 'Hockey Puck',
                    Price: 18.50,
                    Quantity: 15,
                    Taxable: true
                }]
            };
            ko.mapping.fromJS(data, self.mappingDirectives, self);
        };
    }

    // Represents the ko mapping for one cart item
    myJS.CartItem = function (quantity, name, taxable, price) {
        var self = this;

        self.Quantity = ko.observable(quantity);
        self.Name = ko.observable(name);
        self.Taxable = ko.observable(taxable);
        self.Price = ko.observable(parseFloat(price).toFixed(2));

        self.Tax = ko.computed(function () {
            var total = 0.0;
            if (self.Taxable() === true) {
                total = parseFloat(self.Price()) * parseFloat(self.Quantity());
                total *= 0.06;
            }

            return total.toFixed(2);
        }, self);

        self.ItemTotal = ko.computed(function () {
            return (parseFloat(self.Quantity()) * parseFloat(self.Price()) + parseFloat(self.Tax())).toFixed(2);
        }, self);
    }

    // The Document.Ready jQuery event that fires once the DOM is loaded
    $(function () {
        ko.applyBindings(new myJS.vm());
    });

    return myJS;
}(window.myJS || {}, jQuery));