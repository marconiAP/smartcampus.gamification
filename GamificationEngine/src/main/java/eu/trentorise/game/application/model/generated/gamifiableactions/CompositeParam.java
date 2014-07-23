//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-2 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2014.07.23 at 11:20:33 AM CEST 
//


package eu.trentorise.game.application.model.generated.gamifiableactions;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element ref="{}basic-param" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element ref="{}enumeration-param" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element ref="{}composite-param" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="name" use="required" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "basicParam",
    "enumerationParam",
    "compositeParam"
})
@XmlRootElement(name = "composite-param")
public class CompositeParam {

    @XmlElement(name = "basic-param")
    protected List<BasicParam> basicParam;
    @XmlElement(name = "enumeration-param")
    protected List<EnumerationParam> enumerationParam;
    @XmlElement(name = "composite-param")
    protected List<CompositeParam> compositeParam;
    @XmlAttribute(name = "name", required = true)
    protected String name;

    /**
     * Gets the value of the basicParam property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the basicParam property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getBasicParam().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link BasicParam }
     * 
     * 
     */
    public List<BasicParam> getBasicParam() {
        if (basicParam == null) {
            basicParam = new ArrayList<BasicParam>();
        }
        return this.basicParam;
    }

    /**
     * Gets the value of the enumerationParam property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the enumerationParam property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getEnumerationParam().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link EnumerationParam }
     * 
     * 
     */
    public List<EnumerationParam> getEnumerationParam() {
        if (enumerationParam == null) {
            enumerationParam = new ArrayList<EnumerationParam>();
        }
        return this.enumerationParam;
    }

    /**
     * Gets the value of the compositeParam property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the compositeParam property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCompositeParam().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link CompositeParam }
     * 
     * 
     */
    public List<CompositeParam> getCompositeParam() {
        if (compositeParam == null) {
            compositeParam = new ArrayList<CompositeParam>();
        }
        return this.compositeParam;
    }

    /**
     * Gets the value of the name property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

}
