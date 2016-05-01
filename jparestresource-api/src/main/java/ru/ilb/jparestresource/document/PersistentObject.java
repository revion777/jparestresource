/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.ilb.jparestresource.document;

import javax.xml.bind.annotation.XmlTransient;
import org.jvnet.jaxb2_commons.lang.CopyStrategy;
import org.jvnet.jaxb2_commons.locator.ObjectLocator;

/**
 *
 * @author slavb
 */
@XmlTransient
public abstract class PersistentObject {

    @XmlTransient
    protected Long id;
    
    @XmlTransient
    protected Long versionId;    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVersionId() {
        return versionId;
    }

    public void setVersionId(Long versionId) {
        this.versionId = versionId;
    }

    public Object copyTo(ObjectLocator locator, Object target, CopyStrategy strategy) {
        return target;
    }

}
