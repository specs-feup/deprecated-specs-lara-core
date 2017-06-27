function notImplemented(functionName) {
	
	functionName = defaultValue(functionName, "<unknown>");
	
	//println("Objects: " + Debug.getObjects(this).join());
	//println("Weaver functions: " + getFunctions(Weaver).join());
	
	throw "Function " + functionName + " not implemented yet for this weaver implementation";
}

function defaultValue(variable, defaultValue) {
	return variable === undefined ? defaultValue : variable;
}