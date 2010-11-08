_DEVICELOCATION_WM_ = {};

_DEVICELOCATION_WM_.errorMessage = "Sorry, we couldn't locate you.";

_DEVICELOCATION_WM_.Locate = {};
_DEVICELOCATION_WM_.Locate.onlocate = null;
_DEVICELOCATION_WM_.Locate.prelocate= null;
_DEVICELOCATION_WM_.Locate.postlocate= null;
_DEVICELOCATION_WM_.Locate.onerror = null;

_DEVICELOCATION_WM_.disabled = false;

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
			if(!$('approximate')) {
				if($('approximatePlaceName')) 
					$('approximatePlaceName').innerHTML = 'Current Location';
				else {
					var approxPlaceName = new Element('div');
					approxPlaceName.id = 'approximatePlaceName';
					approxPlaceName.style.fontWeight = 'bold';
					approxPlaceName.style.margin = '3px 0px 0px 3px';
					approxPlaceName.innerHTML = 'Current Location';
					
					$('currentAddress').parentNode.insertBefore(approxPlaceName, $('currentAddress'));
				}
			}
			$('currentAddress').innerHTML = displayAddress + ' &#177;' + Math.ceil(position.accuracy) + 'm';
			
			if(_DEVICELOCATION_WM_.marker != null)
				MAP.instances[0].Map.markersLayer.removeMarker(_DEVICELOCATION_WM_.marker);
			else MAP.instances[0].clearPois();
			
			var locateMeIcon =  [{url: '/imageserver/common/images/component/map/markers/standard/icon_emscell_28x28.png',
						  width: 28 , height: 28 , offsetX: -14 , offsetY: -14, 
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
	
	Reporting.to('http://'+window.location.host+'/', {dlat: position.latitude, dlon: position.longitude, prox:position.accuracy}, null);
};

_DEVICELOCATION_WM_.AutoLocate.prelocate = null;

_DEVICELOCATION_WM_.AutoLocate.postlocate = function(lastRecordedPosition) { 
	$('locateMeButton').src = _DEVICELOCATION_WM_.hold;
	
	if(!$defined(lastRecordedPosition)) {
		alert(_DEVICELOCATION_WM_.errorMessage);
		Reporting.to('http://'+window.location.host+'/', {dError: 1}, null);
	}
};

_DEVICELOCATION_WM_.AutoLocate.onerror = function(error) { 
	$('locateMeButton').src = _DEVICELOCATION_WM_.hold; 
	
	if(error.code == error.PERMISSION_DENIED) {
		_DEVICELOCATION_WM_.disabled = true;
		$('locateMeButton').style.opacity = '0.3';
	}
};

_DEVICELOCATION_WM_.AutoLocate.limits = {};
_DEVICELOCATION_WM_.AutoLocate.limits.tries = 10;
_DEVICELOCATION_WM_.AutoLocate.limits.proximity = 50;
_DEVICELOCATION_WM_.AutoLocate.limits.timeout = 30000;
_DEVICELOCATION_WM_.AutoLocate.limits.acceptableProximity = 1000;

//Yellow Mobile Default Parameters
_DEVICELOCATION_YM_ = {};

_DEVICELOCATION_YM_.Locate = {};
_DEVICELOCATION_YM_.Locate.onlocate = null;
_DEVICELOCATION_YM_.Locate.prelocate= null;
_DEVICELOCATION_YM_.Locate.postlocate= null;
_DEVICELOCATION_YM_.Locate.onerror = null;

_DEVICELOCATION_YM_.disabled = false;

_DEVICELOCATION_YM_.marker = null;

_DEVICELOCATION_YM_.AutoLocate = {};


_DEVICELOCATION_YM_.AutoLocate.prelocate = function() {
	
	if ($('findLocationInput').value == 'Current Location') {

		var latField = document.createElement('input');
		latField.setAttribute('id', 'latVal');
		latField.setAttribute('type', 'hidden');
		latField.setAttribute('name', 'lat');
		latField.setAttribute('value', '');
		
		var lonField = document.createElement('input');
		lonField.setAttribute('id', 'lonVal');
		lonField.setAttribute('type', 'hidden');
		lonField.setAttribute('name', 'lon');
		lonField.setAttribute('value', '');

		document.getElementById('findFormModel').appendChild(latField);
		document.getElementById('findFormModel').appendChild(lonField);
	}			
};


_DEVICELOCATION_YM_.AutoLocate.onlocate = function(position) {	
	$('latVal').setAttribute('value', position.latitude);
	$('lonVal').setAttribute('value', position.longitude);
};

_DEVICELOCATION_YM_.AutoLocate.postlocate = function(position) {
	$('findFormModel').submit();
};

_DEVICELOCATION_YM_.AutoLocate.onerror = function(error) { 
	$('findFormModel').submit(); 
};

_DEVICELOCATION_YM_.AutoLocate.limits = {};
_DEVICELOCATION_YM_.AutoLocate.limits.tries = 10;
_DEVICELOCATION_YM_.AutoLocate.limits.proximity = 20;
_DEVICELOCATION_YM_.AutoLocate.limits.timeout = 7000;
_DEVICELOCATION_YM_.AutoLocate.limits.acceptableProximity = 500;

