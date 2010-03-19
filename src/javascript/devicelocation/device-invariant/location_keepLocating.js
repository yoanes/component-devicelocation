_DEVICELOCATION_WM_.keepLocating = function(timeout, recency, proximity) {
	var stop = false;
	var radius = proximity;
	
	var currentPosition = null;
	var stop = false;
	var gps = new DeviceLocation({
		'onlocate': function(position, timestamp) {
			return position;
		}
	}, null, _DEVICELOCATION_WM_.defaultOption );
	
	gps.locate();
	/* set the timeout */
	setTimeout(function() { stop = true; }, timeout);
	setInterval(function(){ currentPosition = gps.lastRecordedPosition; }, 100);
	/* keep looping while conditions not met */
	while(!stop) {
		if(!gps.pointWithinRange(proximity))
			gps.locate();
		else { 
			stop = true;
			break;
		}
	}
	
	_DEVICELOCATION_WM_.processLocation(currentPosition);
};
