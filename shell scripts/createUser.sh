echo "Running Test for enapso-graphdb-cli To Create User..."
enapsogdb createUser --dburl "http://localhost:7200" --repository "Test" --username "Test" --password "Test" --newusername "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test READ_REPO_EnapsoDotNetProDemo"

echo "Enapso Test Suite Done"