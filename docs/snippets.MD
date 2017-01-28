# cxf-wadl2java-plugin
## jaxb-xew-plugin
<extraarg>-xjc-Xxew</extraarg>
<extraarg>-xjc-Xxew:instantiate lazy</extraarg>

<dependency>
    <groupId>com.github.jaxb-xew-plugin</groupId>
    <artifactId>jaxb-xew-plugin</artifactId>
    <version>1.4</version>
</dependency>

##episode file

<extraarg>-xjc-episode</extraarg>
<extraArg>-xjc${project.build.directory}/classes/schemas/jparestresource/jparestresource.episode</extraArg>

#JAXB

#how to make implementation class
jaxb:baseType required for List<> properties
<jaxb:bindings node="//xsd:complexType[@name='DocumentType']">
    <jaxb:class  implClass="package.Document"/>
</jaxb:bindings>
<jaxb:bindings multiple="true" node="//xsd:element[@ref='document']">
    <jaxb:property>
        <jaxb:baseType name="Document"/>
    </jaxb:property>
</jaxb:bindings>

#JPA
    <basic name="direction">
        <column column-definition="int(1)"/>
        <convert>DirectionTypeConverter</convert>
    </basic>

    <object-type-converter name="DirectionTypeConverter"
                           object-type="ru.ilb.jparestresource.model.DirectionType" data-type="java.lang.Integer">
        <conversion-value object-value="IN" data-value="0" />
        <conversion-value object-value="OUT" data-value="1" />
    </object-type-converter>