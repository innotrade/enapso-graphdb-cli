/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
// Innotrade Enapso GraphDB Client - Configuration for automated tests
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze
require('@innotrade/enapso-config');

module.exports = Object.freeze({
    repository: 'Test',
    newuser: 'TestUser',
    newpassword: 'TestUser',
    userRole: 'ROLE_USER WRITE_REPO_Test READ_REPO_Test',
    updateStardogRoles:
        '[{"action":"READ","resource_type":"db","resource":["Test"]},{"action":"WRITE","resource_type":"db","resource":["Test"]}]',
    stardogUserRole:
        '[{"action":"CREATE","resource_type":"db","resource":["Test"]}]',
    updatedRole:
        'ROLE_USER WRITE_REPO_Test READ_REPO_Test WRITE_REPO_EnapsoDotNetProDemo READ_REPO_EnapsoDotNetProDemo',
    // version: 9,
    newRepo: 'TestesRepository',
    importFormat: 'application/rdf+xml',
    importContext: 'http://ont.enapso.com/repo',
    importBaseIRI: 'http://ont.enapso.com/repo#',
    importSourceFile: 'imports/EnapsoOntologyRepository.owl',
    exportFormat: 'text/turtle',
    exportContext: 'http://ont.enapso.com/test',
    exportTargetFile: 'exports/export.ttl',
    newRepoTitle: 'Test Repository',
    queryFile: 'queries/all.sparql',
    updateQueryFile: 'queries/createClass.sparql',
    prefixFile: 'queries/prefixes.prf',
    resultFile: 'results/countries.csv'
});
