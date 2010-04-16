DEVICELOCATION = {};
DEVICELOCATION.instances = new Array();

var DeviceLocation = new Class({
	
	/** locate parameters **/
	locate_preLocate: null,
	locate_onLocate: null,
	locate_postLocate: null,
	locate_onError: null,
	
	locate_options_timeout: 5000,
	locate_options_maximumAge: 0,
	locate_options_enableHighAccuracy: false,
	
	locate_lastRecordedPosition: null,
	
	/** autolocate parameters **/
	autoLocate_preLocate: null,
	autoLocate_onLocate: null,
	autoLocate_postLocate: null,
	autoLocate_onError: null,
	
	_autoLocate_locationId: null,
	_autoLocate_timeoutId: null,
	_autoLocate_try_counter: 0,
	
	autoLocate_options_timeout: 10000,
	autoLocate_options_maximumAge: 0,
	autoLocate_options_enableHighAccuracy: true,
	
	autoLocate_limits_tries: null,
	autoLocate_limits_proximity: null,
	autoLocate_limits_timeout: null,
	autoLocate_limits_acceptableProximity: null,
	
	autoLocate_lastRecordedPosition: null,
	
	nth: null,
	
	/* options will take the following 
	 * proximity: in meters, what's the acceptable radius
	 * timeout: in ms, how long do you allow the component to locate you accurately before giving up
	 * recency: in ms, how long do you want your location to be cache
	 * 
	 */
	initialize: function(locateObj, autoLocateObj) {
		if($defined(locateObj)) {
			this.locate_preLocate = locateObj.prelocate;
			this.locate_onLocate = locateObj.onlocate;
			this.locate_postLocate = locateObj.postlocate;
			this.locate_onError = locateObj.onerror;
			
			if($defined(locateObj.options)) {
				this.locate_options_timeout = locateObj.options.timeout;
				this.locate_options_maximumAge = locateObj.options.maximumAge;
				this.locate_options_enableHighAccuracy = locateObj.options.enableHighAccuracy;
			}
		}
		
		if($defined(autoLocateObj)) {
			this.autoLocate_preLocate = autoLocateObj.prelocate;
			this.autoLocate_onLocate = autoLocateObj.onlocate;
			this.autoLocate_postLocate = autoLocateObj.postlocate;
			this.autoLocate_onError = autoLocateObj.onerror;
			
			if($defined(autoLocateObj.options)) {
				this.autoLocate_options_timeout = autoLocateObj.options.timeout;
				this.autoLocate_options_maximumAge = autoLocateObj.options.maximumAge;
				this.autoLocate_options_enableHighAccuracy = autoLocateObj.options.enableHighAccuracy;
			}
			
			if($defined(autoLocateObj.limits)) {
				this.autoLocate_limits_tries = autoLocateObj.limits.tries;
				this.autoLocate_limits_proximity = autoLocateObj.limits.proximity;
				this.autoLocate_limits_timeout = autoLocateObj.limits.timeout;
				this.autoLocate_limits_acceptableProximity = autoLocateObj.limits.acceptableProximity;
			}
		}
		
		/* add to the global component instances */
		this.nth = DEVICELOCATION.instances.push(this) - 1;
	},
	
	/* default method for onLocate */
	default_onLocate: function(position) {
		try {
			sensis.extract(position.coords);
			
			sensis.log('-- Locate properties --');
			sensis.log('Best recorded position:' + this.locate_lastRecordedPosition);
			sensis.log('-- END Locate properties --');
			
			sensis.log('-- AutoLocate properties --');
			sensis.log('Try ' + this._autoLocate_try_counter + ' of ' + this.autoLocate_limits_tries);
			sensis.log('Accuracy: ' + this.autoLocate_lastRecordedPosition.coords.accuracy + ' of ' + this.autoLocate_limits_proximity);
			sensis.log('Best recorded position:' + this.autoLocate_lastRecordedPosition);
			sensis.log('-- END AutoLocate properties --');
		}
		catch(exception) {}
	},
	
	/* default method for onError */
	default_onError: function(error) {
		try {
			switch(error.code) {
				case error.PERMISSION_DENIED:
					sensis.warn("Location Error: Permission denied.");
					break;
				
				case error.POSITION_UNAVAILABLE:
					sensis.warn("Location Error: Position unavailable.");
					break;
				
				case error.TIMEOUT:
					sensis.warn("Location Error: Timeout.");
					break;
					
				default:
					sensis.warn("Location Error: Unknown");
			}
		}
		catch(exception) {}
		
		/* stop any further process if exist */
		this.stop();
	},
	
	locate_parseLocation: function(position) {
		this.locate_lastRecordedPosition = position;
		
		if($defined(this.locate_onLocate) && this.locate_onLocate instanceof Function)
			this.locate_onLocate(position.coords, position.timestamp);
		else this.default_onLocate(position);
		
		if($defined(this.locate_postLocate) && this.locate_postLocate instanceof Function) {
			this.locate_postLocate();
		}
	},

	locate_parseError: function(error) {
		if($defined(this.locate_onError) && this.locate_onError instanceof Function) 
			this.locate_onError(error);
		else this.default_onError(error);
	},
	
	autoLocate_parseLocation: function(position) {
		if(position == null) return;
		
		/* always consider the first position returned regardless */
		if(this.autoLocate_lastRecordedPosition == null) {
			this.autoLocate_lastRecordedPosition = position;
			
			if($defined(this.autoLocate_onLocate) && this.autoLocate_onLocate instanceof Function)			
				this.autoLocate_onLocate(position.coords, position.timestamp);
			else this.default_onLocate(position);
		}
		
		/*
		 * Monster Logic...
		 * 
		 * Basically - we want to use the position if it is better than, the one we have.
		 * Also, we have had some edge cases where the reported accuracy is the 
		 * same (500m) - but the position is actually better.
		 */
		else if((position.coords.accuracy < this.autoLocate_lastRecordedPosition.coords.accuracy) ||
				((position.coords.accuracy == this.autoLocate_lastRecordedPosition.coords.accuracy) &&
				 ((position.coords.latitude != this.autoLocate_lastRecordedPosition.coords.latitude) ||
				  (position.coords.longitude != this.autoLocate_lastRecordedPosition.coords.longitude)))) {
			
			/* if an acceptableProximity limit is set */
			if($defined(this.autoLocate_limits_acceptableProximity) && (this.autoLocate_limits_acceptableProximity > 0)) {
				/* then only consider the positions with better accuracy then the set limit */
				if(position.coords.accuracy < this.autoLocate_limits_acceptableProximity) {
					this.autoLocate_lastRecordedPosition = position;
					
					if($defined(this.autoLocate_onLocate) && this.autoLocate_onLocate instanceof Function)			
						this.autoLocate_onLocate(position.coords, position.timestamp);
					else this.default_onLocate(position);
				}
			}
			
			/* otherwise proceed as normal */
			else {
				this.autoLocate_lastRecordedPosition = position;
			
				if($defined(this.autoLocate_onLocate) && this.autoLocate_onLocate instanceof Function)			
					this.autoLocate_onLocate(position.coords, position.timestamp);
				else this.default_onLocate(position);
			}
		}
		
		/* check if the number of tries has hit the specified limit */
		if($defined(this.autoLocate_limits_tries) && (this.autoLocate_limits_tries > 0)) {
			this._autoLocate_try_counter++;
			if(this._autoLocate_try_counter >= this.autoLocate_limits_tries)
				this.stop(); return;
		}
		
		/* check if the recorded position has hit the desired proximity (if set) */
		if($defined(this.autoLocate_limits_proximity) && (this.autoLocate_limits_proximity > 0)) {
			if(this.autoLocate_lastRecordedPosition < this.autoLocate_limits_proximity)
				this.stop(); return;
		}
	},
	
	autoLocate_parseError: function(error) {
		if($defined(this.autoLocate_onError) && this.autoLocate_onError instanceof Function) 
			this.autoLocate_onError(error);
		else this.default_onError(error);
	},
	
	/** A locate me once function */
	locate: function() {
		if($defined(this.locate_preLocate) && this.locate_preLocate instanceof Function)
			this.locate_preLocate();
		
		navigator.geolocation.getCurrentPosition(this.locate_parseLocation.bind(this), this.locate_parseError.bind(this), 
				{'maximumAge': this.locate_options_maximumAge, 
				 'timeout': this.locate_options_timeout,
				 'enableHighAccuracy': this.locate_options_enableHighAccuracy}
		);
	},
	
	/** Triggers the follow me style of locating.  Location call backs will be received until you call stop. */
	autoLocate: function(){
		if($defined(this.autoLocate_preLocate) && this.autoLocate_preLocate instanceof Function)
			this.autoLocate_preLocate();
		
		this._autoLocate_locationId = navigator.geolocation.watchPosition(this.autoLocate_parseLocation.bind(this), this.autoLocate_parseError.bind(this),
				{'maximumAge': this.autoLocate_options_maximumAge, 
			 	 'timeout': this.autoLocate_options_timeout, 
			 	 'enableHighAccuracy': this.autoLocate_options_enableHighAccuracy}
			);
		
		if($defined(this.autoLocate_limits_timeout)) 
			this._autoLocate_timeoutId = setTimeout(function() {this.stop();}.bind(this), this.autoLocate_limits_timeout);
	},
	
	stop: function() {
		navigator.geolocation.clearWatch(this._autoLocate_locationId);
		clearTimeout(this._autoLocate_timeoutId);
		if($defined(this.autoLocate_postLocate) && this.autoLocate_postLocate instanceof Function)
			this.autoLocate_postLocate();

		this.reset();
	},
	
	reset: function() {
		/* reinitiate */
		this._autoLocate_locationId = null;
		this._autoLocate_timeoutId = null;
		this._autoLocate_try_counter = 0;
		
		/* reset the previous result at the end */ 
		this.autoLocate_lastRecordedPosition = null;
	}
});