#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
${symbol_pound} ${artifactId}
Example Rest JPA application

${symbol_pound}${symbol_pound} Project structure
* ${artifactId}-api contains WADL and xsd schemas shared between client and server
* ${artifactId}-web contains web application with JAX-RS services and JPA model.
* ${artifactId}-archetype contains archetype to create new project based on this.
* archetype contains scripts to create/update ${artifactId}-archetype

${symbol_pound}${symbol_pound}Example project creation based on this archetype in command line

mvn -DarchetypeGroupId=${package} -DarchetypeArtifactId=${artifactId}-archetype -DarchetypeVersion=${version} -DgroupId=ru.ilb.sampleapplication -DartifactId=sampleapplication -Dversion=${version} -Dpackage=ru.ilb.sampleapplication -Ddomain_packageName=documents -Ddomain_objectName=Document -Darchetype.interactive=false --batch-mode --update-snapshots archetype:generate


${symbol_pound}${symbol_pound}Example project creation based on this archetype in Netbeans

1. File -> New Project, choose Maven -> Project from archetype, click Next
2. Start typing jparesresource in Search field and choose ${artifactId}-archetype, click Next
3. Enter Project name (sampleapplication), Group Id and Package must *equals*, enter in both fields ru.ilb.sampleapplication. You may also configure object_urn and object_class properties. Click Next.

Project will be created. Before first run database should be created and access to web application granted (see schema.sql);

${symbol_pound}${symbol_pound} Environment configuration
Place in ${symbol_dollar}{catalina.base}/lib following jars:
* eclipselink-2.6.3.jar
* javax.json-1.0.4.jar
* javax.persistence-2.1.0.jar
* mysql-connector-java-5.1.31.jar

${symbol_pound}${symbol_pound}${symbol_pound}Note about Tomcat before 8.0+
TomcatInstrumentableClassLoader is not intended to work on Tomcat 8.0+, but required in older versions.
In case of exception javax.persistence.TransactionRequiredException: No EntityManager with actual transaction available for current thread 
uncomment this line with org.springframework.instrument.classloading.tomcat.TomcatInstrumentableClassLoader in context.xml
and place spring-instrument-tomcat-4.3.2.RELEASE.jar in ${symbol_dollar}{catalina.base}/lib
