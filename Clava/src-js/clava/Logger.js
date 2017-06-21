/**
 * Logger object, for printing/saving information.
 */
var Logger = function(isGlobal, filename) {
  
  //(new lara$profiling$Energy$EnergyTest()).call();
  if(isGlobal) {
	println("[Logger-warning] global Logger is not implemented yet, reverting to local Logger");
	isGlobal = false;
  }
  
  this.currentElements = [];
  //this.functionsSetup = new Set();
  this.functionMap = {}; 
  
  this.isGlobal = isGlobal === undefined ? false : isGlobal;
  this.filename = filename;
  /*
  this.isGlobalFn = isGlobalFn;
  this.add = add;
  this.addDouble = addDouble;
  this.log = log;
  
  // Private functions
  this._warn = _warn;
  this._setup = _setup;
  this._nextId = _nextId;
  */
};

// Global id for loggers
var clava_logger_id = 0;

Logger.prototype._nextLoggerName = function() {
	var id = clava_logger_id;
	clava_logger_id++;
	return "clava_logger_" + id;
}

/*
Logger.prototype._nextId = function() {
	var id = clava_logger_id;
	clava_logger_id++;
	return id;
}
*/
Logger.prototype.isGlobalFn = function() {  
    println("Is Global Fn:" + this.isGlobal);
}

Logger.prototype.add = function(message) {
	// Do not push message if empty
	if(message === "") {
		return this;
	}
	
	this.currentElements.push("\"" + message + "\"");
	return this;
}

Logger.prototype.addDouble = function(expr) {
	this.currentElements.push(expr);
	return this;
}

Logger.prototype.log = function($jp, insertBefore) {
	
	// Verify that $jp is inside a function
	$function = $jp.ancestor("function");
	if($function === undefined) {
		_warn("Given joinpoint ("+$jp+") is not inside a function, returning");
		return;
	}
	
	
	var loggerName = this._setup($function);
    if(loggerName === undefined) {
		return;
	}

	if(insertBefore === undefined) {
		insertBefore = false;
	}
	
	if(this.currentElements.length === 0) {
		_info("Nothing to log, call add() first");
		return;
	}
	
	
	
	// Create code from elements
	var code = loggerName + ".msg(" + this.currentElements.join(" ,") + ");";
	//println("Code:" + code);
	
	//call LoggerInsert($jp, code, insertBefore);
	$jp.insertAfter(code);
	
	
	
	// Clear internal state
	this.currentElements = [];
}


/**** PRIVATE METHODS ****/

Logger.prototype._warn = function(message) {
		println("[Logger Warning] " + message);
}

Logger.prototype._info = function(message) {
		println("[Logger] " + message);
}

/**
 Sets up the code for the Logger in the function that is called
 */
Logger.prototype._setup = function($function) {

	// Check if setup was already called for this function
	var declaration = $function.declaration;
	var loggerName = this.functionMap[declaration];
/*
	map[myKey1] = myObj1;
map[myKey2] = myObj2;

function get(k) {
    return map[k];
}
*/
	if(loggerName !== undefined) {
		return loggerName;
	} else {
		loggerName = this._nextLoggerName();
		this.functionMap[declaration] = loggerName;
	}
	
	/*
	if(this.functionsSetup.has(declaration)) {
		return true;
	} else {
		this.functionsSetup.add(declaration);
	}
	*/
	
	var $file = $function.ancestor('file');
	
	// C not supported yet
	if(!$file.isCxx) {
		_warn("Cannot log on file " + $file.name + ", not yet implemented for C files, only C++");
		return undefined;
	}
	
	
	// Add include to Logger
	$file.addInclude("SpecsLogger.h", false);
	
	// Get correct logger
	var loggerDecl = undefined;
	
	// If filename use FileLogger 
	if(this.filename !== undefined) {
		loggerDecl = "FileLogger " + loggerName + "(\"" + this.filename + "\");";
	}
	// Otherwise, use ConsoleLogger
	else {
		loggerDecl = "ConsoleLogger " + loggerName + ";";
	}
	
	// Add declaration of correct logger
	$function.body.insertBegin(loggerDecl);

	return loggerName;
}


