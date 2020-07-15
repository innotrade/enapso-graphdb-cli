#!/usr/bin/env node

// Innotrade Enapso GraphDB Command Line Interface (CLI)
// (C) Copyright 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany
// Author(s): Alexander Schulze and Muhammad Yasir
// for details regarding the options see:
// https://github.com/75lb/command-line-args/blob/master/doc/API.md
// https://github.com/75lb/command-line-args/blob/master/doc/option-definition.md

const fs = require('fs');
const packageJson = require('./package.json');
const commandLineArgs = require('command-line-args');
const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client');
const { EnapsoGraphDBAdmin } = require('@innotrade/enapso-graphdb-admin');

// the default prefixes for all SPARQL queries
const GRAPHDB_DEFAULT_PREFIXES = [
    EnapsoGraphDBClient.PREFIX_OWL,
    EnapsoGraphDBClient.PREFIX_RDF,
    EnapsoGraphDBClient.PREFIX_RDFS
];

const PROGRAM_TITLE =
    'enapso Ontotext GraphDB Command Line Interface (CLI) v' +
    packageJson.version;
const COPYRIGHT =
    '(C) 2019-2020 Innotrade GmbH, Herzogenrath, NRW, Germany, https://www.innotrade.com';

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
        { name: 'baseiri', alias: 'i', type: String },
        { name: 'baseurl', alias: 'b', type: String },
        { name: 'verbose', alias: 'v', type: Boolean },
        { name: 'targetfile', alias: 't', type: String },
        { name: 'sourcefile', alias: 's', type: String },
        { name: 'format', alias: 'f', type: String },
        { name: 'queryfile', alias: 'q', type: String },
        { name: 'prefixfile', alias: 'x', multiple: true, type: String },
        { name: 'repotitle', type: String },
        { name: 'authorities', alias: 'a', type: String, multiple: true },
        { name: 'newusername', type: String },
        { name: 'newpassword', type: String },

        { name: 'isShacl', type: Boolean }
    ],

    export: async function (aOptions) {
        var lRes = await this.endpoint.downloadToFile({
            repository: aOptions.repository,
            format: aOptions.format,
            context: aOptions.context,
            filename: aOptions.targetfile
        });
        console.log('Export file successfully downloaded.');
    },

    import: async function (aOptions) {
        var res = await this.endpoint.uploadFromFile({
            filename: aOptions.sourcefile,
            format: aOptions.format,
            baseIRI: aOptions.baseiri,
            context: aOptions.context
        });
        if (res.success) {
            console.log(
                'Import file ' + aOptions.sourcefile + ' successfully uploaded.'
            );
            return 0;
        } else {
            console.log(res.statusMessage);
            return -1;
        }
    },

    createRepository: async function (aOptions) {
        var res = await this.endpoint.createRepository({
            id: aOptions.repository,
            title: aOptions.repotitle,
            location: aOptions.location !== undefined ? aOptions.location : '',
            baseURL: aOptions.baseurl,
            isShacl: aOptions.isShacl !== undefined ? aOptions.isShacl : false
        });
        if (res.success) {
            console.log(
                'Repository ' + aOptions.repository + ' created successfully.'
            );
            return 0;
        } else {
            console.log(res.statusMessage);
            return -1;
        }
    },

    createUser: async function (aOptions) {
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
            console.log(res.statusMessage);
            return 400;
        }
    },

    updateUser: async function (aOptions) {
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
            console.log(res.statusMessage);
            return 400;
        }
    },

    deleteUser: async function (aOptions) {
        let lRes = await this.endpoint.login(
            aOptions.username,
            aOptions.password
        );
        let res = await this.endpoint.deleteUser({
            user: aOptions.newusername // username which you want to delete
        });
        if (res.success) {
            console.log(
                'User ' + aOptions.newusername + ' deleted successfully.'
            );
            return 0;
        } else {
            console.log(res.statusMessage);
            return 400;
        }
    },

    deleteRepo: async function (aOptions) {
        var res = await this.endpoint.deleteRepository({
            id: aOptions.repository
        });
        if (res.success) {
            console.log(
                'Repository ' + aOptions.repository + ' deleted successfully.'
            );
            return 0;
        } else {
            console.log(res.statusMessage);
            return -1;
        }
    },

    clearContext: async function (aOptions) {
        var res = await this.endpoint.clearContext({
            context: aOptions.context
        });
        if (res.success) {
            console.log(
                'Context ' + aOptions.context + ' cleared successfully.'
            );
            return 0;
        } else {
            console.log(res.statusMessage);
            return -1;
        }
    },

    query: async function (aOptions) {
        var lQuery;
        try {
            lQuery = fs.readFileSync(aOptions.queryfile, 'utf8');
        } catch (err) {
            console.log('File ' + aOptions.queryfile + ' cannot be read');
            return -1;
        }

        var lRes = await this.endpoint.query(lQuery, {});
        let lData;
        if ('json' === aOptions.format) {
            lData = this.endpoint.transformBindingsToResultSet(lRes, {});
            lData = JSON.stringify(lData, null, 2);
        } else if ('csv' === aOptions.format) {
            lData = this.endpoint.transformBindingsToCSV(lRes, {
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
        } else if ('tsv' === aOptions.format) {
            lData = this.endpoint.transformBindingsToTSV(lRes, {
                delimiter: '"',
                delimiterEscape: '\\"',
                delimiterOptional: true,
                separatorEscape: '\\t'
            });
            let lineBreak = '\n';
            lData =
                lData.headers.join(lineBreak) +
                lineBreak +
                lData.records.join(lineBreak);
        } else {
            lData = JSON.stringify(lRes, null, 2);
        }

        try {
            fs.writeFileSync(aOptions.targetfile, lData);
            console.log(
                'File ' + aOptions.targetfile + ' created successfully.'
            );
            return 0;
        } catch (err) {
            console.log('File ' + aOptions.targetfile + ' cannot be written');
            return -1;
        }
    },

    // clearing the entire repository
    clearRepository: async function (aOptions) {
        // the repository is mandatory
        let lRepository = aOptions.repository;
        if (!lRepository) {
            return logErrorMsg(ERROR_NOREPOSITORY);
        }
        var lRes = await this.endpoint.clearRepository(lRepository, {});
        if (lRes && lRes.statusCode === 200) {
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
    },

    // perfom garbage collection
    performGarbageCollection: async function () {
        var lRes = await this.endpoint.performGarbageCollection();
        if (lRes && lRes.statusCode === 200) {
            console.log('Garbage collected successfully.');
            return 0;
        } else {
            console.log('Error on garbage collection: ' + lRes.message);
            return -1;
        }
    },

    transform: async function (aOptions) {
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
    },

    readPrefixes: async function (prefixFile) {
        let prefixData = fs.readFileSync(prefixFile, 'utf8');
        let prefixes = EnapsoGraphDBClient.parsePrefixes(prefixData);
        return prefixes;
    },

    exec: async function () {
        console.log(PROGRAM_TITLE);
        console.log(COPYRIGHT);

        let lOptions = commandLineArgs(this.mOptionDefinitions);
        // console.log(JSON.stringify(lOptions, null, 2));

        let prefixes = GRAPHDB_DEFAULT_PREFIXES;
        if (lOptions.prefixfile) {
            prefixes = await this.readPrefixes(lOptions.prefixfile);
        }

        // check if a database URL is passed
        if (!lOptions.dburl) {
            process.exit(logErrorMsg(ERROR_NO_DB_URL));
        }

        this.endpoint = new EnapsoGraphDBClient.Endpoint({
            baseURL: lOptions.dburl,
            repository: lOptions.repository,
            prefixes: prefixes
        });

        if (lOptions.username && lOptions.password) {
            this.authentication = await this.endpoint.login(
                lOptions.username,
                lOptions.password
            );
            if (!this.authentication.success) {
                process.exit(logErrorMsg(ERROR_AUTHENTICATION_FAILED));
            }
        }

        let retCode = -1;
        if ('export' === lOptions.command || 'download' === lOptions.command) {
            retCode = await this.export(lOptions);
        } else if (
            'import' === lOptions.command ||
            'upload' === lOptions.command
        ) {
            retCode = await this.import(lOptions);
        } else if ('transform' === lOptions.command) {
            retCode = await this.transform(lOptions);
        } else if ('query' === lOptions.command) {
            retCode = await this.query(lOptions);
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
        } else {
            retCode = logErrorMsg(ERROR_NO_OR_INVALID_COMMAND);
        }

        process.exit(retCode);
    }
};

EnapsoGraphDBCLI.exec();
