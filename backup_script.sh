#!/bin/bash
echo "Backup Script for Exporting Ontology from Graph Database Using enapso-graphdb-cli"

# Set Variables
REPORT_FILE="Report/EnapsoTestReport.txt"
EXPORT_FILE="exports/export1.trig"

# Echo Removing Previous Report File
echo "Removing Previous Report File..."
rm $REPORT_FILE

# Run Enapso CLI to export ontology
enapsogdb export --dburl "http://localhost/fuseki" --repository "Test" --targetfile $EXPORT_FILE --triplestore "fuseki">> $REPORT_FILE 

echo "Backup made successfully"