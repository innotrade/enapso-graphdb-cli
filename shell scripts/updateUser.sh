echo "Running Test for enapso-graphdb-cli To Update User..."
enapsogdb updateUser --dburl "http://localhost:7200" --repository "Test" --username "Test" --password "Test" --newusername "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test WRITE_REPO_EnapsoDotNetProDemo READ_REPO_EnapsoDotNetProDemo"

echo "Enapso Test Suite Done"