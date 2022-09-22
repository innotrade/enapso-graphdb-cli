/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console, func-names, no-undef */
// Innotrade Enapso GraphDB CLI - Automated Test Suite
// (C) Copyright 2021-2021 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author: Alexander Schulze and Muhammad Yasir
const { expect } = require('chai');
const testConfig = require('./config');
const exec = require('child_process').execSync;
const cmd = require('node-cmd');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('ENAPSO GraphDB CLI Automated Test Suite', async () => {
    it('Create repository in GraphDB', async (done) => {
        exec(
            `node index.js createRepository --dburl "${testConfig.baseURL}" --repository "${testConfig.newRepo}" --repotitle "${testConfig.newRepoTitle}"   --username "${testConfig.username}" --password "${testConfig.password}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`create repostiory : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Delete repository of GraphDB', async (done) => {
        exec(
            `node index.js deleteRepository --dburl "${testConfig.baseURL}" --repository "${testConfig.newRepo}" --username "${testConfig.username}" --password "${testConfig.password}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`delete repostiory : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Create new user of GraphDB', async (done) => {
        exec(
            `node index.js createUser --dburl "${testConfig.baseURL}" --repository "${testConfig.repository}" --username "${testConfig.username}" --password "${testConfig.password}" --newusername "${testConfig.newuser}" --newpassword "${testConfig.newpassword}" -a "${testConfig.userRole}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`create user : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Update existing user of GraphDB', async (done) => {
        exec(
            `node index.js updateUser --dburl "${testConfig.baseURL}" --repository "${testConfig.repository}" --username "${testConfig.username}" --password "${testConfig.password}" --newusername "${testConfig.newuser}" --newpassword "${testConfig.newpassword}" -a "${testConfig.updatedRole}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`update user : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Delete existing user of GraphDB', async (done) => {
        exec(
            `node index.js deleteUser --dburl "${testConfig.baseURL}" --repository "${testConfig.repository}" --username "${testConfig.username}" --password "${testConfig.password}" --newusername "${testConfig.newuser}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`delete user : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Import Ontology into GraphDB', async (done) => {
        exec(
            `node index.js import --dburl "${testConfig.baseURL}" --repository "${testConfig.repository}" --context "${testConfig.importContext}" --baseiri "${testConfig.importBaseIRI}" --sourcefile "${testConfig.importSourceFile}" --username "${testConfig.username}" --password "${testConfig.password}" --format "${testConfig.importFormat}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`import ontology : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Download Ontology from GraphDB', async (done) => {
        exec(
            `node index.js export --dburl "${testConfig.baseURL}" --repository "${testConfig.repository}" --context "${testConfig.exportContext}" --targetfile "${testConfig.exportTargetFile}"  --username "${testConfig.username}" --password "${testConfig.password}" --format "${testConfig.exportFormat}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`download ontology : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Clear Specific named graph from GraphDB', async (done) => {
        exec(
            `node index.js clearContext --dburl "${testConfig.baseURL}" --repository "${testConfig.repository}" --context "${testConfig.exportContext}"  --username "${testConfig.username}" --password "${testConfig.password}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`Clear specific named graph : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Clear Repository of GraphDB', async (done) => {
        exec(
            `node index.js clearRepository --dburl "${testConfig.baseURL}" --repository "${testConfig.repository}" --username "${testConfig.username}" --password "${testConfig.password}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`Clear repository : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Garbage Collection from GraphDB', async (done) => {
        exec(
            `node index.js gc --dburl "${testConfig.baseURL}" --username "${testConfig.username}" --password "${testConfig.password}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(
                        `Garbage Collection from graphdb repository: ${stdout}`
                    );
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Run Query in GraphDB', async (done) => {
        exec(
            `node index.js query --dburl "${testConfig.baseURL}" --repository "${testConfig.repository}" --username "${testConfig.username}" --password "${testConfig.password}" --queryfile "${testConfig.queryFile}" --prefixfile "${testConfig.prefixFile}" --targetfile "${testConfig.resultFile}" --version "${testConfig.version}"`,
            (error, stdout, stderr) => {
                if (error !== null) {
                    console.log(`Run Query : ${stdout}`);
                }
                expect(stdout).to.include('successfully');
            }
        );
        done();
    });

    it('Run Update Query in GraphDB', async (done) => {
        exec(
            `node index.js update --dburl "${testConfig.baseURL}" --repository "${testConfig.repository}" --username "${testConfig.username}" --password "${testConfig.password}" --queryfile "${testConfig.updateQueryFile}" --prefixfile "${testConfig.prefixFile}"--version "${testConfig.version}"`,
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
