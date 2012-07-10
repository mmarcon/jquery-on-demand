(function(){
	var functions = ['accordion', 'dialog', 'tabs', 'datepicker', 'slider', 'progressbar'];

	//$('.myclass').dialog(options);

	functions.forEach(function(f){
		$.fn[f] = function(){
			console.log(f, arguments);
			$.onDemand.invoke(f, this, arguments);
		};
	});

	$.onDemand.setOptions({
		fn2script: function(fn){
			return 'development-bundle/ui/minified/jquery.ui.' + fn + '.min.js';
		},
		jqueryPlugin: false
	});

	$.onDemand.preload('core');
})();