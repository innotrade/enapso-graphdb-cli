echo "Running Test for enapso-graphdb-cli To Delete Repository..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb deleteRepository --dburl "http://localhost:7200" --repository "TestesRepository" --username "admin" --password "root" >> $REPORT_FILE
echo "ENAPSO Test Suite Done"