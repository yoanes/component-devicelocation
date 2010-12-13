package au.com.sensis.mobile.web.component.devicelocation.showcase.presentation.action;

import org.apache.log4j.Logger;

import au.com.sensis.mobile.web.component.devicelocation.business.DeviceLocationDelegate;
import au.com.sensis.mobile.web.testbed.ResultName;
import au.com.sensis.mobile.web.testbed.presentation.framework.BusinessAction;

/**
 * Home action of the device location showcase.
 *
 * @author Boyd Sharrock
 *
 */
public class DeviceLocationHomeAction extends BusinessAction {

    private static final Logger LOGGER = Logger.getLogger(DeviceLocationHomeAction.class);

    private DeviceLocationDelegate deviceLocationDelegate;

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

    /**
     * @return true if the current device is devicelocation aware.
     */
    public boolean isDeviceLocationAware() {
        return getDeviceLocationDelegate().isDeviceLocationSupported(getContext());
    }

    /**
     * @param deviceLocationDelegate The {@link DeviceLocationDelegate}.
     */
    public void setDeviceLocationDelegate(final DeviceLocationDelegate deviceLocationDelegate) {
        this.deviceLocationDelegate = deviceLocationDelegate;
    }

    /**
     * @return the {@link DeviceLocationDelegate}.
     */
    public DeviceLocationDelegate getDeviceLocationDelegate() {
        return deviceLocationDelegate;
    }

}
