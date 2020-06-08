echo "Running Test for enapso-graphdb-cli To Upload Ontology to GraphDB..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb import --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/repo" --baseiri "http://ont.enapso.com/repo#" --sourcefile "imports/EnapsoOntologyRepository.owl" --username "admin" --password "root" --format "application/rdf+xml">> $REPORT_FILE
echo "Enapso Test Suite Done"