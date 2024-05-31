#!/usr/bin/env node

// Innotrade ENAPSO Graph Database Command Line Interface (CLI)
// (C) Copyright 2022-2023 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author(s): Alexander Schulze and Muhammad Yasir
// for details regarding the options see:
// https://github.com/75lb/command-line-args/blob/master/doc/API.md
// https://github.com/75lb/command-line-args/blob/master/doc/option-definition.md
require('@innotrade/enapso-config');
const fs = require('fs');
const packageJson = require('./package.json');
const commandLineArgs = require('command-line-args');
const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client');
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');
// const {
//     EnapsoOntologyUploader
// } = require('@innotrade/enapso-ontology-uploader');

// the default prefixes for all SPARQL queries
const GRAPHDB_DEFAULT_PREFIXES = [
    EnapsoGraphDBClient.PREFIX_OWL,
    EnapsoGraphDBClient.PREFIX_RDF,
    EnapsoGraphDBClient.PREFIX_RDFS
];

const PROGRAM_TITLE =
    'ENAPSO Graph Databases Command Line Interface (CLI) v' +
    packageJson.version;
const COPYRIGHT =
    '(C) 2022-2023 Innotrade GmbH, Herzogenrath, NRW, Germany, https://www.innotrade.com';

const ERROR_NO_OR_INVALID_COMMAND = 1,
    ERROR_NO_DB_URL = 2,
    ERROR_AUTHENTICATION_FAILED = 4,
    ERROR_NOREPOSITORY = 10;

function getErrorMsg(code, args) {
    let msg = 'Unknown error, please contact vendor.';
    switch (code) {
        case ERROR_NO_OR_INVALID_COMMAND: {
            msg =
                'No or invalid command passed, please use enapsogdb cmd [args].';
            break;
        }
        case ERROR_NO_DB_URL: {
            msg =
                'No URL to database passed, please check argument --dburl [url].';
            break;
        }
        case ERROR_AUTHENTICATION_FAILED: {
            msg = 'Authentication failed, please check credentials.';
            break;
        }
        case ERROR_NOREPOSITORY: {
            msg =
                'No repository passed. Please check argument --repository [repo].';
            break;
        }
    }
    return msg;
}

function logErrorMsg(code, args) {
    if (code !== 0) {
        console.log(getErrorMsg(code, args));
    }
    return code;
}

