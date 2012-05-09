DeviceLocation.implement({
		
	autoLocate: function() {
		if($defined(this.autoLocate_preLocate) && this.autoLocate_preLocate instanceof Function)
			this.autoLocate_preLocate();
		
		/* first hit we don't want to wait */
		navigator.geolocation.getCurrentPosition(this.autoLocate_parseLocation.bind(this), this.autoLocate_parseError.bind(this),
				{'maximumAge': this.autoLocate_options_maximumAge, 
				 'timeout': this.autoLocate_options_timeout, 
				 'enableHighAccuracy': this.autoLocate_options_enableHighAccuracy}
				);	
		
		this._autoLocate_locationId = setInterval(function(){
			navigator.geolocation.getCurrentPosition(this.autoLocate_parseLocation.bind(this), this.autoLocate_parseError.bind(this),
				{'maximumAge': this.autoLocate_options_maximumAge, 
				 'timeout': this.autoLocate_options_timeout, 
				 'enableHighAccuracy': this.autoLocate_options_enableHighAccuracy}
				);	
		}.bind(this), this.autoLocate_options_timeout);
		
		// this clause here looks ok unless the timeout limits is shorter then the timeout option
		if($defined(this.autoLocate_limits_timeout) && this.autoLocate_limits_timeout > 0) 
			this._autoLocate_timeoutId = setTimeout(function() {this.stop();}.bind(this), this.autoLocate_limits_timeout);
	},
	
	stop: function() {
		clearInterval(this._autoLocate_locationId);
		clearTimeout(this._autoLocate_timeoutId);
		
		var finalCoords = this.autoLocate_lastRecordedPosition == null ? null : this.autoLocate_lastRecordedPosition.coords;
		var finalTimeStamp = this.autoLocate_lastRecordedPosition == null ? null : this.autoLocate_lastRecordedPosition.timestamp;
		
		if($defined(this.autoLocate_postLocate) && this.autoLocate_postLocate instanceof Function)
			this.autoLocate_postLocate(finalCoords, finalTimeStamp);
				
		this.reset();
	},
	
	softReset: function() {
		if(this._autoLocate_locationId != null) {
			clearInterval(this._autoLocate_locationId);
			
			if(this._autoLocate_timeoutId != null)
				clearTimeout(this._autoLocate_timeoutId);
			
			this.reset();
		}
	}
		
});