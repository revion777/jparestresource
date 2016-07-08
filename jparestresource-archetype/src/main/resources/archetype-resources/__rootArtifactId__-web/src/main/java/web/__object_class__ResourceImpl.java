#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ${package}.web;

import java.util.List;
import java.util.UUID;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import org.apache.cxf.jaxrs.ext.search.SearchCondition;
import org.apache.cxf.jaxrs.ext.search.SearchContext;
import org.apache.cxf.jaxrs.ext.search.SearchParseException;
import org.apache.cxf.jaxrs.provider.JAXBElementProvider;
import org.eclipse.persistence.config.QueryHints;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import ru.ilb.common.jaxrs.jaxb.JaxbContextResolver;
import ru.ilb.common.jaxrs.search.JPAOrderedQueryVisitor;
import ${package}.documents.${object_class};
import ${package}.documents.${object_class}s;
import ${package}.api.${object_class}sResource;
import ${package}.documents.ReadOptionsType;

@Path("documents")
public class ${object_class}ResourceImpl implements ${object_class}sResource {

    @PersistenceContext(unitName = "${parentArtifactId}")
    private EntityManager em;

    @Autowired JaxbContextResolver jaxbContextResolver;
    
    private UriInfo uriInfo;
    @Context
    public void setUriInfo(UriInfo uriInfo) {
        this.uriInfo = uriInfo;
    }
    
    private SearchContext searchContext;

    @Context
    public void setSearchContext(SearchContext searchContext) {
        this.searchContext = searchContext;
    }

    private static final Logger LOG = LoggerFactory.getLogger(${object_class}ResourceImpl.class);

    @Override
    @Transactional
    public ${object_class}s list(List<ReadOptionsType> options, String filter, Integer limit, String order) {
        ${object_class}s res = new ${object_class}s();
        JPAOrderedQueryVisitor<${object_class}> visitor = new JPAOrderedQueryVisitor<>(em, ${object_class}.class);
        TypedQuery<${object_class}> query;
        if(filter!=null ){
            SearchCondition<${object_class}> sc;
            try {
                sc = searchContext.getCondition(filter, ${object_class}.class);
            } catch (SearchParseException ex){
                throw new BadRequestException(ex);
            }
            sc.accept(visitor);
            CriteriaQuery<${object_class}> cq= order!=null ? visitor.getOrderedCriteriaQuery(visitor, order): visitor.getCriteriaQuery();
            query=em.createQuery(cq);
            
        } else {
            query = em.createQuery("SELECT d FROM ${object_class} d", ${object_class}.class);
        }
        if (options != null) {
            if (options.contains(ReadOptionsType.WITH_DOCFILES)) {
                query.setHint(QueryHints.LEFT_FETCH, "d.docfiles");
            }
        }
        if(limit!=null){
            query.setMaxResults(limit);
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
    public UUID create(${object_class} document) {
        em.persist(document);
        return document.getUid();
    }

    @Override
    @Transactional
    public void edit(UUID uid, ${object_class} document) {
        ${object_class} doc = find(uid);
        BeanUtils.copyProperties(document, doc,new String[] {"id"});
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
            JAXBContext jaxbContext = jaxbContextResolver.getContext(${object_class}s.class);
            ${object_class}s documents=(${object_class}s) jaxbContext.createUnmarshaller().unmarshal(${object_class}s.class.getResourceAsStream("/META-INF/xml/testdata.xml"));
            for(${object_class} doc:documents.get${object_class}s()){
                create(doc);
            }
        } catch (JAXBException ex) {
            LOG.error("init error", ex);
        }
        
    }

}
