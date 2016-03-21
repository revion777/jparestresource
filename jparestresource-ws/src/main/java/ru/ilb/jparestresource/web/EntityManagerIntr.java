/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.ilb.jparestresource.web;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.eclipse.persistence.jpa.JpaEntityManager;
import org.eclipse.persistence.sessions.CopyGroup;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.ilb.jparestresource.document.Document;
import ru.ilb.jparestresource.document.ReadOptionsType;

/**
 *
 * @author slavb
 */
@Component
class EntityManagerIntr {

    @PersistenceContext(unitName = "jparestresource")
    private EntityManager em;
    private CopyGroup getCustomCopyGroup(List<String> attributes) {
        CopyGroup copyGroup = new CopyGroup();
        for (String attr : attributes) {
            copyGroup.addAttribute(attr);
        }
        return copyGroup;
    }

    private CopyGroup getDocumentCopyGroup(List<ReadOptionsType> readOptions) {
        return getCustomCopyGroup(getDocumentAttributes(readOptions));
    }

    private List<String> getDocumentAttributes(List<ReadOptionsType> readOptions) {
        List<String> attributes = new ArrayList<>();
        attributes.add("uid");
        attributes.add("displayName");
        attributes.add("docDate");
        attributes.add("description");
        attributes.add("direction");
        if (readOptions != null) {
            if (readOptions.contains(ReadOptionsType.WITH_DOCFILES)) {
                attributes.add("docfiles");
            }
        }
        return attributes;
    }

    private CopyGroup getCopyGroup(Class clazz, List<String> attributes, List<ReadOptionsType> options) {
        CopyGroup result = null;
        if (clazz.equals(Document.class)) {
            result = getDocumentCopyGroup(options);
        }
        return result;
    }

    @Transactional
    public <T> T copy(T entity, List<String> attributes, List<ReadOptionsType> options) {
        T result = null;
        if (entity != null) {
            result = (T) em.unwrap(JpaEntityManager.class).copy(entity, getCopyGroup(entity.getClass(),attributes, options));
        }
        return result;
    }

    @Transactional
    public <T> List<T> copy(List<T> entityList, List<String> attributes, List<ReadOptionsType> options) {
       List<T> result = null;
        if (entityList != null) {
            result=new ArrayList<>();
            for (T entity: entityList) {
                result.add((T) em.unwrap(JpaEntityManager.class).copy(entity, getCopyGroup(entity.getClass(),attributes, options)));
            }
        }
        return result;
    }

}
