#!/bin/bash
# Start of the Script
echo "Running Script for Restoring Graph Database repository using enapso-graphdb-cli tool"
SOURCE_FILE="exports/export.trig"
REPORT_FILE="Report/EnapsoTestReport.txt"

# Removing the previous report file
echo "Removing Previous Report File..."
rm $REPORT_FILE

# Running the Enapso CLI Import Command
enapsogdb import --dburl "http://localhost/fuseki" --repository "Test" --sourcefile $SOURCE_FILE --format "application/x-trig" --triplestore "fuseki" >> $REPORT_FILE

# Completion Message
echo "Graph Database repoistory successfully restored"
