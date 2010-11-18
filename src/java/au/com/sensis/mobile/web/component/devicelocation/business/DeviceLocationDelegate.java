package au.com.sensis.mobile.web.component.devicelocation.business;

import java.util.Properties;

import au.com.sensis.mobile.crf.service.PropertiesLoader;
import au.com.sensis.wireless.web.mobile.MobileContext;

public class DeviceLocationDelegate{
	
	private PropertiesLoader propertiesConfigLoader;

    private String abstractPropertiesPath;
    
    private String supportDeviceLocationPropertyName;
    
    /**
     * @return the propertiesConfigLoader
     */
    public PropertiesLoader getPropertiesConfigLoader() {
        return propertiesConfigLoader;
    }

    /**
     * @param propertiesConfigLoader the propertiesConfigLoader to set
     */
    public void setPropertiesConfigLoader(final PropertiesLoader propertiesConfigLoader) {
        this.propertiesConfigLoader = propertiesConfigLoader;
    }

    /**
     * @return the abstractPropertiesPath
     */
    public String getAbstractPropertiesPath() {
        return abstractPropertiesPath;
    }

    /**
     * @param abstractPropertiesPath the abstractPropertiesPath to set
     */
    public void setAbstractPropertiesPath(final String abstractPropertiesPath) {
        this.abstractPropertiesPath = abstractPropertiesPath;
    }

    /**
     * @return the supportDeviceLocationPropertyName
     */
    public String getSupportDeviceLocationPropertyName() {
        return supportDeviceLocationPropertyName;
    }

    /**
     * @param supportDeviceLocationPropertyName
     *            the supportDeviceLocationPropertyName to set
     */
    public void setSupportDeviceLocationPropertyName(
            final String supportDeviceLocationPropertyName) {
        this.supportDeviceLocationPropertyName = supportDeviceLocationPropertyName;
    }
    
    public boolean isDeviceLocationSupported(final MobileContext mobileContext) {
    	final Properties properties =
            getPropertiesConfigLoader().loadProperties(mobileContext.getDevice(),
                    getAbstractPropertiesPath());
    	
    	return  Boolean.parseBoolean(properties.getProperty(getSupportDeviceLocationPropertyName()));
    	
    }
}