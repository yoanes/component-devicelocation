<%@ tag body-content="empty" isELIgnored="false" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="base" uri="/au/com/sensis/mobile/web/component/core/base/base.tld"%>
<%@ taglib prefix="logging" uri="/au/com/sensis/mobile/web/component/core/logging/logging.tld"%>
<%@ taglib prefix="util" uri="/au/com/sensis/mobile/web/component/core/util/util.tld"%>
<%@ taglib prefix="crf" uri="/au/com/sensis/mobile/crf/crf.tld"%>

<logging:logger var="logger" name="au.com.sensis.mobile.web.component.devicelocation" />
<logging:debug logger="${logger}" message="Entering setup.tag" />

<%@ attribute name="device" required="true"
    type="au.com.sensis.wireless.common.volantis.devicerepository.api.Device"  
    description="Device of the current user." %>
    
<base:compMcsBasePath var="compMcsBasePath" />

<%-- Setup components that we depend on. --%>
<base:setup device="${device}"/>
<util:setup device="${device}"/>
<logging:setup device="${device}"/>

<%-- Scripts for current component. --%>
<crf:script src="comp/devicelocation/package" device="${device}"></crf:script>

<logging:info logger="${logger}" message="Exiting setup.tag" />