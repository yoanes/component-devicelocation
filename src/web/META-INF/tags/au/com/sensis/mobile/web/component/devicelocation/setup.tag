<%@ tag body-content="empty" isELIgnored="false" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="core" uri="/au/com/sensis/mobile/web/component/core/core.tld"%>
<%@ taglib prefix="logging" uri="/au/com/sensis/mobile/web/component/logging/logging.tld"%>
<%@ taglib prefix="util" uri="/au/com/sensis/mobile/web/component/util/util.tld"%>

<logging:logger var="logger" name="au.com.sensis.mobile.web.component.devicelocation" />
<logging:debug logger="${logger}" message="Entering setup.tag" />

<core:compMcsBasePath var="compMcsBasePath" />

<%-- Setup components that we depend on. --%>
<core:setup />
<util:setup />
<logging:setup />

<%-- Scripts for current component. --%>
<core:script type="text/javascript" src="${compMcsBasePath}/devicelocation/scripts/location.mscr"></core:script>

<logging:info logger="${logger}" message="Exiting setup.tag" />