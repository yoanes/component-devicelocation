_DEVICELOCATION_WM_ = {};

_DEVICELOCATION_WM_.defaultOption = {'proximity': 5, 'timeout' : 10000};

_DEVICELOCATION_WM_.defaultPreLocating = null;

_DEVICELOCATION_WM_.defaultProcessLocation = function(position, timestamp) {
	/* grab the user location lat lon and convert it to that of EMS' */
	var userLatLon = MAP.instances[0].formatLatLon(position);
	/* grab the location in px */
	var userPos = MAP.instances[0].Map.getPixelFromLonLat(userLatLon);
	/* grab the center of the map in px */
	var centerPos = MAP.instances[0].Map.getPixelFromLonLat(MAP.instances[0].Map.getCenter());
	
	/* calculate the distance in px */
	var panBy = new OpenLayers.Pixel(userPos.x - centerPos.x, userPos.y - centerPos.y);
	/* do the pan */
	MAP.instances[0].Map.pan(panBy.x, panBy.y, {animate:true});
	/* zoom in if the map is zoom out too much */
	if(MAP.instances[0].Map.getZoom() < 9)
		MAP.instances[0].Map.zoomTo.delay(500, this, new Array(11));
	/* alternate version
	 * setTimeout(function() {EMS.Util.smoothZoom(MAP.instances[0].Map, MAP.instances[0].Map.getCenter(), userLatLon, 11 );} , 500);
	 * 
	 */
}

_DEVICELOCATION_WM_.defaultProcessError = null;