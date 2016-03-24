#script to update jparestresource-archetype module from project
set -e
rm -rf jparestresource-archetype
mvn clean archetype:create-from-project
mv target/generated-sources/archetype jparestresource-archetype
grep -Rl jparestresource jparestresource-archetype/src/main/resources/archetype-resources|xargs sed -i 's/jparestresource/${rootArtifactId}/g'
mv jparestresource-archetype/src/main/resources/archetype-resources/__rootArtifactId__-ws/src/main/resources/ru/ilb/jparestresource jparestresource-archetype/src/main/resources/archetype-resources/__rootArtifactId__-ws/src/main/resources/ru/ilb/__rootArtifactId__
cd jparestresource-archetype
mvn clean install