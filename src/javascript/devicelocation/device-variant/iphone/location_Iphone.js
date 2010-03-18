DEVICELOCATION = {};
DEVICELOCATION.instances = new Array();

var DeviceLocation = new Class({
	locationId: null,
	
	/* functions to be executed on success and failure respectively */
	_parseLocation: null,
	_parseError: null,
	
	/* functions to be executed before any location request is fired off */
	_preLocating: null,
	
	/* accuracy limit */
	_proximity: 500,
	
	/* timeout before we stop trying and give back the final result */
	_timeout: 2000,
	
	/* how long should the position be cached */
	_recency: 0,

	nth: null,
	
	/* options will take the following 
	 * proximity: in meters, what's the acceptable radius
	 * timeout: in ms, how long do you allow the component to locate you accurately before giving up
	 * recency: in ms, how long do you want your location to be cache
	 * 
	 */
	initialize: function(preProcessWith, processLocation, processError, options) {
		this.register(preProcessWith, processLocation, processError);
		
		if($defined(options)) {
			if($defined(options.proximity)) this._proximity = options.proximity;
			if($defined(options.timeout)) this._timeout = options.timeout;
			if($defined(options.recency)) this._recency = options.recency;
		}
		
		/* add to the global component instances */
		this.nth = DEVICELOCATION.instances.push(this) - 1;
	},
	
	/** 
	 * use this to update how to parse the location
	 */
	register: function(preProcessWith, processLocationWith, processFailureWith) {
		if(processLocationWith instanceof Function)
			this._parseLocation = processLocationWith;

		if(processFailureWith instanceof Function)
			this._parseError = processFailureWith;
		
		if(preProcessWith instanceof Function)
			this._preLocating = preProcessWith;
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
		if(this.isAccurateEnough(position)) this.stop();
	},
	
	parseError: function(error) {
		if($defined(this._parseError) && this._parseError instanceof Function) 
			this._parseError(error);
		else {
			try {
				switch(error.code) {
					case error.PERMISSION_DENIED:
						sensis.warn("Location Error: Permission denied.");
						break;
					
					case error.POSITION_UNAVAILABLE:
						sensis.warn("Location Error: Position unavailable.");
						break;
					
					default:
						sensis.warn("Location Error: Unknown");
				}
			}
			catch(exception) {
				return true;
			}
		}
	},
	
	isAccurateEnough: function(position) {
		if(position.accuracy <= this._proximity) return true;
		else return false;
	},

	locate: function() {
		navigator.geolocation.getCurrentPosition(this.parseLocation.bind(this), this.parseError.bind(this), {'maximumAge': this._recency});
	},
	
	/** the below are assumed not to be used at this stage. Usefull for 'followMe' kind of functionality **/
	autoLocate: function(){
		this.locationId = navigator.geolocation.watchPosition(this.parseLocation.bind(this), this.parseError.bind(this), {'maximumAge': this._recency});
	},
	
	stop: function() {
		navigator.geolocation.clearWatch(this.locationId);
	},
	
	keepLocating: function() {
		if(this._preLocating != null && this._preLocating instanceof Function)
			this._preLocating();
		this.autoLocate();
		this.stop.delay(this._timeout, this);
	}
});