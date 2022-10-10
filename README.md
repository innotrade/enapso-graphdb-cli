![ENAPSO](https://i.ibb.co/6b3rXrB/enapso-client.png)

<div align="center">
  <h1><span style="font-weight:bold; color: #4299E1;">ENAPSO</span> Graph Database CLI</h1>
  <a href="https://www.npmjs.com/package/@innotrade/enapso-graphdb-client"><img src="https://img.shields.io/npm/v/@innotrade/enapso-graphdb-client" /></a>
  <a href="https://github.com/prisma/prisma/blob/main/CONTRIBUTING.md"><img src="https://img.shields.io/badge/connect-Community-brightgreen" /></a>
  <a href="https://github.com/innotrade/enapso-graphdb-cli/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-Apache%202-blue" /></a>
  <a href="https://github.com/innotrade/enapso-graphdb-cli/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/code-Conduct-orange" /></a>
  <br />
  <br />
  <a href="https://www.innotrade.com/">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/innotrade/enapso-graphdb-cli/wiki">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/innotrade/enapso-graphdb-cli/discussions">Discussion</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#">Facebook</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#">Twitter</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="#">LinkedIn</a>
  <br />
  <hr />
</div>


ENAPSO Graph Databases Command Line Interface (CLI) for Node.js

Enapso Command Line Interface for GraphDB to easily perform numerous operations on Graph databases. This tool will be continously extended by further scriptable convenience operations.

### Configuration for Ontotext GraphDB

**GraphDB 8.x/9.x/10.x instance running on localhost at port 7200. A fully working Ontotext GraphDB repository "Test".**

```
npm run test:ontotext-graphDB

```

Get the latest version of GraphDB for free at https://www.ontotext.com/products/graphdb/.

### Configuration for Apache Jena Fuseki

**Fuseki instance running on localhost at port 3030. A fully working Fuseki Dataset "Test"**

```
npm run test:fuseki

```

Get the latest version of Apache jena Fuseki for free at https://jena.apache.org/download/index.cgi.

### Configuration for Stardog

**Stardog instance running on localhost at port 5820. A fully working Database "Test".**

```
npm run test:stardog

```

Get the latest version of stardog free at https://www.stardog.com/.
**This project is actively developed and maintained.**
To discuss questions and suggestions with the Enapso and GraphDB community, we'll be happy to meet you in our forum at https://www.innotrade.com/forum/.

## Installation

```
npm i -g @innotrade/enapso-graphdb-cli
```

-g to install the enapso-graphdb-cli package globally

## Commands

```
export           exports (download) a repository or context from GraphDB to a file
import            imports (upload) a repository or context from a file to a GraphDB repository or named graph
clearRepository    clearRepository clear the repository of GraphDB.
createRepository   createRepository create a new repository in GraphDB.
deleteRepository   deleteRepository delete the repository of GraphDB.
query              Run read query against GraphDB.
update             Run update query against GraphDB.
createUser         createUser create a new user and assign authorities to that user.
updateUser         updateUser update the already exist user of GraphDB.
assignRoles         Assign new roles to the user of stardog.
removeRoles         Remove existing roles of the user of stardog.
deleteUser         deleteUser delete the user of GraphDB.
gc                 Garbage Collection of a repository in GraphDB.
autoUpload         Auto Upload the Ontology file in GraphDB if any change occur in Ontology file if it is in watcher.
```

## Parameters

```
--dburl        -d   base url of GraphDB instance, e.g. http://localhost:7200
--repository   -r   repository to use for the command
--version(optional)     version of GraphDB by default it is 10.x
--apiType(optional)     api type of GraphDB (workbench or RDF4J) by default it used workbench apis.
--context      -c   context to be used for the command, of not passed usually the entire repository is used
--username     -u   the user to be authenticated
--user       the user need to delete or update.
--password     -p   the password to be used for authentication
                    (should not be stored in scripts, better use env variables)
--baseiri      -i   base iri of graph e.g. http://ont.enapso.com/
--verbose      -v   log detailed output to the console
--targetfile   -t   file name for exports to file
--sourcefile   -s   file name for import from file
--queryfile    -q   file name for the query file (SPARQL)
--format       -f   please refer to the below format specification
--authorities -a    rights of GraphDB which we are providing to newly created user
--configfile        JSON format array file in which we pass the ontology file path, id and other related information required for uploading Ontology
```

# Examples

## Export (download) a repository or named graph

Download from GraphDB to a file:

```
enapsogdb export --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --targetfile "exports/export.ttl"  --username "admin" --password "root" --format "text/turtle"

```

## Import (upload) a repository or named graph via workbench API

Upload from a file to GraphDB:

```
enapsogdb import --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --baseiri "http://ont.enapso.com/test#" --sourcefile "imports/dotnetpro_demo_ontology_2.owl" --username "admin" --password "root" --format "application/rdf+xml"
```

## Import (upload) a repository or named graph via RDF4J API

Upload from a file to GraphDB using RDF4J API:

```
enapsogdb import --dburl "http://localhost:7200" --apiType "RDF4J" --repository "Test" --context "http://ont.enapso.com/test" --baseiri "http://ont.enapso.com/test#" --sourcefile "imports/dotnetpro_demo_ontology_2.owl" --username "admin" --password "root" --format "application/rdf+xml"
```

## Clearing entire repository

Clear entire repository. Caution! Use this command with care! The operation cannot be undone!

```
enapsogdb clearRepository --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root"
```

## Clearing specific named graph from repository

Clear specific named graph from graphdb repository. Caution! Use this command with care! The operation cannot be undone!

```
enapsogdb clearContext --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test"  --username "admin" --password "root"
```

## Perform Garbage Collection

Perform the garbage collection of the Ontotext GraphDB.

```
enapsogdb gc --dburl "http://localhost:7200" --username "admin" --password "root"
```

## Create Repository

Create New Repository in the Ontotext GraphDB.

```
enapsogdb createRepository --dburl "http://localhost:7200" --repository "TestRepository" --repotitle "Test Repository" --username "admin" --password "root"

```

## Delete Repository

Delete Repository of Ontotext GraphDB.

```
enapsogdb deleteRepository --dburl "http://localhost:7200" --repository "TestRepository" --username "admin" --password "root"
```

## Create User

Create new user in Ontotext GraphDB.

```
enapsogdb createUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --newusername "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test READ_REPO_EnapsoDotNetProDemo"

```

## Update User

Update exisiting user of Ontotext GraphDB.

```
enapsogdb updateUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --user "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test WRITE_REPO_EnapsoDotNetProDemo READ_REPO_EnapsoDotNetProDemo"

```

## Assign Role

Assign role to exisiting user of GraphDB.

```
enapsogdb assignRoles --dburl "http://localhost:5820" --repository "Test" --username "admin" --password "admin" --user "TestUser" --newpassword "TestUser" -a '[{"action":"READ","resource_type":"db","resource":["Test"]},{"action":"WRITE","resource_type":"db","resource":["Test"]}]' --triplestore "stardog"


```

## Remove Role

Remove roles of exisiting user of GraphDB.

```
enapsogdb removeRoles --dburl "http://localhost:5820" --repository "Test" --username "admin" --password "admin" --user "TestUser" --newpassword "TestUser" -a '[{"action":"READ","resource_type":"db","resource":["Test"]},{"action":"WRITE","resource_type":"db","resource":["Test"]}]' --triplestore "stardog"


```

## Delete User

Delete exisiting user of GraphDB.

```
enapsogdb deleteUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --user "TestUser"

```

## Query Method of GraphDB

Read the data from GraphDB

```
enapsogdb query --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --queryfile "queries/all.sparql" --prefixfile "queries/prefixes.prf" --targetfile "results/countries.csv"

```

## Update Method of GraphDB

Update the data of GraphDB

```
enapsogdb update --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --queryfile "queries/createClass.sparql" --prefixfile "queries/prefixes.prf"

```

## Auto Upload

Add the Ontology files in watcher getting the path of these files from json file and if any change occur it will automatically upload the updated ontology file to GraphDB by getting upload information from json file.

```
enapsogdb autoUpload --configfile "configfile/configfile.json"
```

## File Types and Data Formats

The following file types are supported:

```
name: "JSON",
type: "application/rdf+json",
extension: ".json"

name: "JSON-LD",
type: "application/ld+json",
extension: ".jsonld"

name: "RDF-XML",
type: "application/rdf+xml",
extension: ".rdf"

name: "N3",
type: "text/rdf+n3",
extension: ".n3"

name: "N-Triples",
type: "text/plain",
extension: ".nt"

name: "N-Quads",
type: "text/x-nquads",
extension: ".nq"

name: "Turtle",
type: "text/turtle",
extension: ".ttl"

name: "TriX",
type: "application/trix",
extension: ".trix"

name: "TriG",
type: "application/x-trig",
extension: ".trig"

name: "Binary RDF",
type: "application/x-binary-rdf",
extension: ".brf"
```
