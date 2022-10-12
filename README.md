![ENAPSO](https://i.ibb.co/yf9fm5g/enapso-graphdb.png)

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

ENAPSO Command Line Interface to easily perform numerous operations on the graph databases. This tool will be continuously extended by further scriptable convenience operations.

As of now, we support the connection with three major graph databases

-   [Ontotext GraphDB](https://www.ontotext.com/products/graphdb/)
-   [Apache Jena fuseki](https://jena.apache.org/)
-   [Stardog](https://www.stardog.com/)

There will be more graph databases added to this list in the future.

You may also find these tools useful

-   [**ENAPSO Graph Database Client**](https://github.com/innotrade/enapso-graphdb-admin): To perform SPARQL queries and update statements against your knowledge graphs or ontologies stored in your graph database.
-   [**ENAPSO Graph Database Admin**](https://github.com/innotrade/enapso-graphdb-admin): To perform administrative and monitoring operations against your graph databases, such as importing and exporting ontologies/knowledge graphs and utilizing the graph database's special features.

# 🛠️&nbsp;Installation

```
npm i -g @innotrade/enapso-graphdb-cli
```

## 📋&nbsp;Features

| Command                                                            | Description                                                                                                 | Ontotext GraphDB | Apache Jena Fuseki | Stardog |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | ------- |
| [export](#export)  | Exports (download) the triples from a specific context or a repository of graph database to the local file. | ✔                | ✔                  | ✔       |
| [import](#import) | Imports (upload) ontology in a specific context or default graph of graph database repository.               | ✔                | ✔                  | ✔       |
| [clearRepository](#clearrepository)                     | Remove all triples from the repository of graph database.                                                   | ✔                | ✔                  | ✔       |
| [createRepository](#createrepository)                             | Create a new repository in the graph database.                                                                  | ✔                | ✔                  | ✔       |
| [deleteRepository](#deleterepository)                             | Delete the repository from graph database.                                                                  | ✔                | ✔                  | ✔       |
| [createUser](#createuser)                                         | Create a new user and assign roles in the graph database.                                                   | ✔                | ✘                  | ✔       |
| [updateUser](#updateuser)                                         | Update the existing user roles in graph database.                                                           | ✔                | ✘                  | ✘       |
| [assignRoles](#assignroles)                                        | Assign new roles to the existing user of the graph database.                                                    | ✘                | ✘                  | ✔       |
| [removeRoles](#removeroles)                                        | Remove existing roles of the user in graph database.                                                        | ✘                | ✘                  | ✔       |
| [deleteUser](#deleteuser)                                         | Delete the user of the graph database.                                                                      | ✔                | ✘                  | ✔       |
| [garbageCollection](#garbagecollection)                   | Perform garbage collection in the repository of graph database.                                             | ✔                | ✘                  | ✘       |
| [query](#query)                       | Perform read query against ontology imported in the repository of a graph database.                           | ✔                | ✔                  | ✔       |
| [update](#update)                     | Perform update query against ontology imported in the repository of graph database.                         | ✔                | ✔                  | ✔       |

### Parameters

| Parameter                              | Abbreviation | Parameter Description                                                                               |
| -------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| dburl                                  | d            | Base url in which graph database is running.                                                        |
| repository                             | r            | Name of the repository of the graph database with which you want to create a connection                   |
| version                                |              | Version of the graph database, by default works with the latest version.                                  |
| apiType                                |              | Api type of graph database (workbench or RDF4J) to use for import by default it used workbench API. |
| context                                | c            | To pass the context                                                                                 |
| username                               | u            | To pass the name of the user against you want to authenticate yourself in a graph database.               |
| user                                   |              | To pass the name of the user which you want to delete or update in the graph database.                      |
| password                               | p            | Password to be used for authentication in the graph database.                                           |
| baseiri                                | i            | Base iri of the graph e.g. http://ont.enapso.com/ .                                                 |
| targetfile                             | t            | File path for exports to file                                                                       |
| sourcefile                             | s            | File path of import from file.                                                                      |
| queryfile                              | q            | File path of the query file (SPARQL).                                                               |
| [format](#file-types-and-data-formats) | f            | Specify format of the ontology file.                                                                |
| authorities                            | f            | Pass the user roles of the graph database                                                           |

<details open>
<summary>
  
## export
</summary>

Download  a repository or a specific named graph from graph database to a file:

```

enapsogdb export --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --targetfile "exports/export.ttl" --username "admin" --password "root" --format "text/turtle"

```
</details>

<details open>
<summary>
  
## import
</summary>

Upload from a file to the repository of graph database:

```

enapsogdb import --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --baseiri "http://ont.enapso.com/test#" --sourcefile "imports/dotnetpro_demo_ontology_2.owl" --username "admin" --password "root" --format "application/rdf+xml"

```
</details>


<details open>
<summary>
  
## import via RDF4J
</summary>


Upload from a file to the repository of graph database using RDF4J API:

```

enapsogdb import --dburl "http://localhost:7200" --apiType "RDF4J" --repository "Test" --context "http://ont.enapso.com/test" --baseiri "http://ont.enapso.com/test#" --sourcefile "imports/dotnetpro_demo_ontology_2.owl" --username "admin" --password "root" --format "application/rdf+xml"

```
</details>


<details open>
<summary>
  
## clearRepository
</summary>

Clear the entire repository. Caution! Use this command with care! The operation cannot be undone!

```

enapsogdb clearRepository --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root"

```
</details>

<details open>
<summary>
  
## clearContext
</summary>

Clear specific named graphs from a graph database repository. Caution! Use this command with care! The operation cannot be undone!

```

enapsogdb clearContext --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --username "admin" --password "root"

```
</details>

<details open>
<summary>
  
## garbageCollection
</summary>

Perform the garbage collection of the Ontotext Graph Database.

```

enapsogdb gc --dburl "http://localhost:7200" --username "admin" --password "root"

```
</details>

<details open>
<summary>
  
## createRepository
</summary>

Create New Repository in the Graph Database.

```

enapsogdb createRepository --dburl "http://localhost:7200" --repository "TestRepository" --repotitle "Test Repository" --username "admin" --password "root"

```
</details>

<details open>
<summary>
  
## deleteRepository
</summary>

Delete Repository of Graph Database.

```

enapsogdb deleteRepository --dburl "http://localhost:7200" --repository "TestRepository" --username "admin" --password "root"

```
</details>

<details open>
<summary>
  
## createUser
</summary>

Create a new user in the Graph Database.

```

enapsogdb createUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --newusername "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test READ_REPO_EnapsoDotNetProDemo"

```
</details>

<details open>
<summary>
  
## updateUser
</summary>

Update existing users of the Graph Database.

```

enapsogdb updateUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --user "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test WRITE_REPO_EnapsoDotNetProDemo READ_REPO_EnapsoDotNetProDemo"

```
</details>

<details open>
<summary>
  
## assignRoles
</summary>

Assign a role to an existing user of the Graph Database.

```

enapsogdb assignRoles --dburl "http://localhost:5820" --repository "Test" --username "admin" --password "admin" --user "TestUser" --newpassword "TestUser" -a '[{"action":"READ","resource_type":"db","resource":["Test"]},{"action":"WRITE","resource_type":"db","resource":["Test"]}]' --triplestore "stardog"

```
</details>

<details open>
<summary>
  
## removeRoles
</summary>

Remove roles of the existing user of graph database.

```

enapsogdb removeRoles --dburl "http://localhost:5820" --repository "Test" --username "admin" --password "admin" --user "TestUser" --newpassword "TestUser" -a '[{"action":"READ","resource_type":"db","resource":["Test"]},{"action":"WRITE","resource_type":"db","resource":["Test"]}]' --triplestore "stardog"

```
</details>

<details open>
<summary>
  
## deleteUser
</summary>

Delete existing users of the graph database.

```

enapsogdb deleteUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --user "TestUser"

```
</details>

<details open>
<summary>
  
## query
</summary>

Read the data from graph database

```

enapsogdb query --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --queryfile "queries/all.sparql" --prefixfile "queries/prefixes.prf" --targetfile "results/countries.csv"

```
</details>

<details open>
<summary>
  
## update
</summary>

Update the data of the graph database

```

enapsogdb update --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --queryfile "queries/createClass.sparql" --prefixfile "queries/prefixes.prf"

```
</details>

<details>
<summary>
  
## File Types and Data Formats
</summary> 

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
</details>


# 🧪&nbsp;Testing

[Tutorial](https://github.com/innotrade/enapso-graphdb-client/wiki/Tutorial-for-Graph-Databases-Test-Suite) to run the Test suite against the graph database.

<div>  
  &nbsp; 
</div>

# 😎&nbsp;Contributing

Contributing is more than just coding. You can help the project in many ways, and we will be very
happy to accept your contribution to our project.

Details of how you can help the project are described in the [CONTRIBUTING.md](./CONTRIBUTING.md)
document.

## 🧑‍🏫&nbsp;Contributors

<a href = "https://github.com/Tanu-N-Prabhu/Python/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=innotrade/enapso-graphdb-cli" width="120"/>
</a>

<div>  
  &nbsp; 
</div>

# 💬&nbsp;Bugs and Feature Requests

Do you have a bug report or a feature request? 

Please feel free to add a [new
issue](https://github.com/innotrade/enapso-graphdb-cli/issues/new) or write to us in [discussion](https://github.com/innotrade/enapso-graphdb-cli/discussions): Any questions and suggestions are welcome.

<div>  
  &nbsp; 
</div>

# 🧾&nbsp;License
This project is licensed under the Apache 2.0 License. See the [LICENSE](./LICENSE) file for more
details.
