echo "Running Test for enapso-graphdb-cli To Download Ontology from GraphDB..."
enapsogdb export --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --targetfile "exports/export.ttl"  --username "Test" --password "Test" --format "text/turtle"
echo "Enapso Test Suite Done"