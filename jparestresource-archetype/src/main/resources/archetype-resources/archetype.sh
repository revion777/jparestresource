#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
${symbol_pound}script to update ${artifactId}-archetype module from project
set -e
rm -rf ${artifactId}-archetype
mvn clean archetype:create-from-project -Darchetype.properties=archetype.properties
mv target/generated-sources/archetype ${artifactId}-archetype
grep -Rl ${artifactId} ${artifactId}-archetype/src/main/resources/archetype-resources|xargs sed -i 's/${artifactId}/${symbol_dollar}{rootArtifactId}/g'
mv ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-ws/src/main/resources/${packageInPathFormat} ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-ws/src/main/resources/ru/ilb/__rootArtifactId__
cd ${artifactId}-archetype
mvn clean install