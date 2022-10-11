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

ENAPSO Command Line Interface to easily perform numerous operations on Graph databases. This tool will be continously extended by further scriptable convenience operations.

As of now we support the connection with three major graph databases

-   [Ontotext GraphDB](https://www.ontotext.com/products/graphdb/)
-   [Apache Jena fuseki](https://jena.apache.org/)
-   [Stardog](https://www.stardog.com/)

There will be more graph databases added to this list in the future.

You may also find these tools useful

-   [**ENAPSO Graph Database Client**](https://github.com/innotrade/enapso-graphdb-admin): To perform SPARQL queries and update statements against your knowledge graphs or ontologies stored in your graph database.
-   [**ENAPSO Graph Database Admin**](https://github.com/innotrade/enapso-graphdb-admin): To perform administrative and monitoring operations against your graph databases, such as importing and exporting ontologies/knowledge graphs and utilizing the graph database's special features.

[**Tutorial for Test Suite**](https://github.com/innotrade/enapso-graphdb-client/wiki/Tutorial-for-Graph-Databases-Test-Suite): To run the Test suites against the graph database.

# Installation

```
npm i -g @innotrade/enapso-graphdb-cli
```

## List of Features

| Command                                                            | Description                                                                                                 | Ontotext GraphDB | Apache Jena Fuseki | Stardog |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | ------- |
| [export](#export-download-a-repository-or-a-specific-named-graph)  | Exports (download) the triples from a specific context or a repository of Graph Database to the local file. | ✔                | ✔                  | ✔       |
| [import](#import-upload-a-repository-or-named-graph-via-rdf4j-api) | Imports (upload) ontology in aspecific context or default graph of Graph Database repository.               | ✔                | ✔                  | ✔       |
| [clearRepository](#clearing-entire-repository)                     | Remove all triples from the repository of Graph Database.                                                   | ✔                | ✔                  | ✔       |
| [createRepository](#create-repository)                             | Create a new repository in Graph Database.                                                                  | ✔                | ✔                  | ✔       |
| [deleteRepository](#delete-repository)                             | Delete the repository from Graph Database.                                                                  | ✔                | ✔                  | ✔       |
| [createUser](#create-user)                                         | Create a new user and assign roles in the Graph Database.                                                   | ✔                | ✘                  | ✔       |
| [updateUser](#update-user)                                         | Update the existing user roles in Graph Database.                                                           | ✔                | ✘                  | ✘       |
| [assignRoles](#assign-role)                                        | Assign new roles to the existing user of Graph Database.                                                    | ✘                | ✘                  | ✔       |
| [removeRoles](#remove-role)                                        | Remove existing roles of the user in Graph Database.                                                        | ✘                | ✘                  | ✔       |
| [deleteUser](#delete-user)                                         | Delete the user of the Graph Database.                                                                      | ✔                | ✘                  | ✔       |
| [garbageCollection](#perform-garbage-collection)                   | Perform garbage collection in the repository of Graph Database.                                             | ✔                | ✘                  | ✘       |
| [query](#query-method-of-the-graph-database)                       | Perform read query against ontology imported in the repository of Graph Database.                           | ✔                | ✔                  | ✔       |
| [update](#update-method-of-the-graph-database)                     | Perform update query against ontology imported in the repository of Graph Database.                         | ✔                | ✔                  | ✔       |

## List of Parameters

| Parameter                              | Abbreviation | Parameter Description                                                                               |
| -------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| dburl                                  | d            | Base url in which Graph Database is running.                                                        |
| repository                             | r            | Name of the repository of Graph Database with which you want to create connection                   |
| version                                |              | Version of Graph Database by default it works with latest version.                                  |
| apiType                                |              | Api type of Graph Database (workbench or RDF4J) to use for import by default it used workbench api. |
| context                                | c            | To pass the context                                                                                 |
| username                               | u            | To pass the name of user against you want to authenticate yourself in Graph Database.               |
| user                                   |              | To pass the name of user which you want to delete or update in Graph Database.                      |
| password                               | p            | Password to be used for authentication in Graph Database.                                           |
| baseiri                                | i            | Base iri of the graph e.g. http://ont.enapso.com/ .                                                 |
| targetfile                             | t            | File path for exports to file                                                                       |
| sourcefile                             | s            | File path of import from file.                                                                      |
| queryfile                              | q            | File path of the query file (SPARQL).                                                               |
| [format](#file-types-and-data-formats) | f            | Specify format of the ontology file.                                                                |
| authorities                            | f            | Pass the user roles of the Graph Database                                                           |

# Examples

## Export (download) a repository or a specific named graph

Download from Graph Database to a file:

```

enapsogdb export --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --targetfile "exports/export.ttl" --username "admin" --password "root" --format "text/turtle"

```

## Import (upload) a repository or named graph via workbench API

Upload from a file to Graph Database:

```

enapsogdb import --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --baseiri "http://ont.enapso.com/test#" --sourcefile "imports/dotnetpro_demo_ontology_2.owl" --username "admin" --password "root" --format "application/rdf+xml"

```

## Import (upload) a repository or named graph via RDF4J API

Upload from a file to Graph Database using RDF4J API:

```

enapsogdb import --dburl "http://localhost:7200" --apiType "RDF4J" --repository "Test" --context "http://ont.enapso.com/test" --baseiri "http://ont.enapso.com/test#" --sourcefile "imports/dotnetpro_demo_ontology_2.owl" --username "admin" --password "root" --format "application/rdf+xml"

```

## Clearing entire repository

Clear entire repository. Caution! Use this command with care! The operation cannot be undone!

```

enapsogdb clearRepository --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root"

```

## Clearing specific named graph from repository

Clear specific named graph from graph database repository. Caution! Use this command with care! The operation cannot be undone!

```

enapsogdb clearContext --dburl "http://localhost:7200" --repository "Test" --context "http://ont.enapso.com/test" --username "admin" --password "root"

```

## Perform Garbage Collection

Perform the garbage collection of the Ontotext Graph Database.

```

enapsogdb gc --dburl "http://localhost:7200" --username "admin" --password "root"

```

## Create Repository

Create New Repository in the Graph Database.

```

enapsogdb createRepository --dburl "http://localhost:7200" --repository "TestRepository" --repotitle "Test Repository" --username "admin" --password "root"

```

## Delete Repository

Delete Repository of Graph Database.

```

enapsogdb deleteRepository --dburl "http://localhost:7200" --repository "TestRepository" --username "admin" --password "root"

```

## Create User

Create new user in the Graph Database.

```

enapsogdb createUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --newusername "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test READ_REPO_EnapsoDotNetProDemo"

```

## Update User

Update existing user of the Graph Database.

```

enapsogdb updateUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --user "TestUser" --newpassword "TestUser" -a "ROLE_USER WRITE_REPO_Test READ_REPO_Test WRITE_REPO_EnapsoDotNetProDemo READ_REPO_EnapsoDotNetProDemo"

```

## Assign Role

Assign role to existing user of the Graph Database.

```

enapsogdb assignRoles --dburl "http://localhost:5820" --repository "Test" --username "admin" --password "admin" --user "TestUser" --newpassword "TestUser" -a '[{"action":"READ","resource_type":"db","resource":["Test"]},{"action":"WRITE","resource_type":"db","resource":["Test"]}]' --triplestore "stardog"

```

## Remove Role

Remove roles of existing user of Graph Database .

```

enapsogdb removeRoles --dburl "http://localhost:5820" --repository "Test" --username "admin" --password "admin" --user "TestUser" --newpassword "TestUser" -a '[{"action":"READ","resource_type":"db","resource":["Test"]},{"action":"WRITE","resource_type":"db","resource":["Test"]}]' --triplestore "stardog"

```

## Delete User

Delete existing user of the Graph Database.

```

enapsogdb deleteUser --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --user "TestUser"

```

## Query Method of the Graph Database

Read the data from Graph Database

```

enapsogdb query --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --queryfile "queries/all.sparql" --prefixfile "queries/prefixes.prf" --targetfile "results/countries.csv"

```

## Update Method of the Graph Database

Update the data of Graph Database

```

enapsogdb update --dburl "http://localhost:7200" --repository "Test" --username "admin" --password "root" --queryfile "queries/createClass.sparql" --prefixfile "queries/prefixes.prf"

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

## Contribution

If you have a bug to report, do not hesitate to contact us or file an issue.

If you are willing to fix an issue or propose a [feature](https://www.innotrade.com/forum/); all PRs with clear explanations are welcome and encouraged.

## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
