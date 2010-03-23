_DEVICELOCATION_WM_ = {};

_DEVICELOCATION_WM_.processLocation = function(position) {
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
		setTimeout(function() {EMS.Util.smoothZoom(MAP.instances[0].Map, MAP.instances[0].Map.getCenter(), userLatLon, 11 );} , 500);
	/* alternate version */
	/*	MAP.instances[0].Map.zoomTo.delay(500, this, new Array(11)); */	
	
	MAP.instances[0].Geocoder.reverseGeocode(userLatLon.longitude, userLatLon.latitude, function(addresses) {
		if(addresses.results.length>0){
			var address = addresses.results[0]; 
			var displayAddress = "";
			displayAddress += address.streetNumber + " " + address.street.fullName + ", " + address.suburb + ", " + address.state;
			$('currentAddress').innerHTML = displayAddress;
		}
	});
	
	Reporting.to('http://'+window.location.host+'/?lat='+userLatLon.latitude+'&lon='+userLatLon.longitude);
};

_DEVICELOCATION_WM_.Locate = {};
_DEVICELOCATION_WM_.Locate.onlocate = null;
_DEVICELOCATION_WM_.Locate.onerror = null;
_DEVICELOCATION_WM_.Locate.onprelocate= null;

_DEVICELOCATION_WM_.AutoLocate = {};
_DEVICELOCATION_WM_.AutoLocate.onlocate = null;
_DEVICELOCATION_WM_.AutoLocate.onerror = null;
_DEVICELOCATION_WM_.AutoLocate.onprelocate= null;