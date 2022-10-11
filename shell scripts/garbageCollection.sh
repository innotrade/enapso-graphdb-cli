echo "Running Test for enapso-graphdb-cli To Garbage Collection Repository..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb gc --dburl "http://localhost:7200" --username "admin" --password "root">> $REPORT_FILE 
echo "ENAPSO Test Suite Done"