application=${1:-sampleapplication}
rm -rf ${application}
mvn -DarchetypeGroupId=ru.ilb.jparestresource -DarchetypeArtifactId=jparestresource-archetype -DarchetypeVersion=1.0-SNAPSHOT -DgroupId=ru.ilb.${application} -DartifactId=${application} -Dversion=1.0-SNAPSHOT -Dpackage=ru.ilb.${application} -Darchetype.interactive=false -DarchetypeCatalog=local --batch-mode --update-snapshots archetype:generate
