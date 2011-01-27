<%@ tag body-content="empty" isELIgnored="false" trimDirectiveWhitespaces="true" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="logging" uri="/au/com/sensis/mobile/web/component/core/logging/logging.tld"%>

<%@ attribute name="device" required="true"
    type="au.com.sensis.wireless.common.volantis.devicerepository.api.Device"  
    description="Device of the current user." %>

<logging:logger var="logger" name="au.com.sensis.mobile.web.component.devicelocation" />
<logging:debug logger="${logger}" message="Entering setup.tag" />

<%--
  - Set attributes into request scope, then include a JSP so that we can route through the 
  - ContentRenderingFramework.
  --%>
<c:set var="deviceLocationDevice" scope="request" value="${device}" />

<jsp:include page="/WEB-INF/view/jsp/comp/devicelocation/setup.crf" />

<logging:info logger="${logger}" message="Exiting setup.tag" />