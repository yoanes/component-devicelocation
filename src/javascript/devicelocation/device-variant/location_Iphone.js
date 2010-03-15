var LocationUtilities = new Class({
	locationId: null,
	_parseLocation: null,
	
	initialize: function(processLocation) {
		this.register(processLocation);
	},
	
	/** 
	 * use this to update how to parse the location
	 */
	register: function(processLocationWith) {
		if(processLocationWith instanceof Function)
			this._parseLocation = processLocationWith;
	},
	
	parseLocation: function(position){
		if($defined(this._parseLocation) && this._parseLocation instanceof Function) 
			this._parseLocation(position.coords, position.timestamp);
		else {
			try {
				sensis.extract(position);
				sensis.extract(position.coords);
			}
			catch(exception) {
				return true;
			}
		}
	},
	
	parseError: function(error) {
		try {
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
		catch(exception) {
			return true;
		}
	},
	
	locate: function() {
		navigator.geolocation.getCurrentPosition(this.parseLocation.bind(this), this.parseError.bind(this));
	},
	
	autoLocate: function(){
		this.locationId = navigator.geolocation.watchPosition(this.parseLocation.bind(this), this.parseError.bind(this));
	},
	
	stop: function() {
		navigator.geolocation.clearWatch(this.locationId);
	}
});