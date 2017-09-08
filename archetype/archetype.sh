#script to update jparestresource-archetype module from project
set -e
cd ../jparestresource
mvn clean archetype:create-from-project -Darchetype.properties=../archetype/archetype.properties
grep -Rl jparestresource target/generated-sources/archetype/src/main/resources/archetype-resources|xargs sed -i 's/jparestresource/${rootArtifactId}/g'
#patch -p0 < archetype/pom.xml.diff
cd target/generated-sources/archetype
mvn clean install deploy