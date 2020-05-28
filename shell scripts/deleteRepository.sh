echo "Running Test for enapso-graphdb-cli To Delete Repository..."
enapsogdb deleteRepository --dburl "http://localhost:7200" --repository "TestRepository" --username "Test" --password "Test"
echo "Enapso Test Suite Done"