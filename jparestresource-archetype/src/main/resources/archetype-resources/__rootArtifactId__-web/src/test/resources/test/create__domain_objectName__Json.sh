#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
curl -v -X POST -H "Content-Type: application/json" -u ide:123 -d @create${domain_objectName}Json.json -o create${domain_objectName}Json.txt http://localhost:8080/${parentArtifactId}-web/web/${domain_packageName}