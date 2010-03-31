package au.com.sensis.mobile.web.component.devicelocation.device;

import au.com.sensis.mobile.web.component.core.device.AbstractDeviceConfigRegistry;
import au.com.sensis.mobile.web.component.core.device.generated.AbstractDeviceConfig;
import au.com.sensis.mobile.web.component.devicelocation.device.generated.DeviceConfig;
import au.com.sensis.wireless.common.utils.jaxb.XMLBinder;

/**
 * Registry of device configuration for the current component.
 *
 * @author Boyd Sharrock
 */
public class DeviceLocationDeviceConfigRegistry extends AbstractDeviceConfigRegistry {

    public DeviceLocationDeviceConfigRegistry(final String deviceConfigClasspath,
            final XMLBinder xmlBinder) {
        super(deviceConfigClasspath, xmlBinder);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected Class<? extends AbstractDeviceConfig> getDeviceConfigType() {
        return DeviceConfig.class;
    }


}
