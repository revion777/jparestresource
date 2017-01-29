#React frontend
Install netbeans support for .nbigonre plugin, or node_modules background scanning will never end
https://netbeans.org/bugzilla/show_bug.cgi?id=238709#c36
direct link http://deadlock.netbeans.org/job/nbms-and-javadoc/lastSuccessfulBuild/artifact/nbbuild/nbms/extra/org-netbeans-modules-nbignore.nbm


# Migration from multi-module pom (separate -api, -web)

1. open "-web" module pom.xml, remove <parent></parent>, add <groupId></groupId>
2. merge parent's and "-api" module pom.xml into "-web" pom.xml
3. copy schemas from "-api" module
4. remove "-api" module dependency from "-web" module
5. delete parent pom.xml and "-api" module
6. optionally: rename project, remove "-web" suffix, move sources to parent
7. separate client jar generation

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>3.0.2</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>jar</goal>
            </goals>
            <configuration>
                <classifier>client</classifier>
                <includes>
                    <include>**/api/*</include>
                    <include>**/model/*</include>
                </includes>
            </configuration>
        </execution>
    </executions>
</plugin>            
```

#JAXB binding

##make implementation class
jaxb:baseType required for List<> properties
```xml
<jaxb:bindings node="//xsd:complexType[@name='DocumentType']">
    <jaxb:class  implClass="package.Document"/>
</jaxb:bindings>
<jaxb:bindings multiple="true" node="//xsd:element[@ref='document']">
    <jaxb:property>
        <jaxb:baseType name="Document"/>
    </jaxb:property>
</jaxb:bindings>
```

#JPA
## Attribute converter
```xml
    <basic name="direction">
        <column column-definition="int(1)"/>
        <convert>DirectionTypeConverter</convert>
    </basic>

    <object-type-converter name="DirectionTypeConverter"
                           object-type="ru.ilb.jparestresource.model.DirectionType" data-type="java.lang.Integer">
        <conversion-value object-value="IN" data-value="0" />
        <conversion-value object-value="OUT" data-value="1" />
    </object-type-converter>
```
#maven

## cxf-wadl2java-plugin
```xml
<plugin>
    <groupId>org.apache.cxf</groupId>
    <artifactId>cxf-wadl2java-plugin</artifactId>
    <version>${apache-cxf.version}</version>
    <executions>
        <execution>
            <id>generate-sources</id>
            <phase>generate-sources</phase>
            <configuration>
                <sourceRoot>${project.build.directory}/generated-sources/xjc</sourceRoot>
                <wadlOptions>
                    <wadlOption>
                        <wadl>${basedir}/src/main/resources/schemas/jparesresource/application.wadl</wadl>
                        <packagename>ru.ilb.jparesresource.api</packagename>
                        <bindingFiles>
                            <bindingFile>${basedir}/src/main/resources/schemas/jparesresource/core.xjb</bindingFile>
                        </bindingFiles>
                        <extraargs>
                            <extraarg>-verbose</extraarg>
                            <extraarg>-inheritResourceParams</extraarg>
                            <extraarg>-javaDocs</extraarg>
                            <extraarg>-xjc-Xjavadoc</extraarg>
                            <extraarg>-tMap</extraarg>
                            <extraarg>{urn:ru:ilb:jparesresource:core}uuid=java.util.UUID</extraarg>
                            <extraarg>-beanValidation</extraarg>
                            <extraarg>-xjc-Xannotate</extraarg>
                            <extraarg>-xjc-Xinheritance</extraarg>
                            <extraarg>-xjc-XenumValue</extraarg>
                            <extraarg>-xjc-Xsetters</extraarg>
                            <extraarg>-xjc-Xsetters-mode=direct</extraarg>
                            <extraarg>-xjc-Xfluent-api</extraarg>
                            <extraarg>-xjc-enableIntrospection</extraarg>
                        </extraargs>
                    </wadlOption>
                </wadlOptions>
            </configuration>
            <goals>
                <goal>wadl2java</goal>
            </goals>
        </execution>
    </executions>
    <dependencies>
        <dependency>
            <groupId>org.jvnet.jaxb2_commons</groupId>
            <artifactId>jaxb2-basics</artifactId>
            <version>0.9.4</version>
        </dependency>
        <dependency>
            <groupId>org.jvnet.jaxb2_commons</groupId>
            <artifactId>jaxb2-fluent-api</artifactId>
            <version>3.0</version>
        </dependency>
        <dependency>
            <groupId>org.jvnet.jaxb2_commons</groupId>
            <artifactId>jaxb2-basics-annotate</artifactId>
            <version>1.0.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf.xjcplugins</groupId>
            <artifactId>cxf-xjc-javadoc</artifactId>
            <version>3.0.5</version>
        </dependency>                    
        <dependency>
            <groupId>com.github.krasa</groupId>
            <artifactId>krasa-jaxb-tools</artifactId>
            <version>1.5</version>
        </dependency>
    </dependencies>
</plugin>
```
### catalog.xml
```xml
<extraarg>-catalog</extraarg>
<extraarg>${basedir}/src/main/resources/schemas/jparesresource/catalog.xml</extraarg>
```

### jaxb-xew-plugin
```xml
<extraarg>-xjc-Xxew</extraarg>
<extraarg>-xjc-Xxew:instantiate lazy</extraarg>

<dependency>
    <groupId>com.github.jaxb-xew-plugin</groupId>
    <artifactId>jaxb-xew-plugin</artifactId>
    <version>1.4</version>
</dependency>
```

### episode file
```xml
<extraarg>-xjc-episode</extraarg>
<extraArg>-xjc${project.build.directory}/classes/schemas/jparestresource/jparestresource.episode</extraArg>
```

## file tasks (delete, create, copy...)
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-antrun-plugin</artifactId>
    <version>1.7</version>
    <executions>
        <execution>
            <phase>generate-sources</phase>
            <goals>
                <goal>run</goal>
            </goals>
            <configuration>
                <tasks>
                    <delete>
                        <fileset dir="${project.build.directory}/..." includes="*" />
                    </delete>
                </tasks>
            </configuration>
        </execution>
    </executions>
</plugin>
```
## generate swagger.json
```xml
<plugin>
    <groupId>com.github.kongchen</groupId>
    <artifactId>swagger-maven-plugin</artifactId>
    <version>3.1.4</version>
    <configuration>
        <apiSources>
            <apiSource>
                <locations>
                    <location>ru.ilb.jparesresource.api</location>
                </locations>
                <schemes>
                    <scheme>http</scheme>
                    <scheme>https</scheme>
                </schemes>
                <host>www.example.com:8080</host>
                <basePath>/api</basePath>
                <info>
                    <title>Swagger Maven Plugin Sample</title>
                    <version>v1</version>
                    <description>
                        This is a sample.
                    </description>
                    <termsOfService>
                        http://www.github.com/kongchen/swagger-maven-plugin
                    </termsOfService>
                    <contact>
                        <email>kongchen@gmail.com</email>
                        <name>Kong Chen</name>
                        <url>http://kongch.com</url>
                    </contact>
                    <license>
                        <url>http://www.apache.org/licenses/LICENSE-2.0.html</url>
                        <name>Apache 2.0</name>
                    </license>
                </info>
                <securityDefinitions>
                    <securityDefinition>
                        <name>basicAuth</name>
                        <type>basic</type>
                    </securityDefinition>
                    <securityDefinition>
                        <json>/securityDefinition.json</json>
                    </securityDefinition>
                </securityDefinitions>
                <templatePath>${basedir}/src/test/resources/strapdown.html.hbs</templatePath>
                <outputPath>${basedir}/generated/document.html</outputPath>
                <swaggerDirectory>${basedir}/generated/swagger-ui</swaggerDirectory>
                <attachSwaggerArtifact>true</attachSwaggerArtifact>
                <modelConverters>
                    <modelConverter>io.swagger.validator.BeanValidator</modelConverter>
                </modelConverters>
            </apiSource>
        </apiSources>
    </configuration>
    <executions>
        <execution>
            <phase>compile</phase>
            <goals>
                <goal>generate</goal>
            </goals>
        </execution>
    </executions>
    <dependencies>
         Adding dependency to swagger-hibernate-validations to enable the BeanValidator as a custom
        model converter 
        <dependency>
            <groupId>io.swagger</groupId>
            <artifactId>swagger-hibernate-validations</artifactId>
            <version>1.5.6</version>
        </dependency>
    </dependencies>
</plugin>
```
## generate swagger client
```xml
<plugin>
    <groupId>io.swagger</groupId>
    <artifactId>swagger-codegen-maven-plugin</artifactId>
    <version>2.2.1</version>
    <executions>
        <execution>
            <goals>
                <goal>generate</goal>
            </goals>
            <configuration>
                <inputSpec>src/main/resources/schemas/jparesresource/swagger.yaml</inputSpec>
                <language>html</language>
                <configOptions>
                    <sourceFolder>src/gen/java/main</sourceFolder>
                </configOptions>
            </configuration>
        </execution>
    </executions>
</plugin>
```

## schemagen
```xml
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>jaxb2-maven-plugin</artifactId>
    <version>2.2</version>
    <executions>
        <execution>
            <id>schemagen</id>
            <goals>
                <goal>schemagen</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <sources>
            <source>src/main/java/ru/ilb/jparesresource/model</source>
        </sources>             
        <schemaSourceExcludeFilters>
            <noJaxbIndex implementation="org.codehaus.mojo.jaxb2.shared.filters.pattern.PatternFileFilter">
                <patterns>
                    <pattern>package-info\.java</pattern>
                </patterns>
            </noJaxbIndex>
        </schemaSourceExcludeFilters>
        <transformSchemas>
            <transformSchema>
                <uri>urn:ru:ilb:jparesresource:model</uri>
                <toPrefix>model</toPrefix>
                <toFile>model.xsd</toFile>
            </transformSchema>                        
        </transformSchemas>                    
    </configuration>
</plugin>
```

## replace in files
```xml
<plugin>
    <groupId>com.google.code.maven-replacer-plugin</groupId>
    <artifactId>replacer</artifactId>
    <version>1.5.3</version>
    <executions>
        <execution>
            <id>replace_Relation</id>
            <phase>process-resources</phase>
            <goals>
                <goal>replace</goal>
            </goals>
            <configuration>
                <file>${basedir}/target/generated-resources/schemagen/model.xsd</file>
                <replacements>
                    <replacement>
                        <token>search</token>
                        <value>replace</value>
                    </replacement>
                </replacements>
            </configuration>
        </execution>
    </executions>
</plugin>
```
##java2wadl
```xml
<plugin>
    <groupId>org.apache.cxf</groupId>
    <artifactId>cxf-java2wadl-plugin</artifactId>
    <version>${apache-cxf.version}</version>
    <executions>
        <execution>
            <id>parsejavadoc</id>
            <phase>generate-sources</phase>
            <goals>
                <goal>parsejavadoc</goal>
            </goals>
        </execution>
        <execution>
            <id>process-classes</id>
            <phase>process-classes</phase>
            <goals>
                <goal>java2wadl</goal>
            </goals>
            <configuration>
                <classResourceNames>
                    <classResourceName>ru.ilb.jparesresource.web.DocumentsResourceImpl</classResourceName>
                </classResourceNames>
                <docProvider>org.apache.cxf.maven_plugin.javatowadl.ResourceMapJavaDocProvider</docProvider>
                <attachWadl>true</attachWadl>
            </configuration>
        </execution>
    </executions>
</plugin>
```