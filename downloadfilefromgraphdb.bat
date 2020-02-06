@ECHO OFF 
:: This batch file reveals OS, hardware, and networking configuration.
TITLE Download Ontology
ECHO Please wait... Download File from Graphdb.
node index.js export -d "http://localhost:7200" -r "Test" -c "http://ont.enapso.com/test" -t "exports/backup.ttl" -u "Test" -p "Test" -f "text/turtle"

PAUSE