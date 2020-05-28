echo "Running Test for enapso-graphdb-cli To Upload Ontology to GraphDB..."
enapsogdb import --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --baseiri "http://ont.enapso.com/test#" --sourcefile "imports/dotnetpro_demo_ontology_2.owl" --username "Test" --password "Test" --format "application/rdf+xml"
echo "Enapso Test Suite Done"