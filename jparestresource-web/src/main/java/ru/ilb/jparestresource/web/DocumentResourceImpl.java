/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.ilb.jparestresource.web;

import io.swagger.annotations.Api;
import java.util.List;
import java.util.UUID;
import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;
import org.apache.cxf.jaxrs.ext.search.SearchCondition;
import org.apache.cxf.jaxrs.ext.search.SearchContext;
import org.apache.cxf.jaxrs.ext.search.SearchParseException;
import org.eclipse.persistence.config.QueryHints;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import ru.ilb.common.jaxrs.search.JPAOrderedQueryVisitor;
import ru.ilb.jparestresource.model.Document;
import ru.ilb.jparestresource.model.Documents;
import ru.ilb.jparestresource.api.DocumentsResource;
import ru.ilb.jparestresource.utils.JaxbHelper;
import ru.ilb.jparestresource.model.ReadOptionsType;
import ru.ilb.jparestresource.repositories.DocumentRepository;

@Path("documents")
@Api("documents")
public class DocumentResourceImpl implements DocumentsResource {

    @PersistenceContext(unitName = "jparestresource")
    private EntityManager em;

    @Autowired
    JaxbHelper jaxbHelper;

    private UriInfo uriInfo;

    @Context
    public void setUriInfo(UriInfo uriInfo) {
        this.uriInfo = uriInfo;
    }

    @Autowired
    DocumentRepository documentRepository;

    private SearchContext searchContext;

    @Context
    public void setSearchContext(SearchContext searchContext) {
        this.searchContext = searchContext;
    }

    private static final Logger LOG = LoggerFactory.getLogger(DocumentResourceImpl.class);

    @Override
    @Transactional
    public Documents list(List<ReadOptionsType> options, String filter, Integer limit, String order) {
        Documents res = new Documents();
        JPAOrderedQueryVisitor<Document> visitor = new JPAOrderedQueryVisitor<>(em, Document.class);
        TypedQuery<Document> query;
        if (filter != null) {
            SearchCondition<Document> sc;
            try {
                sc = searchContext.getCondition(filter, Document.class);
            } catch (SearchParseException ex) {
                throw new BadRequestException(ex);
            }
            sc.accept(visitor);
            CriteriaQuery<Document> cq = order != null ? visitor.getOrderedCriteriaQuery(visitor, order) : visitor.getCriteriaQuery();
            query = em.createQuery(cq);

        } else {
            query = em.createQuery("SELECT d FROM Document d", Document.class);
        }
        if (options != null) {
            if (options.contains(ReadOptionsType.WITH_DOCFILES)) {
                query.setHint(QueryHints.LEFT_FETCH, "d.docfiles");
            }
        }
        if (limit != null) {
            query.setMaxResults(limit);
        }
        List<Document> result = query.getResultList();
        //res.getDocuments().addAll(entityManagerIntr.copy(result, null, null));
        res.getDocuments().addAll(result);
        return res;
    }

    @Override
    @Transactional
    public Document find(UUID uid) {
        Document doc = documentRepository.findByUid(uid);
        return doc;
    }

    @Override
    @Transactional
    public UUID create(Document document) {
        documentRepository.save(document);
        return document.getUid();
    }

    @Override
    @Transactional
    public void edit(UUID uid, Document document) {
        Document doc = documentRepository.findByUid(uid);
        BeanUtils.copyProperties(document, doc, new String[]{"id"});
    }

    @Override
    @Transactional
    public void remove(UUID uid) {
        Document doc = documentRepository.findByUid(uid);
        documentRepository.delete(doc);
    }

    /**
     * Example data initialisation
     */
    @PostConstruct
    @Transactional
    public void init() {
        Documents documents = jaxbHelper.unmarshal(getClass().getResourceAsStream("/META-INF/xml/testdata.xml"), Documents.class,MediaType.APPLICATION_XML);
        documentRepository.save(documents.getDocuments());

    }

}
