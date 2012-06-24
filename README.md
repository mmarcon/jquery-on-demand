# jQuery On Demand

**On Demand** is a jQuery plugin to asyncronously load functions and objects only when they are needed, thus improving your application performance in terms of amount of code that needs to be downloaded by the client upon application load.

This plugin is ideal to deliver code on demand when the need of a feature, function or object is necessary only after some user actions.

## A practical example
Some of the posts in your blog include photos. Whenever the user clicks on a photo the classic lightbox/carousel is displayed so the user can easily browse all the photos in the post. However if the user decides not to click on any photo, or selects a post with no photos, there is no reason to download the lightbox/carousel code.

This is where On Demand comes into the picture: it can be used to load and execute the JavaScript code for the lightbox only when the user requests the functionality.

This is very similar to the example in the examples directory, however that is a very very simple photo gallery so there isn't much code that is downloaded on demand, but the concept is the same.

## API
	$.onDemand.setOptions (optionsObject)
	
Sets the options of the plugin. The only option currently available is `fn2script` which is a function that translates a function name to the corresponding javascript file that will be downloaded. By default when invoking a function `foo` the plugin attemps to download `foo-ondemand.js`.
	
	$.onDemand.resetOptions()
	
Resets the options to the default values.
	
	$.onDemand.preload(functionName)

Preloads the javascript file containing the function `functionName`. This function can be used to lazy load features at any point without waiting for it to actually be necessary. Can be used to preload code that is always necessary.
	
	$.onDemand.invoke(functionName, args, context)

Invokes a function identified by `functionName`, passing the arguments specified in the `args` **array** and optionally setting `context` as the function context, i.e. the `this` within the function scope will refer to the `context` object. If the function is not available the file containing it will be downloaded first.
**Returns a jQuery Promise** that will be resolved with the function call result once the execution is completed.
	
	$.onDemand.use(objectName)
	
Similar to invoke, but intended for cases when rather than invoking a function it is necessary to use an object (that may be a *"function container"*), identified by `objectName`. The Promise will be resolved with the object as the parameter.
	
	$.onDemand.register(objectOrFunctionName, objectOrFunction)
	
Typically called in a self-invoking function at the end of a javascript file loaded by OnDemand to register a function or object to make it available for invocation through the plugin.
	
	$.onDemand.registerAll(objectOrFunctionContainer)
	
Typically called in a self-invoking function at the end of a javascript file loaded by OnDemand to register a group of functions or objects to make them available for invocation through the plugin. An example is the following (from the examples directory):

	var UI = UI || {};

	UI.showPhoto = function(){
		$('.photo').css({
			'background-image':'url('+$(this).attr('href')+')'
		});
	};
	
	UI.foo = function(){
		alert('foo-fooo-foooo!');
	};
	
	(function(){
		//When this JS file is loaded, automatically register the
		//UI object with the OnDemand plugin so the functions contained
		//into it become available for invocation.
		$.onDemand.registerAll(UI);
	})();
