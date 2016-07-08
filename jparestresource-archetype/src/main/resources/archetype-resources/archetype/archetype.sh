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
${symbol_pound}mv ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/${packageInPathFormat} ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/__rootArtifactId__
${symbol_pound}mv ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/__rootArtifactId__/document ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-web/src/main/resources/ru/ilb/__rootArtifactId__/__object_urn__
sed -i 's/${domain_packageName}.xjb/${symbol_dollar}{domain_packageName}.xjb/' ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-api/pom.xml
patch -p0 < archetype/pom.xml.diff
cd ${artifactId}-archetype
mvn clean install