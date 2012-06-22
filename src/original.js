M.features.Commons = M.features.Commons || {};

M.features.Commons.Proxy = (function($) {
    var _proxy = {}, firstLoad, r, fn2script,
        mappingFn, setMappingFunction, autoconf;

    fn2script = function(fn){
        if (typeof mappingFn === 'function') {
            return mappingFn.call(null, fn);
        }
        return false;
    };

    /*Should return a Promise kind of thing*/
    firstLoad = function(fn, args, context){
        var script = fn2script(fn), deferred = $.Deferred(), rv;

        if (typeof _proxy[fn] === 'function') {
            rv = _proxy[fn].apply(context, args);
            deferred.resolve(rv);
        }
        else {
            if (!script) {
                return;
            }
            $.getScript(script).done(function(){
                var rv;
                if (typeof _proxy[fn] === 'function') {
                    rv = _proxy[fn].apply(context, args);
                    deferred.resolve(rv);
                }
                else if (typeof _proxy[fn] === 'object') {
                    rv = _proxy[fn];
                    deferred.resolve(rv);
                }
                
            }).fail(function(){
                deferred.reject('M.features.Commons.Proxy failed to load script '  + script);
                throw new Error('M.features.Commons.Proxy failed to load script '  + script);
            });
        }
        return deferred.promise();
    };

    setMappingFunction = function(fn) {
        mappingFn = fn;
    };

    autoconf = function(){
        setMappingFunction(function(){
            return M.constants.JSHost + '/core/features/commons/js/city-place-commons-test.js';
        });
    };

    autoconf();


    return {
        preload: function(fn) {
            firstLoad(fn);
        },
        invoke: function(fn, args, context){
            return firstLoad(fn, args, context);
        },
        use: function(object, whendone) {
            return firstLoad(object);
        },
        register: function(name, fn){
            if (typeof fn === 'function' || typeof fn === 'object') {
                _proxy[name] = fn;
            }
        },
        registerAll: function(object) {
            var component;
            for (component in object) {
                if (object.hasOwnProperty(component)) {
                    M.features.Commons.Proxy.register(component, object[component]);
                }
            }
        },
        setMappingFunction: setMappingFunction
    };
})(jQuery);
