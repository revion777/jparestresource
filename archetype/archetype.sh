#script to update jparestresource-archetype module from project
set -e
cd ..
rm -rf frontend/node_modules/* frontend/node_modules/.bin
mvn clean archetype:create-from-project -Darchetype.properties=archetype/archetype.properties
#patch -p0 < archetype/pom.xml.diff
cd target/generated-sources/archetype
mvn clean install deploy