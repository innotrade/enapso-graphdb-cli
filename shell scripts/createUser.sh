echo "Running Test for enapso-graphdb-cli To Create User..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb createUser --dburl "http://localhost:7200" --repository "Test" --username "Test" --password "Test" --newusername "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test READ_REPO_EnapsoDotNetProDemo">> $REPORT_FILE
echo "Enapso Test Suite Done"