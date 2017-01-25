#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
curl -v -X POST -H "Content-Type: application/xml" -u ide:123 -d @createDocumentXml.xml -o createDocumentXml.txt http://localhost:8080/${parentArtifactId}-web/web/documents