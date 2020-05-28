echo "Running Test for enapso-graphdb-cli To Upload Ontology to GraphDB..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb import --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/dotnetpro" --baseiri "http://ont.enapso.com/dotnetpro#" --sourcefile "imports/dotnetpro_demo_ontology_2.owl" --username "Test" --password "Test" --format "application/rdf+xml">> $REPORT_FILE
echo "Enapso Test Suite Done"