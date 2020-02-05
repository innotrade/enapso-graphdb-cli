@ECHO OFF 
:: This batch file reveals OS, hardware, and networking configuration.
TITLE Uploading and Importing Ontology
ECHO Please wait... Uploading and Importing File in Graphdb.
node index.js import --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --baseiri "http://ont.enapso.com/test#" --sourcefile "imports/test.owl" --username "Test" --password "Test" --format "application/rdf+xml"

PAUSE