;(function($, window, document, undefined) {
    // Create the defaults once
    var pluginName = 'onDemand',
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function OnDemand(options) {
        this.options = $.extend( {}, defaults, options);
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    OnDemand.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element 
        // and this.options
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $[pluginName] = OnDemand;

})( jQuery, window, document );