<jsp:directive.include file="/WEB-INF/view/common/jsp/configInclude.jsp"/>

<%-- Set the default resource bundle for the current tag file. --%>    
<fmt:setBundle basename="au.com.sensis.mobile.web.component.devicelocation.devicelocation-component" />    

<%-- Figure out the name of the current component.--%>
<c:set var="componentName">
    <fmt:message key="comp.name" />
</c:set>
<base:deviceConfig var="deviceConfig" device="${context.device}" 
    registryBeanName="${componentName}.comp.deviceConfigRegistry"/>

<div id="testbed">
    <h1>Device Location Showcase...</h1>

	<c:choose>
		<c:when test="${deviceConfig.deviceLocationAware}" >
			<a href="#" id="locateMeButton">Locate Me</a>
		</c:when>
		<c:otherwise>
			This device is not location aware...
		</c:otherwise>
	</c:choose>

	
	<map:render device="${context.device}" map="${map}" zoomInUrl="zoomInUrl" zoomOutUrl="zoomOutUrl" 
            panNorthUrl="panNorthUrl" panSouthUrl="panSouthUrl"
            panEastUrl="panEastUrl" panWestUrl="panWestUrl"
            photoLayerUrl="photoLayerUrl" mapLayerUrl="mapLayerUrl"
            clientSideGeneratedMapStateChangeUrl="stateChangeUrl" />
</div>