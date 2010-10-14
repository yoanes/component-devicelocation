<%-- 
  - Project level component setup tags. 
  -
  - Projects should provide their own copy of this file if they wish to 
  - add component setup tags to tiles that extend the standard testbed base tile. 
  --%>

<%--  <map:setup map="${map}" device="${context.device}"/> --%>

<devicelocation:setup device="${context.device}" />
<crf:script type="text/javascript" device="${context.device}" name="deviceLocation">
	if(typeof(DeviceLocation) != 'undefined') {
		
		new DeviceLocation(null, {
			onlocate: function(position) {

				try {
					sensis.log('AutoLocate: POSITION FOUND');
					sensis.extract(position);
					
					sensis.log('AutoLocate: current limit');
					sensis.log('Tries '+ (DEVICELOCATION.instances[0]._autoLocate_try_counter + 1) + ' of ' + DEVICELOCATION.instances[0].autoLocate_limits_tries);
					sensis.log('Proximity: '+ position.accuracy + ' of ' + DEVICELOCATION.instances[0].autoLocate_limits_proximity);
					sensis.log('Timeout: '+ DEVICELOCATION.instances[0].autoLocate_limits_timeout);
					sensis.log('Acceptable Proximity: ' + position.accuracy + ' of ' + DEVICELOCATION.instances[0].autoLocate_limits_acceptableProximity);
				}
				catch(exception) {}
			},
			
			onerror: function(error) {
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
			},
			
			prelocate: function() {
				sensis.time('Timeout');
			},
			
			postlocate: function(lastRecordedPosition) {
				if(lastRecordedPosition == null) {
					sensis.log('AutoLocate: NO RESULT FOUND');
				}
				else {
					sensis.log('AutoLocate: FINAL POSITION');
					sensis.extract(lastRecordedPosition);
					
					sensis.log('AutoLocate: STOPPING, one of the limits have been reached');
				}
				
				sensis.log('Tries '+ DEVICELOCATION.instances[0]._autoLocate_try_counter + ' of ' + DEVICELOCATION.instances[0].autoLocate_limits_tries);
				sensis.log('Proximity: '+ lastRecordedPosition.accuracy + ' of ' + DEVICELOCATION.instances[0].autoLocate_limits_proximity);
				sensis.timeEnd('Timeout');
			},
			
			limits: {tries:10, proximity:50, timeout:30000, acceptableProximity:1000}
		 });
		 
		window.addEvent('load', function() { 
			$('locateMeButton').addEvent('click', function(e) {
				DEVICELOCATION.instances[0].autoLocate();
				return false;
			});
		});
	}
	
</crf:script>