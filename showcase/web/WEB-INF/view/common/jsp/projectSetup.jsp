<%-- 
  - Project level component setup tags. 
  -
  - Projects should provide their own copy of this file if they wish to 
  - add component setup tags to tiles that extend the standard testbed base tile. 
  --%>

<map:setup map="${map}" />
<mcs:script src="/comp/devicelocation/scripts/location.mscr" />
<mcs:script type="text/javascript">

	/* define some global var within the namespace */
	_DEVICELOCATION_WM_.stop = false;
	_DEVICELOCATION_WM_.position = null;
	_DEVICELOCATION_WM_.loop = null;
	_DEVICELOCATION_WM_.accuracy = null;
	
	/* the method to run the interval */
	_DEVICELOCATION_WM_.keepLocating = function(timeout, recency, proximity) {
		/* do initialization */
		if(DEVICELOCATION.instances.length == 0) {
			new DeviceLocation({'onlocate': function(position) {
				if(_DEVICELOCATION_WM_.position == null) {
					_DEVICELOCATION_WM_.position = position;
					_DEVICELOCATION_WM_.accuracy = position.accuracy;
					
					if(DEVICELOCATION.instances[0].pointWithinRadius(proximity))
						_DEVICELOCATION_WM_.stop = true;
				}
				else if((position.accuracy != null) && 
						(position.accuracy < _DEVICELOCATION_WM_.accuracy)) {
					_DEVICELOCATION_WM_.position = position;
					_DEVICELOCATION_WM_.accuracy = position.accuracy
					
					if(DEVICELOCATION.instances[0].pointWithinRadius(proximity))
						_DEVICELOCATION_WM_.stop = true;
				}
			}.bind(this)}, null, null);
		}
		
		/* set the timeout as specified */
		setTimeout(function() { _DEVICELOCATION_WM_.stop = true; }, timeout);
		
		/* locate while flag is off
		 * and locate every 2 second
		 */
		_DEVICELOCATION_WM_.loop = setInterval(function() { 
			DEVICELOCATION.instances[0].locate(); 
			if(_DEVICELOCATION_WM_.stop) {
				clearInterval(_DEVICELOCATION_WM_.loop);
				_DEVICELOCATION_WM_.processLocation(_DEVICELOCATION_WM_.position);
			}
		}, 2000);
	};
	
	window.addEvent('load', function() { 
		$('locateMeButton').addEventListener('click', function(e) {
			_DEVICELOCATION_WM_.keepLocating(10000, 0, 5);
			return false;
		}, false);
	});
	
</mcs:script>

