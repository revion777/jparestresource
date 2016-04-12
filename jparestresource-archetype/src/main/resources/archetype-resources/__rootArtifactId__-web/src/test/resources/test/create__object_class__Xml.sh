#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
curl -v -X POST -H "Content-Type: application/xml" -u ide:123 -d @create${object_class}Xml.xml -o create${object_class}Xml.txt http://localhost:8080/${parentArtifactId}-web/web/${object_urn}s