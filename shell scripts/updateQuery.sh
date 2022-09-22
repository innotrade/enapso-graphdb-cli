echo "Running Test for enapso-graphdb-cli To Update Query..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb update --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --queryfile "queries/all.sparql" --prefixfile "queries/prefixes.prf"">> $REPORT_FILE
echo "Enapso Test Suite Done"