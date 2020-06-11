echo "Running Test for enapso-graphdb-cli To Run SPARQL Query..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb query --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --queryfile "queries/all.sparql" --prefixfile "queries/prefixes.prf" --targetfile "results/countries.csv">> $REPORT_FILE
echo "Enapso Test Suite Done"