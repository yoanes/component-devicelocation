<%-- 
  - Project level component setup tags. 
  -
  - Projects should provide their own copy of this file if they wish to 
  - add component setup tags to tiles that extend the standard testbed base tile. 
  --%>

<map:setup map="${map}" />
<devicelocation:setup />
<mcs:script type="text/javascript">
	new DeviceLocation(null, {
								postLocate: function(position) {
									DEVICELOCATION.instances[0].default_onLocate(position);
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