const EnapsoGraphDBCLI = {
    mOptionDefinitions: [
        { name: 'command', defaultOption: true },
        { name: 'repository', alias: 'r', type: String },
        { name: 'context', alias: 'c', type: String },
        { name: 'username', alias: 'u', type: String },
        { name: 'password', alias: 'p', type: String },
        { name: 'dburl', alias: 'd', type: String },
        { name: 'version', type: Number },
        { name: 'triplestore', type: String },
        { name: 'baseiri', alias: 'i', type: String },
        { name: 'baseurl', alias: 'b', type: String },
        { name: 'verbose', alias: 'v', type: Boolean },
        { name: 'targetfile', alias: 't', type: String },
        { name: 'sourcefile', alias: 's', type: String },
        { name: 'filename', type: String },
        { name: 'format', alias: 'f', type: String },
        { name: 'queryfile', alias: 'q', type: String },
        { name: 'prefixfile', alias: 'x', type: String },
        { name: 'configfile', type: String },
        { name: 'repotitle', type: String },
        { name: 'authorities', alias: 'a', type: String, multiple: true },
        { name: 'newusername', type: String },
        { name: 'user', type: String },
        { name: 'newpassword', type: String },
        { name: 'apiType', type: String },
        { name: 'isShacl', type: Boolean }
    ],

    export: async function (aOptions) {
        try {
            aOptions.context=this.parseIfJsonArray(aOptions.context);
            var res = await this.endpoint.downloadToFile({
                repository: aOptions.repository,
                format: aOptions.format,
                context: aOptions.context,
                filename: aOptions.targetfile
            });
            if (res.success) {
                console.log('Export file successfully downloaded.');
                return 0;
            } else {
                console.log(res.message);
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    import: async function (aOptions) {
        try {
            var res = await this.endpoint.uploadFromFile({
                filename: aOptions.sourcefile,
                format: aOptions.format,
                baseIRI: aOptions.baseiri,
                context: aOptions.context
            });
            if (res.success) {
                console.log(
                    'Import file ' +
                        aOptions.sourcefile +
                        ' successfully uploaded.'
                );
                return 0;
            } else {
                console.log(res.message);
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },
    importServerFile: async function (aOptions) {
        try {
            var res = await this.endpoint.importServerFile({
                filename: aOptions.filename,
                baseIRI: aOptions.baseiri,
                context: aOptions.context
            });
            if (res.success) {
                console.log(
                    'File ' + aOptions.filename + ' successfully imported.'
                );
                return 0;
            } else {
                console.log(res);
                return -1;
            }
        } catch (err) {
            console.log(err);
            return err.status;
        }
    },
    createRepository: async function (aOptions) {
        try {
            var res = await this.endpoint.createRepository({
                id: aOptions.repository,
                title: aOptions.repotitle,
                location:
                    aOptions.location !== undefined ? aOptions.location : '',
                baseURL: aOptions.baseurl,
                isShacl:
                    aOptions.isShacl !== undefined ? aOptions.isShacl : false
            });
            if (res.success) {
                console.log(
                    'Repository ' +
                        aOptions.repository +
                        ' created successfully.'
                );
                return 0;
            } else {
                console.log(res.message);
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },
    assignRoles: async function (aOptions) {
        try {
            let authorities = [];
            authorities = JSON.parse(aOptions.authorities[0]);
            let res = await this.endpoint.assignRoles({
                authorities: authorities,
                username: aOptions.user // Username for the new user
            });
            if (res.success) {
                console.log('Role assign to user  successfully.');
                return 0;
            } else {
                console.log(res.message);
                return 400;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },
    removeRoles: async function (aOptions) {
        try {
            let authorities = [];
            authorities = JSON.parse(aOptions.authorities[0]);
            let res = await this.endpoint.removeRoles({
                authorities: authorities,
                username: aOptions.user // Username for the new user
            });
            if (res.success) {
                console.log('Roles of user removed successfully.');
                return 0;
            } else {
                console.log(res.message);
                return 400;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },
    createUser: async function (aOptions) {
        try {
            let authorities = [];
            if (aOptions.triplestore == 'stardog') {
                authorities = JSON.parse(aOptions.authorities[0]);
            } else {
                let optAuth = aOptions.authorities
                    ? Array.isArray(aOptions.authorities)
                        ? aOptions.authorities.join(' ')
                        : aOptions.authorities
                    : 'ROLE_USER';
                optAuth = optAuth.split(' ');
                for (let auth of optAuth) {
                    authorities.push(auth.trim());
                }
            }
            let res = await this.endpoint.createUser({
                authorities: authorities, // e.g. [ "WRITE_REPO_Test", "READ_REPO_Test", "READ_REPO_EnapsoDotNetProDemo", "ROLE_USER" ],
                username: aOptions.newusername, // Username for the new user
                password: aOptions.newpassword // Password for the new user
            });
            if (res.success) {
                console.log(
                    'User ' + aOptions.newusername + ' created successfully.'
                );
                return 0;
            } else {
                console.log(res.message);
                return 400;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    updateUser: async function (aOptions) {
        try {
            let optAuth = aOptions.authorities
                ? Array.isArray(aOptions.authorities)
                    ? aOptions.authorities.join(' ')
                    : aOptions.authorities
                : 'ROLE_USER';
            optAuth = optAuth.split(' ');
            let authorities = [];
            for (let auth of optAuth) {
                authorities.push(auth.trim());
            }
            let res = await this.endpoint.updateUser({
                authorities: authorities, // e.g. [ "WRITE_REPO_Test", "READ_REPO_Test", "READ_REPO_EnapsoDotNetProDemo", "ROLE_USER" ],
                username: aOptions.newusername, // Username for the new user which you wanna update
                password: aOptions.newpassword // Password for the new user
            });
            if (res.success) {
                console.log(
                    'User ' + aOptions.newusername + ' updated successfully.'
                );
                return 0;
            } else {
                console.log(res.message);
                return 400;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    deleteUser: async function (aOptions) {
        try {
            let lRes = await this.endpoint.login(
                aOptions.username,
                aOptions.password
            );
            let res = await this.endpoint.deleteUser({
                user: aOptions.user // username which you want to delete
            });
            if (res.success) {
                console.log('User ' + aOptions.user + ' deleted successfully.');
                return 0;
            } else {
                console.log(res.message);
                return 400;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    deleteRepo: async function (aOptions) {
        try {
            var res = await this.endpoint.deleteRepository({
                id: aOptions.repository
            });
            if (res.success) {
                console.log(
                    'Repository ' +
                        aOptions.repository +
                        ' deleted successfully.'
                );
                return 0;
            } else {
                console.log(res.message);
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    clearContext: async function (aOptions) {
        try {
            var res = await this.endpoint.clearContext(aOptions.context);
            if (res.success) {
                console.log(
                    'Context ' + aOptions.context + ' cleared successfully.'
                );
                return 0;
            } else {
                console.log(res.message);
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    query: async function (aOptions) {
        try {
            var lQuery;
            try {
                lQuery = fs.readFileSync(aOptions.queryfile);
            } catch (err) {
                console.log('File ' + aOptions.queryfile + ' cannot be read');
                return -1;
            }

            var lRes = await this.endpoint.query(lQuery, {});
            let lData = this.endpoint.transformBindingsToCSV(lRes, {
                delimiter: '"',
                delimiterEscape: '\\"',
                delimiterOptional: true,
                separatorEscape: ','
            });
            let lineBreak = '\n';
            lData =
                lData.headers.join(lineBreak) +
                lineBreak +
                lData.records.join(lineBreak);

            try {
                fs.writeFileSync(aOptions.targetfile, lData);
                console.log(
                    'File ' + aOptions.targetfile + ' created successfully.'
                );
                return 0;
            } catch (err) {
                console.log(
                    'File ' + aOptions.targetfile + ' cannot be written'
                );
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    update: async function (aOptions) {
        try {
            var lQuery;
            try {
                lQuery = fs.readFileSync(aOptions.queryfile).toString();
            } catch (err) {
                console.log('File ' + aOptions.queryfile + ' cannot be read');
                return -1;
            }
            await this.endpoint.update(lQuery);
            console.log('Update Operation performed cleared successfully.');
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    // clearing the entire repository
    clearRepository: async function (aOptions) {
        try {
            // the repository is mandatory
            let lRepository = aOptions.repository;
            if (!lRepository) {
                return logErrorMsg(ERROR_NOREPOSITORY);
            }
            var lRes = await this.endpoint.clearRepository(lRepository, {});
            if (lRes && (lRes.status === 200 || lRes.status === 204)) {
                console.log(
                    'Repository "' + lRepository + '" cleared successfully.'
                );
                return 0;
            } else {
                console.log(
                    'Error clearing repository "' +
                        lRepository +
                        '": ' +
                        lRes.message
                );
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    // autoUpload: async function (aOptions) {
    //     try {
    //         let rawData = fs.readFileSync(aOptions.configfile);
    //         let jsonData = JSON.parse(rawData);
    //         try {
    //             let res = await EnapsoOntologyUploader.add(jsonData);
    //             console.log(res);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //         EnapsoOntologyUploader.watch(function (error, result) {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 console.log(result);
    //             }
    //         });
    //     } catch (err) {
    //         console.log(err.message);
    //         return err.status;
    //     }
    // },
    // perfom garbage collection
    performGarbageCollection: async function () {
        try {
            var lRes = await this.endpoint.performGarbageCollection();
            if (lRes && lRes.status === 200) {
                console.log('Garbage collected successfully.');
                return 0;
            } else {
                console.log('Error on garbage collection: ' + lRes.message);
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    // perfom garbage collection
    getResources: async function () {
        try {
            var lRes = await this.endpoint.getResources();
            if (lRes && lRes.status === 200) {
                console.log('Get resources successfully');
                console.log(
                    'HeapMemory Usage = ' +
                        JSON.stringify(lRes.data.heapMemoryUsage) +
                        '\n' +
                        'Non HeapMemory Usage = ' +
                        JSON.stringify(lRes.data.nonHeapMemoryUsage) +
                        '\n' +
                        'Thread Count = ' +
                        lRes.data.threadCount +
                        '\n' +
                        'CPU Load = ' +
                        lRes.data.cpuLoad +
                        '\n' +
                        'Class Count = ' +
                        lRes.data.classCount
                );
                return 0;
            } else {
                console.log('Error on garbage collection: ' + lRes.message);
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },
    getRepositories: async function () {
        try {
            var lRes = await this.endpoint.getRepositories();
            let repo = [];
            if (lRes && lRes.status === 200) {
                console.log('Getting repositories successfully');
                for (const item of lRes.data) {
                    repo.push(item.id);
                }
                console.log('repositories: ' + repo);
                return 0;
            } else {
                console.log('Error on Getting repositories: ' + lRes.message);
                return -1;
            }
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    transform: async function (aOptions) {
        try {
            var lSourceData = fs.readFileSync(aOptions.sourcefile);
            var lBindings = JSON.parse(lSourceData);
            var lDestData = EnapsoGraphDBClient.transformBindingsToResultSet(
                lBindings,
                {
                    dropPrefixes: false
                }
            );
            fs.writeFileSync(
                aOptions.targetfile,
                JSON.stringify(lDestData, null, 2)
            );
            console.log('Transform Performed successfully');
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    readPrefixes: async function (prefixFile) {
        try {
            let prefixData = fs.readFileSync(prefixFile, 'utf8');
            let prefixes = EnapsoGraphDBClient.parsePrefixes(prefixData);
            return prefixes;
        } catch (err) {
            console.log(err.message);
            return err.status;
        }
    },

    parseIfJsonArray(inputString) {
        if (inputString && inputString.startsWith('[') && inputString.endsWith(']')) {
            try {
                return JSON.parse(inputString);
            } catch (error) {
                console.error('Invalid JSON array:', error);
                return null;
            }
        } else {
           return inputString;
        }
    },

    exec: async function () {
        try {
            console.log(PROGRAM_TITLE);
            console.log(COPYRIGHT);

            let lOptions = commandLineArgs(this.mOptionDefinitions);
            // console.log(JSON.stringify(lOptions, null, 2));
            if (lOptions.command != `autoUpload`) {
                if (!lOptions.dburl) {
                    process.exit(logErrorMsg(ERROR_NO_DB_URL));
                }
            }
            let prefixes = GRAPHDB_DEFAULT_PREFIXES;
            if (lOptions.prefixfile) {
                prefixes = await this.readPrefixes(lOptions.prefixfile);
            }

            //	check if a database URL is passed

            this.endpoint = new EnapsoGraphDBClient.Endpoint({
                baseURL: lOptions.dburl,
                repository: lOptions.repository,
                prefixes: prefixes,
                version: lOptions.version,
                triplestore: lOptions.triplestore,
                apiType: lOptions.apiType
            });

            if (
                lOptions.username &&
                lOptions.password &&
                lOptions.triplestore != 'fuseki'
            ) {
                this.authentication = await this.endpoint.login(
                    lOptions.username,
                    lOptions.password
                );
                if (!this.authentication.success) {
                    process.exit(logErrorMsg(ERROR_AUTHENTICATION_FAILED));
                }
            }

            let retCode = -1;
            if (
                'export' === lOptions.command ||
                'download' === lOptions.command
            ) {
                retCode = await this.export(lOptions);
            } else if (
                'import' === lOptions.command ||
                'upload' === lOptions.command
            ) {
                retCode = await this.import(lOptions);
            } else if ('importServerFile' === lOptions.command) {
                retCode = await this.importServerFile(lOptions);
            } else if ('transform' === lOptions.command) {
                retCode = await this.transform(lOptions);
            } else if ('query' === lOptions.command) {
                retCode = await this.query(lOptions);
            } else if ('update' === lOptions.command) {
                retCode = await this.update(lOptions);
            } else if ('clearRepository' === lOptions.command) {
                retCode = await this.clearRepository(lOptions);
            } else if ('createRepository' === lOptions.command) {
                retCode = await this.createRepository(lOptions);
            } else if ('deleteRepository' === lOptions.command) {
                retCode = await this.deleteRepo(lOptions);
            } else if (
                'clearContext' === lOptions.command ||
                'clearGraph' === lOptions.command
            ) {
                retCode = await this.clearContext(lOptions);
            } else if ('createUser' === lOptions.command) {
                retCode = await this.createUser(lOptions);
            } else if ('updateUser' === lOptions.command) {
                retCode = await this.updateUser(lOptions);
            } else if ('deleteUser' === lOptions.command) {
                retCode = await this.deleteUser(lOptions);
            } else if (
                'gc' === lOptions.command ||
                'garbageCollection' === lOptions.command
            ) {
                retCode = await this.performGarbageCollection(lOptions);
            } else if ('getResources' === lOptions.command) {
                retCode = await this.getResources(lOptions);
            } else if ('getRepositories' === lOptions.command) {
                retCode = await this.getRepositories(lOptions);
            } else if ('removeRoles' === lOptions.command) {
                retCode = await this.removeRoles(lOptions);
            } else if ('assignRoles' === lOptions.command) {
                retCode = await this.assignRoles(lOptions);
            } else if (
                'au' === lOptions.command ||
                'autoUpload' === lOptions.command
            ) {
                retCode = await this.autoUpload(lOptions);
            } else {
                retCode = logErrorMsg(ERROR_NO_OR_INVALID_COMMAND);
            }
            if (lOptions.command != `autoUpload`) {
                process.exit(retCode);
            }
        } catch (err) {
            console.log(err.message);
            process.exit(err.status);
        }
    }
};

EnapsoGraphDBCLI.exec();
