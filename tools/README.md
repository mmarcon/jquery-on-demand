#Building tool

This tool builds a set of `*-ondemand.js` files and a default configuration for jQuery OnDemand given a normal javascript file that has been annotated.

## Annotations

	// @all
	/*Block of code*/
	// @endall
	
Includes the block of lines that follow it in each of the `*-ondemand.js` files.

	// @group <GROUP NAME> (OPTIONAL)
	// @function <FUNCTION NAME>
	/*Block of code*/
	// @endfunction
	
A function is considered as a unit, and may potentially be the only piece of code contained in a `*-ondemand.js` file. If a group is specified, objects and functions of the same group will be contained in the same `*-ondemand.js` file.

	// @group <GROUP NAME> (OPTIONAL)
	// @object <OBJECT NAME>
	/*Block of code*/
	// @endobject
	
An object is considered as a unit, and may potentially be the only piece of code contained in a `*-ondemand.js` file. If a group is specified, objects and functions of the same group will be contained in the same `*-ondemand.js` file.