DEVICELOCATION = {};
DEVICELOCATION.instances = new Array();

var DeviceLocation = new Class({
	locationId: null,
	
	/*** locate() specific parser ***/
	/* functions to be executed on success and failure respectively */
	_parseLocation_locate: null,
	_parseError_locate: null,
	
	/* functions to be executed before any location request is fired off */
	_preLocating_locate: null,
	/*** --- ***/
	
	/*** autoLocate() specific parser ***/
	/* functions to be executed on success and failure respectively */
	_parseLocation_autolocate: null,
	_parseError_autolocate: null,
	
	/* functions to be executed before any location request is fired off */
	_preLocating_autolocate: null,
	/*** --- ***/
	
	/*** other options ***/
	
	/* timeout before we stop trying and give back the error */
	_timeout: 2000,
	
	/* how long should the position be cached */
	_maximumAge: 0,
	
	_enableHighAccuracy: false,
	/*** --- ***/
	
	nth: null,
	
	lastRecordedPosition: null,
	
	/* options will take the following 
	 * proximity: in meters, what's the acceptable radius
	 * timeout: in ms, how long do you allow the component to locate you accurately before giving up
	 * recency: in ms, how long do you want your location to be cache
	 * 
	 */
	initialize: function(locateOptions, autoLocateOptions, options) {
		if($defined(locateOptions)) {
			this._parseLocation_locate = locateOptions.onlocate;
			this._parseError_locate = locateOptions.onerror;
			this._preLocating_locate = locateOptions.onprelocate;
		}
		
		if($defined(autoLocateOptions)) {
			this._parseLocation_autolocate = autoLocateOptions.onlocate;
			this._parseError_autolocate = autoLocateOptions.onerror;
			this._preLocating_autolocate = autoLocateOptions.onprelocate;
		}
		
		if($defined(options)) {
			if($defined(options.timeout)) this._timeout = options.timeout;
			if($defined(options.maximumAge)) this._maximumAge = options.maximumAge;
			if($defined(options.enableHighAccuracy)) this._enableHighAccuracy = options.enableHighAccuracy;
		}
		
		/* add to the global component instances */
		this.nth = DEVICELOCATION.instances.push(this) - 1;
	},
	
	_parseLocation_basic: function(position) {
		try {
			sensis.extract(position);
			sensis.extract(position.coords);
		}
		catch(exception) {}
	},
	
	_parseError_basic: function(error) {
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
		catch(exception) {}
	},
	
	parseLocation_locate: function(position){
		this.lastRecordedPosition = position;
		if($defined(this._parseLocation_locate) && this._parseLocation_locate instanceof Function) {
			this._parseLocation_locate(position.coords, position.timestamp);
		}
		else this._parseLocation_basic(position);
	},
	
	parseError_locate: function(error) {
		if($defined(this._parseError_locate) && this._parseError_locate instanceof Function) 
			this._parseError_locate(error);
		else this._parseError_basic(error);
	},
	
	parseLocation_autolocate: function(position){
		this.lastRecordedPosition = position;
		if($defined(this._parseLocation_autolocate) && this._parseLocation_autolocate instanceof Function) {
			this._parseLocation_autolocate(position.coords, position.timestamp);
		}
		else this._parseLocation_basic(position);
	},
	
	parseError_autolocate: function(error) {
		if($defined(this._parseError_autolocate) && this._parseError_autolocate instanceof Function) 
			this._parseError_autolocate(error);
		else this._parseError_basic(error);
	},
	
	pointWithinRadius: function(radius) {
		if(this.lastRecordedPosition.accuracy <= radius) return true;
		else return false;
	},

	locate: function() {
		navigator.geolocation.getCurrentPosition(this.parseLocation_locate.bind(this), this.parseError_locate.bind(this), {'maximumAge': this._maximumAge, 'timeout': this._timeout, 'enableHighAccuracy': this._enableHighAccuracy});
	},
	
	/** the below are assumed not to be used at this stage. Usefull for 'followMe' kind of functionality **/
	autoLocate: function(){
		this.locationId = navigator.geolocation.watchPosition(this.parseLocation_autolocate.bind(this), this.parseError_autolocate.bind(this), {'maximumAge': this._maximumAge, 'timeout': this._timeout, 'enableHighAccuracy': this._enableHighAccuracy});
	},
	
	stop: function() {
		navigator.geolocation.clearWatch(this.locationId);
	}
});