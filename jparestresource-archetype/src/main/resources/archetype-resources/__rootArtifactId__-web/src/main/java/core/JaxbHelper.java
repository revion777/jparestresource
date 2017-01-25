#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * Copyright 2016 slavb.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ${groupId}.core;

import java.io.InputStream;
import java.io.StringWriter;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.ContextResolver;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlType;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import org.eclipse.persistence.jaxb.MarshallerProperties;
import org.eclipse.persistence.jaxb.UnmarshallerProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author klimovskih
 */
@Component
public class JaxbHelper {

    @Autowired ContextResolver<JAXBContext> jaxbContextResolver;

    public <T> T unmarshal(String data, Class<T> type, String mediaType) {

        JAXBContext jaxbContext = jaxbContextResolver.getContext(type);
        try {
            JAXBElement<T> result;
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            unmarshaller.setProperty(UnmarshallerProperties.MEDIA_TYPE, mediaType);
            Source source = new StreamSource(new java.io.StringReader(data));
            result = (JAXBElement<T>) unmarshaller.unmarshal(source, type);

            return result.getValue();

        } catch (JAXBException ex) {
            throw new RuntimeException(ex);
        }
    }
    public <T> T unmarshal(InputStream data, Class<T> type, String mediaType) {

        JAXBContext jaxbContext = jaxbContextResolver.getContext(type);
        try {
            T result;
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            unmarshaller.setProperty(UnmarshallerProperties.MEDIA_TYPE, mediaType);
            result = (T) unmarshaller.unmarshal(data);

            return result;

        } catch (JAXBException ex) {
            throw new RuntimeException(ex);
        }
    }
    

    public String marshal(Object obj, String mediaType) {

        StringWriter sw = new StringWriter();
        XmlType ann = obj.getClass().getAnnotation(XmlType.class);
        ann.name();
        try {
            JAXBContext jaxbContext = jaxbContextResolver.getContext(obj.getClass());
            Marshaller marshaller = jaxbContext.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            marshaller.setProperty(MarshallerProperties.MEDIA_TYPE, mediaType);
            if (MediaType.APPLICATION_JSON.equals(mediaType)) {
                marshaller.setProperty(MarshallerProperties.JSON_INCLUDE_ROOT, false);
            }
            marshaller.marshal(obj, sw);
        } catch (JAXBException ex) {
            throw new RuntimeException(ex);
        }

        return sw.toString();

    }

}
