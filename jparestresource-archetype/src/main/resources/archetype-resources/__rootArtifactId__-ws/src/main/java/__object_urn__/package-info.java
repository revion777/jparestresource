#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
@javax.xml.bind.annotation.XmlSchema(namespace = "urn:ru:ilb:${parentArtifactId}:${object_urn}", elementFormDefault = javax.xml.bind.annotation.XmlNsForm.QUALIFIED)
@XmlAccessorFactory(LazyAccessorFactoryImpl.class)
package ${groupId}.${object_urn};

import com.sun.xml.internal.bind.XmlAccessorFactory;
import ru.ilb.common.jpa.jaxb.LazyAccessorFactoryImpl;

