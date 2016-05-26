#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
@javax.xml.bind.annotation.XmlSchema(namespace = "urn:ru:ilb:${parentArtifactId}:${parentArtifactId}", elementFormDefault = javax.xml.bind.annotation.XmlNsForm.QUALIFIED)
@XmlAccessorFactory(LazyAccessorFactoryImpl.class)
package ${package}.${parentArtifactId};

import com.sun.xml.internal.bind.XmlAccessorFactory;
import ru.ilb.common.jpa.jaxb.LazyAccessorFactoryImpl;

