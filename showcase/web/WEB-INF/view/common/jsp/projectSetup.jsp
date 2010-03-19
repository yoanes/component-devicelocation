<%-- 
  - Project level component setup tags. 
  -
  - Projects should provide their own copy of this file if they wish to 
  - add component setup tags to tiles that extend the standard testbed base tile. 
  --%>

<map:setup map="${map}" />
<mcs:script src="/comp/devicelocation/scripts/location.mscr" />
<mcs:script type="text/javascript">
	window.addEvent('load', function() { 
		new DeviceLocation(_DEVICELOCATION_WM_.Locate,null,null);
		$('locateMeButton').addEvent('click', function(e) {
			DEVICELOCATION.instances[0].locate();
			return false;
		});
	});
	
</mcs:script>

