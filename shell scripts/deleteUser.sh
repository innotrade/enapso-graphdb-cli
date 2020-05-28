echo "Running Test for enapso-graphdb-cli To Delete User..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb deleteUser --dburl "http://localhost:7200" --repository "Test" --username "Test" --password "Test" --newusername "TestUser">> $REPORT_FILE 
echo "Enapso Test Suite Done"