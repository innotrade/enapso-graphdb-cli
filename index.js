#!/usr/bin/env node

// Innotrade Enapso GraphDB Command Line Interface (CLI)
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany

// for details regarding the options see:
// https://github.com/75lb/command-line-args/blob/master/doc/API.md
// https://github.com/75lb/command-line-args/blob/master/doc/option-definition.md

const commandLineArgs = require('command-line-args');
const EnapsoGraphDBClient = require('enapso-graphdb-client');
const EnapsoGraphDBAdmin = require('enapso-graphdb-admin');

// the default prefixes for all SPARQL queries
const GRAPHDB_DEFAULT_PREFIXES = [
    EnapsoGraphDBClient.PREFIX_OWL,
    EnapsoGraphDBClient.PREFIX_RDF,
    EnapsoGraphDBClient.PREFIX_RDFS
];

const EnapsoGraphDBCLI = {

    mOptionDefinitions: [
        { name: "command", defaultOption: true },
        { name: "repository", alias: 'r', type: String },
        { name: "context", alias: 'c', type: String },
        { name: "username", alias: 'u', type: String },
        { name: "password", alias: 'p', type: String },
        { name: "dburl", alias: 'd', type: String },
        { name: "baseuri", alias: 'b', type: String },
        { name: "verbose", alias: 'v', type: Boolean },
        { name: "targetfile", alias: 't', type: String },
        { name: "format", alias: 'f', type: String }
    ],

    export: async function (aOptions) {
        var lRes = await this.endpoint.downloadToFile({
            repository: aOptions.repository,
            format: aOptions.format,
            context: aOptions.context,
            filename: aOptions.targetfile,
            username: aOptions.username,
            password: aOptions.password
        });
        console.log("Export file has been created.");
    },

    exec: async function () {
        console.log("Enapso Ontotext GraphDB Command Line Interface");
        console.log("(C) 2019 Innotrade GmbH, Herzogenrath, NRW, Germany");

        let lOptions = commandLineArgs(this.mOptionDefinitions);
        // console.log(JSON.stringify(lOptions, null, 2));

        this.endpoint = new EnapsoGraphDBClient.Endpoint({
            baseURL: lOptions.baseuri,
            repository: lOptions.repository,
            prefixes: GRAPHDB_DEFAULT_PREFIXES
        });
        this.authentication = await this.endpoint.login(
            lOptions.username,
            lOptions.password
        );
        if (!this.authentication.success) {
            console.log("Login failed");
            process.exit(-1);
        }

        if ('export' === lOptions.command) {
            this.export(lOptions);
        } else {
            console.log("No valid command passed");
        }
    }

}

EnapsoGraphDBCLI.exec();