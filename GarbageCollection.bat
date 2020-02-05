@ECHO OFF 
:: This batch file reveals OS, hardware, and networking configuration.
TITLE Garbage Collection
ECHO Please wait... Collections of Garbage in Graphdb.
set MyPath="C:\Users\yasir\OneDrive\Documents\enapso-graphdb-cli"
node index.js gc --dburl "http://localhost:7200" --username "Test" --password "Test"
PAUSE