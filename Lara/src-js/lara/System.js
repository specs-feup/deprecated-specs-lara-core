function getExecutable(foldername) {
	return Java.type('pt.up.fe.specs.clang.Platforms').getExecutable(foldername);
}

function prepareExe(executable) {
	return LARASystem.prepareExe(executable);
}