<%@ page trimDirectiveWhitespaces="true" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="base" uri="/au/com/sensis/mobile/web/component/core/base/base.tld"%>
<%@ taglib prefix="logging" uri="/au/com/sensis/mobile/web/component/core/logging/logging.tld"%>
<%@ taglib prefix="util" uri="/au/com/sensis/mobile/web/component/core/util/util.tld"%>
<%@ taglib prefix="crf" uri="/au/com/sensis/mobile/crf/crf.tld"%>

<%-- Retrieve attributes from request. --%>
<c:set var="device" value="${requestScope['deviceLocationDevice']}" />
    
<%-- Setup components that we depend on. --%>
<base:setup device="${device}"/>
<util:setup device="${device}"/>
<logging:setup device="${device}"/>

<%-- Scripts for current component. --%>
<crf:script src="comp/devicelocation/package" device="${device}"></crf:script>