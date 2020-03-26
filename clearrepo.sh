echo "Enapso Test Suite For Mac OS"
echo "(C) Copyright 2020 Innotrade GmbH, Herzogenrath, NRW, Germany"
echo Please wait... Create of Repository in Graphdb.
node index.js createRepository --dburl "http://localhost:7200" --repository "Test" --username "Test" --password "Test" --reponame "TestRepository" --repotitle "Test Repository"  >>results.log
echo Please wait... Delete of Repository of Graphdb.
node index.js deleteRepository --dburl "http://localhost:7200" --repository "Test" --username "Test" --password "Test" --reponame "TestRepository"
echo Please wait... Insert new User in Graphdb.
node index.js createUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --adminname "TestUser" --adminpassword "TestUser" --authorities["WRITE_REPO_Test","READ_REPO_Test","READ_REPO_EnapsoDotNetProDemo", "ROLE_USER",] --newusername "TestUser" --newuserpassword "TestUser" 

echo "Enapso Test Suite Done"
