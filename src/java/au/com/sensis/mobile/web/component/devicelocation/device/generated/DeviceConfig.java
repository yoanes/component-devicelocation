//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.1.3-b01-fcs 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2010.06.10 at 02:41:14 PM EST 
//


package au.com.sensis.mobile.web.component.devicelocation.device.generated;

import javax.annotation.Generated;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;
import au.com.sensis.mobile.web.component.core.device.generated.AbstractDeviceConfig;


/**
 * 
 *                 Defines a set of bundles.
 *             
 * 
 * <p>Java class for DeviceConfig complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DeviceConfig">
 *   &lt;complexContent>
 *     &lt;extension base="{http://mobile.sensis.com.au/web/component/core/device}AbstractDeviceConfig">
 *       &lt;sequence>
 *         &lt;element name="deviceLocationAware" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DeviceConfig", propOrder = {
    "deviceLocationAware"
})
@Generated(value = "com.sun.tools.xjc.Driver", date = "2010-06-10T02:41:14+10:00", comments = "JAXB RI v2.1.3-b01-fcs")
public class DeviceConfig
    extends AbstractDeviceConfig
{

    @XmlElement(defaultValue = "true")
    @Generated(value = "com.sun.tools.xjc.Driver", date = "2010-06-10T02:41:14+10:00", comments = "JAXB RI v2.1.3-b01-fcs")
    protected boolean deviceLocationAware = true;

    /**
     * Gets the value of the deviceLocationAware property.
     * 
     */
    @Generated(value = "com.sun.tools.xjc.Driver", date = "2010-06-10T02:41:14+10:00", comments = "JAXB RI v2.1.3-b01-fcs")
    public boolean isDeviceLocationAware() {
        return deviceLocationAware;
    }

    /**
     * Sets the value of the deviceLocationAware property.
     * 
     */
    @Generated(value = "com.sun.tools.xjc.Driver", date = "2010-06-10T02:41:14+10:00", comments = "JAXB RI v2.1.3-b01-fcs")
    public void setDeviceLocationAware(boolean value) {
        this.deviceLocationAware = value;
    }

}
