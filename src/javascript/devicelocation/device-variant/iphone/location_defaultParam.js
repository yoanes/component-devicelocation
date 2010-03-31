_DEVICELOCATION_WM_ = {};

_DEVICELOCATION_WM_.Locate = {};
_DEVICELOCATION_WM_.Locate.onlocate = null;
_DEVICELOCATION_WM_.Locate.onerror = null;
_DEVICELOCATION_WM_.Locate.onprelocate= null;

_DEVICELOCATION_WM_.marker = null;

_DEVICELOCATION_WM_.AutoLocate = {};
_DEVICELOCATION_WM_.AutoLocate.onlocate = function(position) {
	if(position == null) return;
	
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
	
	MAP.instances[0].Geocoder.reverseGeocode(position.longitude, position.latitude, function(addresses) {
		if(addresses.results.length>0){
			var address = addresses.results[0]; 
			var displayAddress = "";
			displayAddress += address.streetNumber + " " + address.street.fullName.toLowerCase() + ", " + address.suburb.toLowerCase() + ", " + address.state;
			$('currentAddress').innerHTML = displayAddress + ' (' + position.accuracy + 'm)';
			
			if(_DEVICELOCATION_WM_.marker != null)
				MAP.instances[0].Map.markersLayer.removeMarker(_DEVICELOCATION_WM_.marker);
			
			var locateMeIcon =  [{url: '/imageserver/common/images/component/map/markers/standard/dot_23x27.png',
						  width: 23 , height: 27 , offsetX: -8 , offsetY: -27 , 
						  coordinates: { latitude: position.latitude , longitude: position.longitude }
						}];
			
			var locateMeMarker = {coordinates: locateMeIcon[0].coordinates};
			
			var locateMeIcon = {url: locateMeIcon[0].url, 
					width: locateMeIcon[0].width,
					height: locateMeIcon[0].height,
					offsetX: locateMeIcon[0].offsetX,
					offsetY: locateMeIcon[0].offsetY
				};
			
			_DEVICELOCATION_WM_.marker = MAP.instances[0].addPoi(locateMeMarker, locateMeIcon);
		}
	});
	
	Reporting.to('http://'+window.location.host+'/?dlat='+position.latitude+'&dlon='+position.longitude+'&prox='+position.accuracy);
};

_DEVICELOCATION_WM_.AutoLocate.onerror = null;
_DEVICELOCATION_WM_.AutoLocate.onprelocate= null;

_DEVICELOCATION_WM_.options = {};
_DEVICELOCATION_WM_.options.timeout = 2000;
_DEVICELOCATION_WM_.options.maximumAge = 0;
_DEVICELOCATION_WM_.options.enableHighAccuracy = true;