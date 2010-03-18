var LocationUtilities = new Class({
	locationId: null,
	_parseLocation: null,
	
	initialize: function(processLocation) {
		if(processLocation instanceof Function) 
			_parseLocation = processLocation;
		
		try { blackberry.location.setAidMode(1); }
		catch(err) { 
			if($defined(sensis) && sensis instanceof Logger)
				sensis.warn("Location error: " + err);
			blackberry.location.setAidMode(2); 
		}
	},
	
	parseLocation: function(){
		if($defined(this._parseLocation) && this._parseLocation instanceof Function) 
			this._parseLocation(blackberry.location, $time());
		else {
			if($defined(sensis) && sensis instanceof Logger) {
				sensis.extract(blackberry.location);
			}
		}
	},
	
	parseLocationOnce: function() {
		if($defined(this._parseLocation) && this._parseLocation instanceof Function) 
			this._parseLocation(blackberry.location, $time());
		else {
			if($defined(sensis) && sensis instanceof Logger) {
				sensis.extract(blackberry.location);
			}
		}
		this.stop();
	},
	
	parseError: function(error) {
		if(sensis instanceof Logger) {
			switch(error.code) {
				case error.PERMISSION_DENIED:
					sensis.warn("Location Error: Permission denied.");
					break;
				
				case error.POSITION_UNAVAILABLE:
					sensis.warn("Location Error: Position unavailable.");
					break;
				
				default:
					sensis.warn("Location error: unknown");
			}
		}
	},
	
	locate: function() {
		blackberry.location.onLocationUpdate(this.parseLocationOnce);
		blackberry.location.refreshLocation();
	},
	
	autoLocate: function(){
		blackberry.location.onLocationUpdate(this.parseLocation);
		blackberry.location.refreshLocation();
	},
	
	stop: function() {
		blackberry.location.removeLocationUpdate(this.parseLocation);
	}
});