/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console, func-names, no-undef */
// Innotrade ENAPSO Graph Database CLI - Automated Test Suite
// (C) Copyright 2021-2021 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze and Muhammad Yasir
const { expect } = require('chai');
const testConfig = require('./config');
const exec = require('child_process').execSync;
const cmd = require('node-cmd');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var baseURL = process.argv[5].replace(/'/g, '"');
var triplestore = process.argv[7].replace(/'/g, '"');
var username = process.argv[9].replace(/'/g, '"');
var password = process.argv[11].replace(/'/g, '"');
describe('ENAPSO Graph Databases CLI Automated Test Suite', async () => {
    it('Create repository in Graph Database', async (done) => {
        exec(
            `node index.js createRepository --dburl ${baseURL} --repository "${testConfig.newRepo}" --repotitle "${testConfig.newRepoTitle}"   --username ${username} --password ${password} --version "${testConfig.version}" --triplestore ${triplestore}`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`create repostiory : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });
    it('Delete repository of Graph Database', async (done) => {
        exec(
            `node index.js deleteRepository --dburl ${baseURL} --repository "${testConfig.newRepo}" --username ${username} --password ${password} --version "${testConfig.version}" --triplestore ${triplestore}`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`delete repostiory : ${stdout}`);
                }
                expect(stdout).to.include('closed');
            }
        );
        done();
    });
    it('Create new user in Graph Databases', (done) => {
        let compare = triplestore.replace(/"/g, '');
        if (compare === 'stardog' || compare === 'graphdb') {
            let role;
            if (compare == 'graphdb') {
                role = testConfig.userRole;
            } else if (compare == 'stardog') {
                role = JSON.stringify(testConfig.stardogUserRole);
            }
            exec(
                `node index.js createUser --dburl ${baseURL} --repository "${testConfig.repository}" --username ${username} --password ${password} --newusername "${testConfig.newuser}" --newpassword "${testConfig.newpassword}" -a ${role} --version "${testConfig.version}" --triplestore ${triplestore}`,
                (error, stdout, stderr) => {
                    console.log(error, stdout, stderr);
                    if (error !== null) {
                        console.log(`create user : ${stdout}`);
                    }
                    expect(stdout).to.include('successfully');
                }
            );
            done();
        } else {
            done();
        }
    });
    it('Assign Roles to existing user of Graph Database', async (done) => {
        let compare = triplestore.replace(/"/g, '');
        if (compare == 'stardog') {
            let role = testConfig.updateStardogRoles;
            exec(
                `node index.js assignRoles --dburl ${baseURL} --repository "${testConfig.repository}" --username ${username} --password ${password} --user "${testConfig.newuser}" -a ${role} --version "${testConfig.version}" --triplestore ${triplestore}`,
                (error, stdout, stderr) => {
                    console.log(error, stdout, stderr);
                    if (error !== null) {
                        console.log(`Assign roles to user : ${stdout}`);
                    }
                    expect(stdout).to.include('successfully');
                }
            );
            done();
        } else {
            done();
        }
    });
    it('Remove Roles from existing user of Graph Database', async (done) => {
        let compare = triplestore.replace(/"/g, '');
        if (compare == 'stardog') {
            let role = testConfig.updateStardogRoles;
            exec(
                `node index.js removeRoles --dburl ${baseURL} --repository "${testConfig.repository}" --username ${username} --password ${password} --user "${testConfig.newuser}" -a ${role} --version "${testConfig.version}" --triplestore ${triplestore}`,
                (error, stdout, stderr) => {
                    console.log(error, stdout, stderr);
                    if (error !== null) {
                        console.log(`Remove roles of user : ${stdout}`);
                    }
                    expect(stdout).to.include('successfully');
                }
            );
            done();
        } else {
            done();
        }
    });
    it('Update existing user of Graph Database', async (done) => {
        let compare = triplestore.replace(/"/g, '');
        if (compare == 'graphdb') {
            exec(
                `node index.js updateUser --dburl ${baseURL} --repository "${testConfig.repository}" --username ${username} --password ${password} --newusername "${testConfig.newuser}" --newpassword "${testConfig.newpassword}" -a "${testConfig.updatedRole}" --version "${testConfig.version}" --triplestore ${triplestore}`,
                (error, stdout, stderr) => {
                    if (error !== null) {
                        console.log(`update user : ${stdout}`);
                    }
                    expect(stdout).to.include('successfully');
                }
            );
            done();
        } else {
            done();
        }
    });
    it('Delete existing user of Graph Database', async (done) => {
        let compare = triplestore.replace(/"/g, '');
        if (compare != 'fuseki') {
            exec(
                `node index.js deleteUser --dburl ${baseURL} --repository "${testConfig.repository}" --username ${username} --password ${password} --user "${testConfig.newuser}" --version "${testConfig.version}" --triplestore ${triplestore}`,
                (error, stdout, stderr) => {
                    if (error !== null) {
                        console.log(`delete user : ${stdout}`);
                    }
                    expect(stdout).to.include('successfully');
                }
            );
            done();
        } else {
            done();
        }
    });
    it('Import Ontology into Graph Database', async (done) => {
        exec(
            `node index.js import --dburl ${baseURL} --repository "${testConfig.repository}" --context "${testConfig.importContext}" --baseiri "${testConfig.importBaseIRI}" --sourcefile "${testConfig.importSourceFile}" --username ${username} --password ${password} --format "${testConfig.importFormat}" --version "${testConfig.version}" --triplestore ${triplestore}`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`import ontology : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });
    it('Download Ontology from Graph Database', async (done) => {
        exec(
            `node index.js export --dburl ${baseURL} --repository "${testConfig.repository}" --context "${testConfig.exportContext}" --targetfile "${testConfig.exportTargetFile}"  --username ${username} --password ${password} --format "${testConfig.exportFormat}" --version "${testConfig.version}" --triplestore ${triplestore}`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`download ontology : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });
    it('Clear Specific named graph from Graph Database', async (done) => {
        exec(
            `node index.js clearContext --dburl ${baseURL} --repository "${testConfig.repository}" --context "${testConfig.importContext}"  --username ${username} --password ${password} --version "${testConfig.version}" --triplestore ${triplestore}`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`Clear specific named graph : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });
    it('Clear Repository of the Graph Database', async (done) => {
        exec(
            `node index.js clearRepository --dburl ${baseURL} --repository "${testConfig.repository}" --username ${username} --password ${password} --version "${testConfig.version}" --triplestore ${triplestore}`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`Clear repository : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });
    it('Garbage Collection from the Graph Database', async (done) => {
        let compare = triplestore.replace(/"/g, '');
        if (compare == 'graphdb') {
            exec(
                `node index.js gc --dburl ${baseURL} --username ${username} --password ${password} --version "${testConfig.version}" --triplestore ${triplestore}`,
                (error, stdout, stderr) => {
                    if (error !== null) {
                        console.log(
                            `Garbage Collection from graph database repository: ${stdout}`
                        );
                    }
                    expect(stdout).to.include('successfully');
                }
            );
            done();
        } else {
            done();
        }
    });
    it('Run Query in the Graph Database', async (done) => {
        exec(
            `node index.js query --dburl ${baseURL} --repository "${testConfig.repository}" --username ${username} --password ${password} --queryfile "${testConfig.queryFile}" --prefixfile "${testConfig.prefixFile}" --targetfile "${testConfig.resultFile}" --version "${testConfig.version}" --triplestore ${triplestore}`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`Run Query : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });
    it('Run Update Query in the Graph Database', async (done) => {
        exec(
            `node index.js update --dburl ${baseURL} --repository "${testConfig.repository}" --username ${username} --password ${password} --queryfile "${testConfig.updateQueryFile}" --prefixfile "${testConfig.prefixFile}"--version "${testConfig.version}" --triplestore ${triplestore}`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`Run update Query : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });
});
