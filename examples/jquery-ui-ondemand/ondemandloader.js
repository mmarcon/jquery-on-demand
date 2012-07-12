(function(){
	var functions = ['accordion', 'dialog', 'tabs', 'datepicker', 'slider', 'progressbar'];

	functions.forEach(function(f){
		$.fn[f] = function(){
			$.onDemand.invoke(f, arguments, this);
			return this;
		};
	});

	$.onDemand.setOptions({
		fn2script: function(fn){
			return 'development-bundle/ui/minified/jquery.ui.' + fn + '.min.js';
		},
		jqueryPlugin: true
	});

	$.onDemand.preload('core');
	$.onDemand.preload('widget');
})();