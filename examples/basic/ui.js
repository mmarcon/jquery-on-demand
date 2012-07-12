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


/*
 * This is only a VERY simple example only to show how
 * OnDemand works. The goal is not to show the benefit in terms
 * of performance, instead I only wanted to show how to use the
 * plugin. The UI object that is loaded on demand is not a big library
 * so in this particular case it wouldn't even be necessary to load it
 * asynchronously on demand. But if that were a very big anc complex
 * UI framework the performance improvement starts to become more clear.
 */
var UI = UI || {};

UI.showPhoto = function(){
	$('.photo').css({
		'background-image':'url('+$(this).attr('href')+')'
	});
};

(function(){
	//When this JS file is loaded, automatically register the
	//UI object with the OnDemand plugin so the functions contained
	//into it become available for invocation.
	$.onDemand.registerAll(UI);
})();