#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
set -e
rm -rf ${artifactId}-archetype
mvn clean archetype:create-from-project
mv target/generated-sources/archetype ${artifactId}-archetype
grep -Rl ${artifactId} ${artifactId}-archetype/src/main/resources/archetype-resources|xargs sed -i 's/${artifactId}/${symbol_dollar}{rootArtifactId}/g'
mv ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-ws/src/main/resources/ru/ilb/meta/${artifactId} ${artifactId}-archetype/src/main/resources/archetype-resources/__rootArtifactId__-ws/src/main/resources/ru/ilb/meta/__rootArtifactId__
cd ${artifactId}-archetype
mvn clean install