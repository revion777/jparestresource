# jparestresource
Example Rest JPA application

## Project structure
* jparestresource-api contains WADL and xsd schemas shared between client and server
* jparestresource-web contains web application with JAX-RS services and JPA model.
* jparestresource-archetype contains archetype to create new project based on this.
* archetype contains scripts to create/update jparestresource-archetype

##Example project creation based on this archetype in command line

mvn -DarchetypeGroupId=ru.ilb.jparestresource -DarchetypeArtifactId=jparestresource-archetype -DarchetypeVersion=1.0-SNAPSHOT -DgroupId=ru.ilb.sampleapplication -DartifactId=sampleapplication -Dversion=1.0-SNAPSHOT -Dpackage=ru.ilb.sampleapplication -Ddomain_packageName=documents -Ddomain_objectName=Document -Darchetype.interactive=false --batch-mode --update-snapshots archetype:generate


##Example project creation based on this archetype in Netbeans

1. File -> New Project, choose Maven -> Project from archetype, click Next
2. Start typing jparesresource in Search field and choose jparestresource-archetype, click Next
3. Enter Project name (sampleapplication), Group Id and Package must *equals*, enter in both fields ru.ilb.sampleapplication. You may also configure object_urn and object_class properties. Click Next.

Project will be created. Before first run database should be created and access to web application granted (see schema.sql);

## Environment configuration
Place in ${catalina.base}/lib following jars:
1. eclipselink-2.6.3.jar
2. javax.json-1.0.4.jar
3. javax.persistence-2.1.0.jar
4. mysql-connector-java-5.1.31.jar

###Note about Tomcat before 8.0+
TomcatInstrumentableClassLoader is not intended to work on Tomcat 8.0+, but required in older versions.
In case of exception javax.persistence.TransactionRequiredException: No EntityManager with actual transaction available for current thread 
uncomment this line 
<Loader loaderClass="org.springframework.instrument.classloading.tomcat.TomcatInstrumentableClassLoader"/>
and place spring-instrument-tomcat-4.3.2.RELEASE.jar in ${catalina.base}/lib
