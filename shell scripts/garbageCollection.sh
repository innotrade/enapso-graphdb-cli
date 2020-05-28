echo "Running Test for enapso-graphdb-cli To Garbage Collection Repository..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb gc --dburl "http://localhost:7200" --username "Test" --password "Test">> $REPORT_FILE 
echo "Enapso Test Suite Done"