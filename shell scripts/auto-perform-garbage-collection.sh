echo "Run Garbage Collection if memory consumtion greater than 4 GB"
## GraphDB Configuration
repo="Test"
baseURL="http://localhost:7200"
user="admin"
password="root"
reprtFile="../Report/resource-report.txt"
# Detect the platform (similar to $OSTYPE) to use executable accordingly
case "$OSTYPE" in
  darwin*)  enapso_graphdb_cli="../enapso-graphdb-cli-exe/enapsogdb-macos" ;;
  linux*)   enapso_graphdb_cli="../enapso-graphdb-cli-exe/enapsogdb-linux";;
  msys*)    enapso_graphdb_cli="../enapso-graphdb-cli-exe/enapsogdb-win.exe" ;;
  cygwin*)  enapso_graphdb_cli="../enapso-graphdb-cli-exe/enapsogdb-win.exe" ;;
  *)        echo "unknown: $OSTYPE" ;;
esac
rm $reprtFile 
echo "Get $repo repository resources from GraphDB"
$enapso_graphdb_cli getResources --dburl "$baseURL" --repository "$repo" --username "$user" --password "$password">> $reprtFile 2>&1
## Reading report file
value=$(<$reprtFile)
left="HeapMemory Usage"
right="Non HeapMemory Usage"
used='used":'
rightSide="}"
## getting used heapmemory by performing substring operation
text="${value#*${left}}"    
text="${text%${right}*}"
text="${text%${rightSide}*}"
text="${text#*${used}}"  
if [[ $text -gt 4000000000 ]]
then
    echo "Perform Garbage Collection on $repo repository"
    $enapso_graphdb_cli gc --dburl "$baseURL" --repository "$repo" --username "$user" --password "$password">> $reprtFile 2>&1
else
    echo Memory Usage is not more than 4 GB>>$reprtFile
fi 
