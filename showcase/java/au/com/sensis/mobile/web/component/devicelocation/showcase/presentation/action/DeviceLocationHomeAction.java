package au.com.sensis.mobile.web.component.devicelocation.showcase.presentation.action;

import org.apache.log4j.Logger;

import au.com.sensis.address.WGS84Point;
import au.com.sensis.mobile.web.component.map.business.MapDelegate;
import au.com.sensis.mobile.web.component.map.model.Map;
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

    private MapDelegate mapDelegate;
    /* Provides the map that the map component will use to display. */
    private Map map;

    /**
     * As used by struts.
     *
     * @return ResultName.SUCCESS.
     */
    public String execute() {


        map = mapDelegate.getInitialMap(

                new WGS84Point(144.96921d, -37.813585d),
                EXAMPLE_LOOM_LEVEL, // Zoom Level...
                MapLayer.Map,
                MobilesIconType.CROSS_HAIR,
                getContext());

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("mapUrl found: "
                    + getMap().getMapUrl());
        }

        return ResultName.SUCCESS;
    }

    // Accessors //

    /**
     * @return the map
     */
    public Map getMap() {
        return map;
    }

    /**
     * @param map the map to set
     */
    public void setMap(final Map map) {
        this.map = map;
    }

}
