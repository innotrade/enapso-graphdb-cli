echo "Running Test for enapso-graphdb-cli To Download Ontology from GraphDB..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb export --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --targetfile "exports/export.ttl"  --username "Test" --password "Test" --format "text/turtle">> $REPORT_FILE 
echo "Enapso Test Suite Done"