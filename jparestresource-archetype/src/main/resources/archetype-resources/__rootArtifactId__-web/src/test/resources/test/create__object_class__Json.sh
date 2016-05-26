#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
curl -v -X POST -H "Content-Type: application/json" -u ide:123 -d @create${object_class}Json.json -o create${object_class}Json.txt http://localhost:8080/${parentArtifactId}-web/web/documents