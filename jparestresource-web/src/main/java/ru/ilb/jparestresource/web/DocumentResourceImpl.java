/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.ilb.jparestresource.web;

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
import ru.ilb.jparestresource.document.Document;
import ru.ilb.jparestresource.document.Documents;
import ru.ilb.jparestresource.api.DocumentsResource;
import ru.ilb.jparestresource.document.ReadOptionsType;

@Path("documents")
public class DocumentResourceImpl implements DocumentsResource {

    @PersistenceContext(unitName = "jparestresource")
    private EntityManager em;

    @Resource(name="jaxbProvider")
    JAXBElementProvider jaxbElementProvider;

    @Autowired
    EntityManagerIntr entityManagerIntr;

    private static final Logger LOG = LoggerFactory.getLogger(DocumentResourceImpl.class);

    @Override
    @Transactional
    public Documents list(List<ReadOptionsType> options) {
        Documents res = new Documents();

        TypedQuery<Document> query = em.createQuery("SELECT d FROM Document d", Document.class);
        if (options != null) {
            if (options.contains(ReadOptionsType.WITH_DOCFILES)) {
                query.setHint(QueryHints.LEFT_FETCH, "d.docfiles");
            }
        }
        List<Document> result = query.getResultList();
        //res.getDocuments().addAll(entityManagerIntr.copy(result, null, null));
        res.getDocuments().addAll(result);
        return res;
    }

    @Override
    @Transactional
    public Document find(UUID uid) {
        TypedQuery<Document> query = em.createNamedQuery("Document.byUid", Document.class);
        query.setParameter("uid", uid);
        Document doc = query.getSingleResult();
        return doc;
    }

    @Override
    @Transactional
    public UUID create(Document document) {
        em.persist(document);
        return document.getUid();
    }

    @Override
    @Transactional
    public void edit(UUID uid, Document document) {
        Document doc = find(uid);
        document.copyTo(doc);
    }

    @Override
    @Transactional
    public void remove(UUID uid) {
        Document doc = find(uid);
        em.remove(doc);
    }

    @PostConstruct
    @Transactional
    public void init() {
        try {
            JAXBContext jaxbContext=jaxbElementProvider.getJAXBContext(Documents.class, null);
            Documents documents=(Documents) jaxbContext.createUnmarshaller().unmarshal(Documents.class.getResourceAsStream("/META-INF/xml/testdata.xml"));
            for(Document doc:documents.getDocuments()){
                create(doc);
            }
        } catch (JAXBException ex) {
            LOG.error("init error", ex);
        }
        
    }

}
