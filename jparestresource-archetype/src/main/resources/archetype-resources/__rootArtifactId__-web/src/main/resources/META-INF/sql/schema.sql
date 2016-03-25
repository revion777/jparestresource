#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
drop schema if exists ${parentArtifactId};
create schema ${parentArtifactId};
grant all privileges on ${parentArtifactId}.* to '${parentArtifactId}'@'localhost' identified by '${parentArtifactId}';
grant all privileges on ${parentArtifactId}.* to '${parentArtifactId}'@'%' identified by '${parentArtifactId}';

