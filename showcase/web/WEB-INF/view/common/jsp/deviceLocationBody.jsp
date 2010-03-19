<jsp:directive.include file="/WEB-INF/view/common/jsp/configInclude.jsp"/>

<div id="testbed">
    <h1>Device Location Showcase...</h1>

	<a href="#" id="locateMeButton">Locate Me</a>
	<map:render map="${map}" zoomInUrl="zoomInUrl" zoomOutUrl="zoomOutUrl" 
            panNorthUrl="panNorthUrl" panSouthUrl="panSouthUrl"
            panEastUrl="panEastUrl" panWestUrl="panWestUrl"
            photoLayerUrl="photoLayerUrl" mapLayerUrl="mapLayerUrl"
            clientSideGeneratedMapStateChangeUrl="stateChangeUrl" />
</div>