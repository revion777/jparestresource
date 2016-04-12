#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
${symbol_pound}script to update ${artifactId}-archetype module from project
set -e
cd ..
rm -rf ${artifactId}-archetype
mvn clean archetype:create-from-project -Darchetype.properties=archetype/archetype.properties
mv target/generated-sources/archetype ${artifactId}-archetype
grep -Rl ${artifactId} ${artifactId}-archetype/src/main/resources/archetype-resources|xargs sed -i 's/${artifactId}/${symbol_dollar}{rootArtifactId}/g'
mv ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/${packageInPathFormat} ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/__rootArtifactId__
mv ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/__rootArtifactId__/${object_urn} ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/__rootArtifactId__/__object_urn__
sed -i 's/${object_urn}.xjb/${symbol_dollar}{object_urn}.xjb/' ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-api/pom.xml
patch -p0 < archetype/pom.xml.diff
cd ${artifactId}-archetype
mvn clean install