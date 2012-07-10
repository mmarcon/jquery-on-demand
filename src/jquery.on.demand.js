/*
 * Copyright (C) 2012 Massimiliano Marcon

 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:

 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

;(function($, window, undefined) {
    'use strict';
    var pluginName = 'onDemand',
        version = '0.1',
        defaults = {
            fn2script: function(fn) {
                return fn + '-ondemand.js';
            }
        },
        OnDemand,
        P, getInstance, isFn, isObj,
        that;

    OnDemand = function(options) {
        this.options = $.extend( {}, defaults, options);
        
        this._defaults = defaults;
        this._name = pluginName;
        this._version = version;
        this._proxy = {};

        
        that = this;
    };

    P = OnDemand.prototype;

    P.fn2script = function(fn) {
        return this.options.fn2script(fn);
    };

    P.firstLoad = function(fn, args, context){
        var script = this.fn2script(fn), deferred = $.Deferred(), rv;

        if (isFn(that._proxy[fn])) {
            rv = that._proxy[fn].apply(context, args);
            deferred.resolve(rv);
        }
        else {
            if (!script) {
                return;
            }
            $.getScript(script).done(function(){
                var rv;
                if (isFn(that._proxy[fn])) {
                    rv = that._proxy[fn].apply(context, args);
                }
                else if (isObj(that._proxy[fn])) {
                    rv = that._proxy[fn];
                }
                deferred.resolve(rv);
            }).fail(function(){
                deferred.reject('OnDemand failed to load script '  + script);
            });
        }
        return deferred.promise();
    };

    P.setOptions = function(options){
        this.options = $.extend( {}, defaults, options);
    };

    P.resetOptions = function(){
        this.options = $.extend( {}, defaults, {});
    };

    //@forTest
    P.reset = function(){
        delete $[pluginName];
        $[pluginName] = getInstance();
    };
    //@endForTest

    P.preload = function(fn){
        this.firstLoad(fn);
    };
    P.invoke = function(fn, args, context){
        return this.firstLoad(fn, args, context);
    };
    P.use = function(object){
        return this.firstLoad(object);
    };
    P.register = function(name, fn){
        if (isFn(fn) || isObj(fn)) {
            that._proxy[name] = fn;
        }
    };
    P.registerAll = function(object){
        var component;
        for (component in object) {
            if (object.hasOwnProperty(component)) {
                this.register(component, object[component]);
            }
        }
    };

    getInstance = function(options) {
        return new OnDemand(options);
    };

    isFn = function(what) {
        return typeof what === 'function';
    };

    isObj = function(what) {
        return typeof what === 'object';
    };

    $[pluginName] = getInstance();

})(jQuery, window);