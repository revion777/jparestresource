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
