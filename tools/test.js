// @all
//define namespace
var TEST = TEST || {};
// @endall

// @function (group=core,name=init,namespace=TEST)
TEST.init = function(options){
    console.log('init');
};
// @endfunction

// @function (group=core,name=teardown,namespace=TEST)
TEST.teardown = function(options){
    console.log('teardown');
};
// @endfunction

// @function (name=foo,namespace=TEST)
TEST.foo = function(options){
    console.log('foo');
};
// @endfunction

// @object (name=component,namespace=TEST)
TEST.component = {
    init: function(){
        console.log('TEST.component::init')
    };
};
// @endobject