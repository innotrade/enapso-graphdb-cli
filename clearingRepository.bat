@ECHO OFF 
:: This batch file reveals OS, hardware, and networking configuration.
TITLE Clearing Repository
ECHO Please wait... Clearing of Repository in Graphdb.
node index.js clearRepository --dburl "http://localhost:7200" --repository "Test" --username "Test" --password "Test"

PAUSE