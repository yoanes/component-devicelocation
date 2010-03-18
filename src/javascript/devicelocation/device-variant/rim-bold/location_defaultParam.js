_DEVICELOCATION_WM_.defaultProcessLocation = function(position, timestamp) {
	var domain = window.location.host;
	/* do redirect for now */
	window.location = 'http://'+domain+'/?lat='+position.latitude+'&lon='+position.longitude;
}