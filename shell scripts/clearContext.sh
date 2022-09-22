echo "Running Test for enapso-graphdb-cli To Clear Specific Context..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb clearContext --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --context "http://ont.enapso.com/test">> $REPORT_FILE
echo "Enapso Test Suite Done"