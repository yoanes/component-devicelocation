<%-- 
  - Project level component setup tags. 
  -
  - Projects should provide their own copy of this file if they wish to 
  - add component setup tags to tiles that extend the standard testbed base tile. 
  --%>

<map:setup map="${map}" device="${context.device}"/>
<devicelocation:setup />
<mcs:script type="text/javascript">
	new DeviceLocation(null, {
								postlocate: function() {
									if(DEVICELOCATION.instances[0].autoLocate_lastRecordedPosition == null) {
										sensis.log('no result found');
										sensis.log('total tries: '+ DEVICELOCATION.instances[0]._autoLocate_try_counter + ' of ' + DEVICELOCATION.instances[0].autoLocate_limits_tries);
									}
									else {
										DEVICELOCATION.instances[0].default_onLocate(DEVICELOCATION.instances[0].autoLocate_lastRecordedPosition);
									}
							  	},
							  	limits: _DEVICELOCATION_WM_.AutoLocate.limits
							  });
	window.addEvent('load', function() { 
		$('locateMeButton').addEvent('click', function(e) {
			DEVICELOCATION.instances[0].autoLocate();
			return false;
		});
	});
	
</mcs:script>