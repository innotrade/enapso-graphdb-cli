echo "Running Test for enapso-graphdb-cli To Create Repository..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb createRepository --dburl "http://localhost:7200" --repository "TestesRepository" --repotitle "Test Repository"   --username "Test" --password "Test" >> $REPORT_FILE
echo "Enapso Test Suite Done"