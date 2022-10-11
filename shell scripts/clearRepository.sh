echo "Running Test for enapso-graphdb-cli To Clear Repository..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb clearRepository --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root">> $REPORT_FILE
echo "ENAPSO Test Suite Done"