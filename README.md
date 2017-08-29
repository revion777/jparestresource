# jparestresource
JAX-RS + JPA application

##Example project creation based on this archetype in command line

mvn -DarchetypeGroupId=ru.ilb.jparestresource -DarchetypeArtifactId=jparestresource-archetype -DarchetypeVersion=1.0-SNAPSHOT -DgroupId=ru.ilb.sampleapplication -DartifactId=sampleapplication -Dversion=1.0-SNAPSHOT -Dpackage=ru.ilb.sampleapplication -Darchetype.interactive=false --batch-mode --update-snapshots archetype:generate


##Example project creation based on this archetype in Netbeans

1. File -> New Project, choose Maven -> Project from archetype, click Next
2. Start typing jparesresource in Search field and choose jparestresource-archetype, click Next
3. Enter Project name (sampleapplication), Group Id and Package must *equals*, enter in both fields ru.ilb.sampleapplication. Click Next.

Project will be created. Before first run database should be created and access to web application granted (see schema.sql);

## Environment configuration
Place in ${catalina.base}/lib following jars:
* eclipselink-2.6.4.jar
* javax.json-1.0.4.jar
* javax.persistence-2.1.0.jar
* mysql-connector-java-5.1.31.jar

##Note about Tomcat before 8.0.33
TomcatInstrumentableClassLoader is not intended to work on Tomcat 8.0.33+, but required in older versions.
In case of exception javax.persistence.TransactionRequiredException: No EntityManager with actual transaction available for current thread 
uncomment line with &lt;Loader loaderClass="org.springframework.instrument.classloading.tomcat.TomcatInstrumentableClassLoader"/> in context.xml
and place spring-instrument-tomcat-4.3.2.RELEASE.jar in ${catalina.base}/lib


##React frontend
Install netbeans support for .nbigonre plugin, or node_modules background scanning will never end:
https://netbeans.org/bugzilla/show_bug.cgi?id=238709#c36

Direct link: http://deadlock.netbeans.org/job/nbms-and-javadoc/lastSuccessfulBuild/artifact/nbbuild/nbms/extra/org-netbeans-modules-nbignore.nbm

## Jeddict plugin for Netbeans
Install Jeddict from  https://jeddict.github.io

#Code snippets

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

## eclipselink modelgen

```xml
<plugin>
    <groupId>org.bsc.maven</groupId>
    <artifactId>maven-processor-plugin</artifactId>
    <version>3.2.0</version>
    <executions>
        <execution>
            <id>eclipselink-jpa-metamodel</id>
            <goals>
                <goal>process</goal>
            </goals>
            <phase>process-resources</phase>
            <configuration>

                <processors>
                    <processor>org.eclipse.persistence.internal.jpa.modelgen.CanonicalModelProcessor</processor>
                </processors>
                <appendSourceArtifacts>true</appendSourceArtifacts>
                <processSourceArtifacts>
                    <processSourceArtifact>ru.ilb.jparestresource:jparestresource-api</processSourceArtifact>
                    <processSourceArtifact>ru.ilb.common:common-jpa</processSourceArtifact>
                </processSourceArtifacts>

                <outputDirectory>${project.build.directory}/generated-sources/meta-model</outputDirectory>
            </configuration>
        </execution>
    </executions>
    <dependencies>
        <dependency>
            <groupId>org.eclipse.persistence</groupId>
            <artifactId>org.eclipse.persistence.jpa.modelgen.processor</artifactId>
            <version>${eclipselink.version}</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
</plugin>
```
## tomcat intergration tests 

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-failsafe-plugin</artifactId>
    <version>2.17</version>
    <executions>
        <execution>
            <goals>
                <goal>integration-test</goal>
                <goal>verify</goal>
            </goals>
        </execution>
    </executions>
</plugin>
<plugin>
    <groupId>org.apache.tomcat.maven</groupId>
    <artifactId>tomcat7-maven-plugin</artifactId>

    <version>2.2</version>

    <configuration>
        <path>/jparestresource</path>
        <contextFile>${basedir}/src/test/resources/tomcat/context.xml</contextFile>
        <useTestClasspath>true</useTestClasspath>
    </configuration>

    <executions>
        <!-- At pre-integration-test phase, run the war in an embedded Tomcat server. -->
        <execution>
            <id>start-tomcat</id>
            <phase>pre-integration-test</phase>
            <goals>
                <goal>run-war-only</goal>
            </goals>
            <configuration>
                <port>59190</port>
                <fork>true</fork>
            </configuration>
        </execution>
        <!-- At post-integration-test phase, stop the embedded Tomcat server. -->
        <execution>
            <id>stop-tomcat</id>
            <phase>post-integration-test</phase>
            <goals>
                <goal>shutdown</goal>
            </goals>
        </execution>
    </executions>
    <dependencies>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>${mysql-connector.version}</version>
        </dependency>
        <dependency>
            <groupId>org.eclipse.persistence</groupId>
            <artifactId>javax.persistence</artifactId>
            <version>${javax-persistence.version}</version>
        </dependency>
        <dependency>
            <groupId>org.eclipse.persistence</groupId>
            <artifactId>eclipselink</artifactId>
            <version>${eclipselink.version}</version>
        </dependency>
    </dependencies>
</plugin>
```

## common dependencies

```xml
<!-- jettison JSON provider -->
<dependency>
    <groupId>org.codehaus.jettison</groupId>
    <artifactId>jettison</artifactId>
    <version>1.3.7</version>
</dependency>
<!-- jackson JSON provider -->
<dependency>
    <groupId>com.fasterxml.jackson.jaxrs</groupId>
    <artifactId>jackson-jaxrs-json-provider</artifactId>
    <version>2.7.4</version>
</dependency>
<!-- dependency to enable CORS support -->
<dependency>
    <groupId>org.apache.cxf</groupId>
    <artifactId>cxf-rt-rs-security-cors</artifactId>
    <version>${apache-cxf.version}</version>
</dependency>
<!-- dynamic entity graph -->
<dependency>
    <groupId>com.cosium.spring.data</groupId>
    <artifactId>spring-data-jpa-entity-graph</artifactId>
    <version>1.10.13</version>
</dependency>
```

## make implementation class in JAXB binding

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
