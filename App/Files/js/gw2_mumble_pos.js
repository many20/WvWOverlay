Components.utils.import("resource://gre/modules/ctypes.jsm");

function handlePosition(){
	
	var lib = ctypes.open("C:\\WINDOWS\\system32\\user32.dll");

	HANDLE hMapObject = OpenFileMappingW(FILE_MAP_ALL_ACCESS, FALSE, L"MumbleLink");
	
	lib.close();
	
};
