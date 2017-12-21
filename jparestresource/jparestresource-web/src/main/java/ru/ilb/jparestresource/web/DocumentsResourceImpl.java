/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.ilb.jparestresource.web;

import io.swagger.annotations.Api;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import org.apache.cxf.jaxrs.ext.search.SearchContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import ru.ilb.jparestresource.api.DocumentsResource;
import ru.ilb.jparestresource.logic.DocumentLogic;
import ru.ilb.jparestresource.mappers.DocumentMapper;
import ru.ilb.jparestresource.utils.JaxbHelper;
import ru.ilb.jparestresource.repositories.DocumentRepository;
import ru.ilb.jparestresource.providers.AuthorizationHandler;
import ru.ilb.jparestresource.view.Document;
import ru.ilb.jparestresource.view.Documents;

@Path("documents")
@Api("documents")
//@CrossOriginResourceSharing(allowOrigins = {"http://area51.mil:31415"},allowCredentials = true)
public class DocumentsResourceImpl implements DocumentsResource {

    @Autowired
    AuthorizationHandler authorizationHandler;

    @Autowired
    JaxbHelper jaxbHelper;

    @Autowired
    private DocumentMapper documentMapper;
    
    @Autowired 
    private DocumentLogic documentLogic;

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

    private static final Logger LOG = LoggerFactory.getLogger(DocumentsResourceImpl.class);

    @Override
    public Documents list(Integer limit, String order) {
        return documentMapper.createWrapperFromEntities(documentRepository.findAll());
    }

    @Override
    public long create(Document document) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void createBatch(Documents documents) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void remove(long documentId) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Document find(long documentId) {
        return documentMapper.createFromEntity(documentLogic.getDocument(documentId));
    }

    @Override
    public void edit(long documentId, Document document) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
