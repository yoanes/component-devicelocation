<%-- 
  - Project level component setup tags. 
  -
  - Projects should provide their own copy of this file if they wish to 
  - add component setup tags to tiles that extend the standard testbed base tile. 
  --%>

<map:setup map="${map}" />
<devicelocation:setup />
<mcs:script type="text/javascript">

	/* define some global var within the namespace */
	_DEVICELOCATION_WM_.timeout = null;
	
	/* the method to run the interval */
	_DEVICELOCATION_WM_.keepLocating = function(timeout) {
		/* set the timeout as specified */
		_DEVICELOCATION_WM_.timeout = setTimeout(function() { 
			DEVICELOCATION.instances[0].stop();
		}, timeout);
		
		DEVICELOCATION.instances[0].autoLocate();
	};
	
	window.addEvent('load', function() { 
		
		new DeviceLocation(null, null, null);
		
		$('locateMeButton').addEvent('click', function(e) {
			
			_DEVICELOCATION_WM_.keepLocating(30000);
			return false;
		});
	});
	
</mcs:script>

