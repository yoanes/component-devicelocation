<%@ tag body-content="empty" isELIgnored="false" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="base" uri="/au/com/sensis/mobile/web/component/core/base/base.tld"%>
<%@ taglib prefix="logging" uri="/au/com/sensis/mobile/web/component/core/logging/logging.tld"%>
<%@ taglib prefix="util" uri="/au/com/sensis/mobile/web/component/core/util/util.tld"%>

<logging:logger var="logger" name="au.com.sensis.mobile.web.component.devicelocation" />
<logging:debug logger="${logger}" message="Entering setup.tag" />

<base:compMcsBasePath var="compMcsBasePath" />

<%-- Setup components that we depend on. --%>
<base:setup />
<util:setup />
<logging:setup />

<%-- Scripts for current component. --%>
<base:script type="text/javascript" src="${compMcsBasePath}/devicelocation/scripts/location.mscr"></base:script>

<logging:info logger="${logger}" message="Exiting setup.tag" />