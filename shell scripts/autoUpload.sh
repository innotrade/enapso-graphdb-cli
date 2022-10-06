echo "Running Test for enapso-graphdb-cli To Auto Upload..."
cd ..
REPORT_FILE=Report/EnapsoTestReport.txt
echo "Removing Previous Report File..."
rm $REPORT_FILE
enapsogdb autoUpload --configfile "configfile/configfile.json" --triplestore "graphDB" >> $REPORT_FILE
echo "Enapso Test Suite Done"