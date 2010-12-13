<jsp:directive.include file="/WEB-INF/view/common/jsp/configInclude.jsp"/>

<%-- Set the default resource bundle for the current tag file. --%>    
<fmt:setBundle basename="au.com.sensis.mobile.web.component.devicelocation.devicelocation-component" />    

<%-- Figure out the name of the current component.--%>
<c:set var="componentName">
    <fmt:message key="comp.name" />
</c:set>

<div id="testbed">
    <h1>Device Location Showcase...</h1>

	<div>
		isDeviceLocationAware: <s:property value="deviceLocationAware"/>
	</div>
	<jsp:include page="/WEB-INF/view/jsp/comp/devicelocation/deviceLocationLink.crf" />

</div>