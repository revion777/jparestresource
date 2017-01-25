#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
curl -v -X POST -H "Content-Type: application/json;charset=UTF-8" -u ide:123 -d @createDocumentJson.json -o createDocumentJson.txt http://localhost:8080/${parentArtifactId}-web/web/documents
