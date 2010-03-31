_DEVICELOCATION_WM_ = {};

_DEVICELOCATION_WM_.Locate = {};
_DEVICELOCATION_WM_.Locate.onlocate = null;
_DEVICELOCATION_WM_.Locate.onerror = null;
_DEVICELOCATION_WM_.Locate.onprelocate= null;

_DEVICELOCATION_WM_.AutoLocate = {};
_DEVICELOCATION_WM_.AutoLocate.onlocate = function(position, timestamp) {
	if(position == null) return;
	/* do redirect for now */
	window.location = 'http://'+window.location.host+'/?dlat='+position.latitude+'&dlon='+position.longitude;
};

_DEVICELOCATION_WM_.AutoLocate.onerror = null;
_DEVICELOCATION_WM_.AutoLocate.onprelocate= null;

_DEVICELOCATION_WM_.options = {};
_DEVICELOCATION_WM_.options.timeout = 2000;
_DEVICELOCATION_WM_.options.maximumAge = 0;
_DEVICELOCATION_WM_.options.enableHighAccuracy = true;