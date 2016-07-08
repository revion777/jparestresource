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
