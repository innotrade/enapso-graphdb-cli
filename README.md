# enapso-graphdb-cli
Enapso Ontotext GraphDB 8.x Command Line Interface (CLI) for JavaScript

## Commands
```
export  Exports a repository or context from GraphDB to a file
```
## Parameters
```
--repository   -r
--context      -c   context to be used for the command, of not passed usually the entire repository is used
--username     -u
--password     -p
--dburl        -d
--baseuri      -b
--verbose      -v
--targetfile   -t   file name for exports, if not given output ist send to the console
--format       -f   please refer to the below format specification
```
# Examples
```
enapsogdb export \
  -b "http://localhost:7200" \
  -r "Test" \
  -c "http://ont.enapso.com/test" \
  -t "backups/backup.ttl" \
  -u "Test" \
  -p "Test" \
  -f "text/turtle"
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