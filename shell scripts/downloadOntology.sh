echo "Running Test for enapso-graphdb-cli To Download Ontology from Graph Database..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb export --dburl "http://localhost:5820" --repository "Test" --context "http://ont.enapso.com/test" --targetfile "exports/export.ttl"  --username "admin" --password "root" --format "text/turtle" --triplestore "stardog">> $REPORT_FILE 
echo "ENAPSO Test Suite Done"