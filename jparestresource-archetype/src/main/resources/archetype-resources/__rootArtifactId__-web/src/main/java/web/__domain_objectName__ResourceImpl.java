#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ${groupId}.web;

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
import ${groupId}.${domain_packageName}.${domain_objectName};
import ${groupId}.${domain_packageName}.${domain_objectName}s;
import ${groupId}.api.${domain_objectName}sResource;
import ${groupId}.core.JaxbHelper;
import ${groupId}.${domain_packageName}.ReadOptionsType;
import ${groupId}.repositories.${domain_objectName}Repository;

@Path("${domain_packageName}")
@Api("${domain_packageName}")
public class ${domain_objectName}ResourceImpl implements ${domain_objectName}sResource {

    @PersistenceContext(unitName = "${parentArtifactId}")
    private EntityManager em;

    @Autowired
    JaxbHelper jaxbHelper;

    private UriInfo uriInfo;

    @Context
    public void setUriInfo(UriInfo uriInfo) {
        this.uriInfo = uriInfo;
    }

    @Autowired
    ${domain_objectName}Repository documentRepository;

    private SearchContext searchContext;

    @Context
    public void setSearchContext(SearchContext searchContext) {
        this.searchContext = searchContext;
    }

    private static final Logger LOG = LoggerFactory.getLogger(${domain_objectName}ResourceImpl.class);

    @Override
    @Transactional
    public ${domain_objectName}s list(List<ReadOptionsType> options, String filter, Integer limit, String order) {
        ${domain_objectName}s res = new ${domain_objectName}s();
        JPAOrderedQueryVisitor<${domain_objectName}> visitor = new JPAOrderedQueryVisitor<>(em, ${domain_objectName}.class);
        TypedQuery<${domain_objectName}> query;
        if (filter != null) {
            SearchCondition<${domain_objectName}> sc;
            try {
                sc = searchContext.getCondition(filter, ${domain_objectName}.class);
            } catch (SearchParseException ex) {
                throw new BadRequestException(ex);
            }
            sc.accept(visitor);
            CriteriaQuery<${domain_objectName}> cq = order != null ? visitor.getOrderedCriteriaQuery(visitor, order) : visitor.getCriteriaQuery();
            query = em.createQuery(cq);

        } else {
            query = em.createQuery("SELECT d FROM ${domain_objectName} d", ${domain_objectName}.class);
        }
        if (options != null) {
            if (options.contains(ReadOptionsType.WITH_DOCFILES)) {
                query.setHint(QueryHints.LEFT_FETCH, "d.docfiles");
            }
        }
        if (limit != null) {
            query.setMaxResults(limit);
        }
        List<${domain_objectName}> result = query.getResultList();
        //res.get${domain_objectName}s().addAll(entityManagerIntr.copy(result, null, null));
        res.get${domain_objectName}s().addAll(result);
        return res;
    }

    @Override
    @Transactional
    public ${domain_objectName} find(UUID uid) {
        ${domain_objectName} doc = documentRepository.findByUid(uid);
        return doc;
    }

    @Override
    @Transactional
    public UUID create(${domain_objectName} document) {
        documentRepository.save(document);
        return document.getUid();
    }

    @Override
    @Transactional
    public void edit(UUID uid, ${domain_objectName} document) {
        ${domain_objectName} doc = documentRepository.findByUid(uid);
        BeanUtils.copyProperties(document, doc, new String[]{"id"});
    }

    @Override
    @Transactional
    public void remove(UUID uid) {
        ${domain_objectName} doc = documentRepository.findByUid(uid);
        documentRepository.delete(doc);
    }

    /**
     * Example data initialisation
     */
    @PostConstruct
    @Transactional
    public void init() {
        ${domain_objectName}s ${domain_packageName} = jaxbHelper.unmarshal(getClass().getResourceAsStream("/META-INF/xml/testdata.xml"), ${domain_objectName}s.class,MediaType.APPLICATION_XML);
        documentRepository.save(${domain_packageName}.get${domain_objectName}s());

    }

}
