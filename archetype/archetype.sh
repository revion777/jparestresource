#script to update jparestresource-archetype module from project
set -e
cd ..
rm -rf jparestresource-archetype
mvn clean archetype:create-from-project -Darchetype.properties=archetype/archetype.properties
mv target/generated-sources/archetype jparestresource-archetype
grep -Rl jparestresource jparestresource-archetype/src/main/resources/archetype-resources|xargs sed -i 's/jparestresource/${rootArtifactId}/g'
#mv jparestresource-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/jparestresource jparestresource-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/__rootArtifactId__
#mv jparestresource-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/__rootArtifactId__/document jparestresource-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/__rootArtifactId__/__object_urn__
sed -i 's/document.xjb/${object_urn}.xjb/' jparestresource-archetype/src/main/resources/archetype-resources/__rootArtifactId__-api/pom.xml
patch -p0 < archetype/pom.xml.diff
cd jparestresource-archetype
mvn clean install