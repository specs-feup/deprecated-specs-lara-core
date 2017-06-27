var System = {};

/**
 * Returns the name of the platform where this code is executing
 */
System.getCurrentPlatform = function() {
	notImplemented("getCurrentPlatform");
}

System.getExecutable = function(foldername) {
	return Java.type('pt.up.fe.specs.clang.Platforms').getExecutable(foldername);
}

System.prepareExe = function(executable) {
	return LARASystem.prepareExe(executable);
}
