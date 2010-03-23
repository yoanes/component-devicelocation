_DEVICELOCATION_WM_ = {};

_DEVICELOCATION_WM_.processLocation = function(position, timestamp) {
	/* do redirect for now */
	window.location = 'http://'+window.location.host+'/?dlat='+position.latitude+'&dlon='+position.longitude;
};

_DEVICELOCATION_WM_.Locate = {};
_DEVICELOCATION_WM_.Locate.onlocate = null;
_DEVICELOCATION_WM_.Locate.onerror = null;
_DEVICELOCATION_WM_.Locate.onprelocate= null;

_DEVICELOCATION_WM_.AutoLocate = {};
_DEVICELOCATION_WM_.AutoLocate.onlocate = null;
_DEVICELOCATION_WM_.AutoLocate.onerror = null;
_DEVICELOCATION_WM_.AutoLocate.onprelocate= null;