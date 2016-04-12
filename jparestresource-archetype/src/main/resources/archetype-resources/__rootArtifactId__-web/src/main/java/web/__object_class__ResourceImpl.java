#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ${groupId}.web;

import java.util.List;
import java.util.UUID;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import org.apache.cxf.jaxrs.provider.JAXBElementProvider;
import org.eclipse.persistence.config.QueryHints;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import ${groupId}.${object_urn}.${object_class};
import ${groupId}.${object_urn}.${object_class}s;
import ${groupId}.api.${object_class}sResource;
import ${groupId}.${object_urn}.ReadOptionsType;

@Path("${object_urn}s")
public class ${object_class}ResourceImpl implements ${object_class}sResource {

    @PersistenceContext(unitName = "${parentArtifactId}")
    private EntityManager em;

    @Resource(name="jaxbProvider")
    JAXBElementProvider jaxbElementProvider;

    @Autowired
    EntityManagerIntr entityManagerIntr;

    private static final Logger LOG = LoggerFactory.getLogger(${object_class}ResourceImpl.class);

    @Override
    @Transactional
    public ${object_class}s list(List<ReadOptionsType> options) {
        ${object_class}s res = new ${object_class}s();

        TypedQuery<${object_class}> query = em.createQuery("SELECT d FROM ${object_class} d", ${object_class}.class);
        if (options != null) {
            if (options.contains(ReadOptionsType.WITH_DOCFILES)) {
                query.setHint(QueryHints.LEFT_FETCH, "d.docfiles");
            }
        }
        List<${object_class}> result = query.getResultList();
        //res.get${object_class}s().addAll(entityManagerIntr.copy(result, null, null));
        res.get${object_class}s().addAll(result);
        return res;
    }

    @Override
    @Transactional
    public ${object_class} find(UUID uid) {
        TypedQuery<${object_class}> query = em.createNamedQuery("${object_class}.byUid", ${object_class}.class);
        query.setParameter("uid", uid);
        ${object_class} doc = query.getSingleResult();
        return doc;
    }

    @Override
    @Transactional
    public UUID create(${object_class} ${object_urn}) {
        em.persist(${object_urn});
        return ${object_urn}.getUid();
    }

    @Override
    @Transactional
    public void edit(UUID uid, ${object_class} ${object_urn}) {
        ${object_class} doc = find(uid);
        ${object_urn}.copyTo(doc);
    }

    @Override
    @Transactional
    public void remove(UUID uid) {
        ${object_class} doc = find(uid);
        em.remove(doc);
    }

    @PostConstruct
    @Transactional
    public void init() {
        try {
            JAXBContext jaxbContext=jaxbElementProvider.getJAXBContext(${object_class}s.class, null);
            ${object_class}s ${object_urn}s=(${object_class}s) jaxbContext.createUnmarshaller().unmarshal(${object_class}s.class.getResourceAsStream("/META-INF/xml/testdata.xml"));
            for(${object_class} doc:${object_urn}s.get${object_class}s()){
                create(doc);
            }
        } catch (JAXBException ex) {
            LOG.error("init error", ex);
        }
        
    }

}
