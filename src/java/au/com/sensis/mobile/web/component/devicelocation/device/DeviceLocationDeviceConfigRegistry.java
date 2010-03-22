package au.com.sensis.mobile.web.component.devicelocation.device;

import au.com.sensis.mobile.web.component.core.device.AbstractDeviceConfigRegistry;
import au.com.sensis.mobile.web.component.devicelocation.device.generated.DeviceConfigType;
import au.com.sensis.wireless.common.utils.jaxb.XMLBinder;

/**
 * Registry of device configuration for the current component.
 *
 * @author Boyd Sharrock
 */
public class DeviceLocationDeviceConfigRegistry extends AbstractDeviceConfigRegistry<DeviceConfigType> {

    public DeviceLocationDeviceConfigRegistry(final String deviceConfigClasspath, final XMLBinder xmlBinder,
            final DeviceConfigType defaultDeviceConfig) {
        super(deviceConfigClasspath, xmlBinder, defaultDeviceConfig);
    }


}
