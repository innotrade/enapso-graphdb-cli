echo "Running Test for enapso-graphdb-cli To Delete User..."
enapsogdb deleteUser --dburl "http://localhost:7200" --repository "Test" --username "Test" --password "Test" --newusername "TestUser" 
echo "Enapso Test Suite Done"