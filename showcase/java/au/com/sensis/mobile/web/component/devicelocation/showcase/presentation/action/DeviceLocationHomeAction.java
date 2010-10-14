package au.com.sensis.mobile.web.component.devicelocation.showcase.presentation.action;

import org.apache.log4j.Logger;

import au.com.sensis.address.WGS84Point;
/*
import au.com.sensis.mobile.web.component.map.business.MapDelegate;
import au.com.sensis.mobile.web.component.map.model.Map;
*/
import au.com.sensis.mobile.web.testbed.ResultName;
import au.com.sensis.mobile.web.testbed.presentation.framework.BusinessAction;
import au.com.sensis.wireless.manager.mapping.MapLayer;
import au.com.sensis.wireless.manager.mapping.MobilesIconType;

/**
 * Display a simple map on the main page.
 *
 * @author Boyd Sharrock
 *
 */
public class DeviceLocationHomeAction extends BusinessAction {

    private static final Logger LOGGER = Logger
    .getLogger(DeviceLocationHomeAction.class);

    private static final int EXAMPLE_LOOM_LEVEL = 10;

    /**
     * As used by struts.
     *
     * @return ResultName.SUCCESS.
     */
    public String execute() {

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Map dependency removed; mapUrl is no longer required");
        }

        return ResultName.SUCCESS;
    }
}
