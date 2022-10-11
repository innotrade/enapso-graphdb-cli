echo "Running Test for enapso-graphdb-cli To Update User..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb updateUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --newusername "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test WRITE_REPO_EnapsoDotNetProDemo READ_REPO_EnapsoDotNetProDemo">> $REPORT_FILE
echo "ENAPSO Test Suite Done"