#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.ilb.meta.${parentArtifactId}.objects;

import javax.xml.bind.annotation.XmlTransient;
import org.jvnet.jaxb2_commons.lang.CopyStrategy;
import org.jvnet.jaxb2_commons.locator.ObjectLocator;

/**
 *
 * @author slavb
 */
@XmlTransient
public class PersistentObject {

    @XmlTransient
    protected Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Object copyTo(ObjectLocator locator, Object target, CopyStrategy strategy) {
        return target;
    }

}
