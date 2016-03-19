#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
@javax.xml.bind.annotation.XmlSchema(namespace = "urn:ru:ilb:meta:${parentArtifactId}:document", elementFormDefault = javax.xml.bind.annotation.XmlNsForm.QUALIFIED)
@XmlAccessorFactory(LazyAccessorFactoryImpl.class)
package ru.ilb.meta.${parentArtifactId}.document;

import com.sun.xml.internal.bind.XmlAccessorFactory;
import ru.ilb.common.jpa.jaxb.LazyAccessorFactoryImpl;

