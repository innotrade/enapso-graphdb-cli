echo "Running Test for enapso-graphdb-cli To Create Repository..."
enapsogdb createRepository --dburl "http://localhost:7200" --repository "TestRepository" --repotitle "Test Repository"   --username "Test" --password "Test"
echo "Enapso Test Suite Done"