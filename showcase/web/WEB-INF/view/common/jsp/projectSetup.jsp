<%-- 
  - Project level component setup tags. 
  -
  - Projects should provide their own copy of this file if they wish to 
  - add component setup tags to tiles that extend the standard testbed base tile. 
  --%>

<map:setup map="${map}" />
<mcs:script src="/comp/devicelocation/scripts/location.mscr" />
<mcs:script type="text/javascript">var gps; window.addEvent('load', function() { gps = new LocationUtilities(); gps.locate(); });</mcs:script>

