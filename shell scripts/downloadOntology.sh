echo "Running Test for enapso-graphdb-cli To Download Ontology from Graph Database..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
./index.js export --dburl "http://localhost:7200" --repository "Test" --targetfile "exports/export.ttl"  --username "admin" --password "root" --format "text/turtle" >> $REPORT_FILE 
echo "ENAPSO Test Suite Done"
read -p "hello"