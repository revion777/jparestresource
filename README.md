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
* eclipselink-2.7.1.jar
* javax.json-1.0.4.jar
* javax.persistence-2.1.1.jar
* validation-api-1.1.0.Final.jar
* mysql-connector-java-5.1.31.jar


##Note about Tomcat before 8.0.33
TomcatInstrumentableClassLoader is not intended to work on Tomcat 8.0.33+, but required in older versions.
In case of exception javax.persistence.TransactionRequiredException: No EntityManager with actual transaction available for current thread 
uncomment line with &lt;Loader loaderClass="org.springframework.instrument.classloading.tomcat.TomcatInstrumentableClassLoader"/> in context.xml
and place spring-instrument-tomcat-4.3.2.RELEASE.jar in ${catalina.base}/lib


## Jeddict plugin for Netbeans
Install Jeddict from  https://jeddict.github.io
