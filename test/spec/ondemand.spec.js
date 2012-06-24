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

 
describe('jQuery OnDemand', function(){

	beforeEach(function(){
		$.onDemand.resetOptions();
		$.onDemand.reset();
	});

	it('Defines the plugin', function(){
		expect($.onDemand).toBeDefined();
		expect($.onDemand._name).toBe('onDemand');
		expect($.onDemand.fn2script).toBeDefined();
		expect($.onDemand.firstLoad).toBeDefined();
		expect($.onDemand.setOptions).toBeDefined();
		expect($.onDemand.preload).toBeDefined();
		expect($.onDemand.invoke).toBeDefined();
		expect($.onDemand.use).toBeDefined();
		expect($.onDemand.register).toBeDefined();
		expect($.onDemand.registerAll).toBeDefined();
	});

	it('Registers a function so it becomes invocable', function(){
		var foo = function(){
			return 'foo';
		};
		$.onDemand.register('foo', foo);
		expect($.onDemand._proxy['foo']).toBe(foo);
	});

	it('Registers an object so it becomes usable', function(){
		var foo = {
			bar: 'bar'
		};
		$.onDemand.register('foo', foo);
		expect($.onDemand._proxy['foo']).toBe(foo);
	});

	it('Registers multiple functions and objects so they become invocable', function(){
		var thing = {
			foo: function(){},
			bar: {
				prop: 'prop'
			}
		};
		$.onDemand.register('thing', thing);
		expect($.onDemand._proxy['thing'].foo).toBe(thing.foo);
		expect($.onDemand._proxy['thing'].bar).toEqual({prop: 'prop'});
	});

	it('Uses the default settings to match a function name to the corresponding script', function(){
		expect($.onDemand.fn2script('foo')).toEqual('foo-ondemand.js');
	});

	it('Uses a custom matcher to match a function name to the corresponding script', function(){
		$.onDemand.setOptions({
			fn2script: function(fn){
				return 'my/path/123456/ondemand-' + fn + '.js';
			}
		});
		expect($.onDemand.fn2script('foo')).toEqual('my/path/123456/ondemand-foo.js');
	});

	it('Preloads a script', function(){
		//jQuery getScript mock
		$.getScript = function(){
			var deferred = $.Deferred();
			deferred.resolve();
			return deferred.promise();
		};
		spyOn($, 'getScript').andCallThrough();

		$.onDemand.preload('foo');

		expect($.getScript).toHaveBeenCalledWith('foo-ondemand.js');
	});

	it('Tries to retrieve the script when a function is called for the first time', function(){
		//jQuery getScript mock
		$.getScript = function(){
			var deferred = $.Deferred();
			deferred.resolve();
			return deferred.promise();
		};
		spyOn($, 'getScript').andCallThrough();

		var promise = $.onDemand.invoke('foo', [], null);

		expect($.getScript).toHaveBeenCalledWith('foo-ondemand.js');
		//Lame way to check it is a jQuery promise
		expect(promise.then).toBeDefined();
	});

	it('Invokes a function after it has been retrieved', function(){
		var gaaa = jasmine.createSpy('GAAA!');
		//jQuery getScript mock
		$.getScript = function(){
			$.onDemand._proxy.gaaa = gaaa;
			var deferred = $.Deferred();
			deferred.resolve();
			return deferred.promise();
		};
		var promise = $.onDemand.invoke('gaaa', [], null);

		expect(gaaa).toHaveBeenCalled();
	});

	it('Invokes a function with arguments after it has been retrieved', function(){
		var gaaa = jasmine.createSpy('GAAA!');
		//jQuery getScript mock
		$.getScript = function(){
			$.onDemand._proxy.gaaa = gaaa;
			var deferred = $.Deferred();
			deferred.resolve();
			return deferred.promise();
		};
		var promise = $.onDemand.invoke('gaaa', ['foo', 'bar'], null);

		expect(gaaa).toHaveBeenCalledWith('foo', 'bar');
	});
	
});