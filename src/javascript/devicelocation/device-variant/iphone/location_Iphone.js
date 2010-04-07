DEVICELOCATION = {};
DEVICELOCATION.instances = new Array();

var DeviceLocation = new Class({
	
	/*** locate() specific parser ***/
	/* functions to be executed on success and failure respectively */
	_parseLocation_locate: null,
	_parseError_locate: null,
	
	/* functions to be executed before any location request is fired off */
	_preLocating_locate: null,
	
	/* Timeout before we stop trying and give back the error. Default 5 seconds. */
	_locateTimeout: 5000,
	
	/* How long should the position be cached. Default 5 minutes. */
	_locateMaximumAge: 300000,
	
	/* Should we enable the high accuracy locating (GPS). Default false.*/
	_locateEnableHighAccuracy: false,
	
	/*** --- ***/
	
	/* Provides the id of the system watchPosition operation. */
	_autoLocateLocationId: null,
	
	/* Functions to be executed on success. */
	_parseLocation_autolocate: null,
	/* Functions to be executed and failure respectively. */
	_parseError_autolocate: null,
	
	/* Functions to be executed before any location request is fired off */
	_preLocating_autolocate: null,

	_autolocate_done: null, 
	/*** --- ***/
	
	/* Timeout before we stop trying and give back the error. Default 30 seconds. */
	_autoLocateTimeout: 30000,
	
	/* How long should the position be cached. Default 0 seconds (never). */
	_autoLocateMaximumAge: 0,

	/* How many responses should we get before we stop. Default 10 responses. */
	_autoLocateMaximumTries: 10, 

	/* How many responses have we had. Starts at zero. */
	_autoLocateTriesCounter: 0, 
	
	/* What is the maximum proximity which is good enough to use. */
	_autoLocateMaximumProximity: 1000, 
	
	/* What is the goal proximity - we can stop locating its that good! */
	_autoLocateGoalProximity: 50,
	
	/* Should we enable the high accuracy locating (GPS). Default true. */
	_autoLocateEnableHighAccuracy: true,
	
	/* A flag using during the auto locate processing - it means we can stop the current locate process. */
	_autoLocateStopMeNow: false,
	
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

			if($defined(options.locateTimeout)) this._locateTimeout = options.locateTimeout;
			if($defined(options.locateMaximumAge)) this._locateMaximumAge = options.locateMaximumAge;
			if($defined(options.locateEnableHighAccuracy)) this._locateEnableHighAccuracy = options.locateEnableHighAccuracy;
			
			if($defined(options.autoLocateTimeout)) this._autoLocateTimeout = options.autoLocateTimeout;
			if($defined(options.autoLocateMaximumAge)) this._autoLocateMaximumAge = options.autoLocateMaximumAge;
			if($defined(options.autoLocateMaximumTries)) this._autoLocateMaximumTries = options.autoLocateMaximumTries;
			if($defined(options.autoLocateMaximumProximity)) this._autoLocateMaximumProximity = options.autoLocateMaximumProximity;
			if($defined(options.autoLocateGoalProximity)) this._autoLocateGoalProximity = options.autoLocateGoalProximity;
			if($defined(options.autoLocateEnableHighAccuracy)) this._autoLocateEnableHighAccuracy = options.autoLocateEnableHighAccuracy;
			
		}
		
		/* add to the global component instances */
		this.nth = DEVICELOCATION.instances.push(this) - 1;
	},
	
	_parseLocation_basic: function(position) {
		try {
			sensis.log("Location: (" + position.coords.latitude + " " + position.coords.longitude + "), " + position.coords.accuracy + ", " + position.timestamp);
		}
		catch(exception) {}
	},
	
	_autolocate_done_default: function(position) {
		try {
			
			if (position != null) {
				
				sensis.log("Best Location: (" + position.coords.latitude + " " + position.coords.longitude + "), " + position.coords.accuracy + ", " + position.timestamp);
				
			} else { 
			
				sensis.log("No Location !!!");
			}
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
				
		this._autoLocateTriesCounter = this._autoLocateTriesCounter + 1;
		
		sensis.log("Tries is " + this._autoLocateTriesCounter);
		
		/*
		 * Monster Logic...
		 * 
		 * Basically - we want to use the position if it is better than, the one we have.
		 * Also, we have had some edge cases where the reported accuracy is the 
		 * same (500m) - but the position is actually better.
		 */
		if ((position != null) &&
		    (position.coords.accuracy < this._autoLocateMaximumProximity) &&
		    ((this.lastRecordedPosition == null) ||
	         (position.coords.accuracy < this.lastRecordedPosition.coords.accuracy) ||
	         ((position.coords.accuracy == this.lastRecordedPosition.coords.accuracy) &&
	          ((position.coords.latitude != this.lastRecordedPosition.coords.latitude) ||
	           (position.coords.longitude != this.lastRecordedPosition.coords.longitude))))) {

			this.lastRecordedPosition = position;
			
			sensis.log("Accuracy is " + this.lastRecordedPosition.coords.accuracy + "m");
		
			if($defined(this._parseLocation_autolocate) && this._parseLocation_autolocate instanceof Function) {
				 				
				this._parseLocation_autolocate(position.coords, position.timestamp, position.accuracy);
				
			} else { 
				this._parseLocation_basic(position);
			}
		}
		
		if (this._autoLocateTriesCounter >= this._autoLocateMaximumTries) { 
		
			sensis.log("Maximum Tries Reached");
			this._autoLocateStopMeNow = true;
		}
		
		if ((this.lastRecordedPosition != null) && 
			(this.lastRecordedPosition.coords.accuracy < this._autoLocateGoalProximity)) { 
		
			sensis.log("Goal Proximity Reached");
			this._autoLocateStopMeNow = true;
		}
		
		if (this._autoLocateStopMeNow) { 
		
			this.stop();
			
			if($defined(this._autolocate_done) && this._autolocate_done instanceof Function) {				
				this._autolocate_done();
				
			} else {				
				this._autolocate_done_default(this.lastRecordedPosition);
			}	
		}
	},
	
	parseError_autolocate: function(error) {
		if($defined(this._parseError_autolocate) && this._parseError_autolocate instanceof Function) 
			this._parseError_autolocate(error);
		else this._parseError_basic(error);
	},
	
	pointWithinRadius: function(radius) {
		if(this.lastRecordedPosition.coords.accuracy <= radius) return true;
		else return false;
	},

	/** A locate me once function */
	locate: function() {
		navigator.geolocation.getCurrentPosition(this.parseLocation_locate.bind(this), this.parseError_locate.bind(this), {'maximumAge': this._locateMaximumAge, 'timeout': this._locateTimeout, 'enableHighAccuracy': this._locateEnableHighAccuracy});
	},
	
	/** Triggers the follow me style of locating.  Location call backs will be received until you call stop. */
	autoLocate: function(){
		this._autoLocateTriesCounter = 0;
		this._autoLocateStopMeNow = false;
		this._autoLocateLocationId = navigator.geolocation.watchPosition(this.parseLocation_autolocate.bind(this), this.parseError_autolocate.bind(this), {'maximumAge': this._autoLocateMaximumAge, 'timeout': this._autoLocateTimeout, 'enableHighAccuracy': this._autoLocateEnableHighAccuracy});
	},
	
	stop: function() {
		navigator.geolocation.clearWatch(this._autoLocateLocationId);
	}
});