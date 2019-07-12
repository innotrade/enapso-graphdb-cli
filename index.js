#!/usr/bin/env node

// Innotrade Enapso GraphDB Command Line Interface (CLI)
// (C) Copyright 2019 Innotrade GmbH, Herzogenrath, NRW, Germany

// for details regarding the options see:
// https://github.com/75lb/command-line-args/blob/master/doc/API.md
// https://github.com/75lb/command-line-args/blob/master/doc/option-definition.md

const fs = require('fs');
const commandLineArgs = require('command-line-args');
const { EnapsoGraphDBClient } = require('enapso-graphdb-client');
const { EnapsoGraphDBAdmin } = require('enapso-graphdb-admin');

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
		{ name: "baseiri", alias: 'i', type: String },
		{ name: "verbose", alias: 'v', type: Boolean },
		{ name: "targetfile", alias: 't', type: String },
		{ name: "sourcefile", alias: 's', type: String },
		{ name: "format", alias: 'f', type: String },
		{ name: "queryfile", alias: 'q', type: String },
		{ name: "prefixfile", alias: 'x', type: String }
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

	import: async function (aOptions) {
		var lRes = await this.endpoint.uploadFromFile({
			filename: aOptions.sourcefile,
			format: aOptions.format,
			baseIRI: aOptions.baseiri,
			context: aOptions.context,
			username: aOptions.username,
			password: aOptions.password
		});
		console.log("Import file has been uploaded.");
	},

	query: async function (aOptions) {
		var lQuery;
		try {
			lQuery = fs.readFileSync(aOptions.queryfile);
		} catch (err) {
			console.log("File " + aOptions.queryfile + " cannot be read");
			return;
		}

		var lRes = await this.endpoint.query(lQuery, {

		});
		let lData = this.endpoint.transformBindingsToCSV(lRes, {
			delimiter: '"'
		});
		let lineBreak = '\n';
		lData = lData.headers.join(lineBreak) + lineBreak + lData.records.join(lineBreak);

		try {
			fs.writeFileSync(aOptions.targetfile, lData);
			console.log("File " + aOptions.targetfile + " successfully created");
		} catch (err) {
			console.log("File " + aOptions.targetfile + " cannot be written");
			return;
		}

	},

	transform: async function (aOptions) {
		var lSourceData = fs.readFileSync(aOptions.sourcefile);
		var lBindings = JSON.parse(lSourceData);
		var lDestData = EnapsoGraphDBClient.transformBindingsToResultSet(lBindings, {
			dropPrefixes: false
		});
		fs.writeFileSync(aOptions.targetfile, JSON.stringify(lDestData, null, 2));
	},

	readPrefixes: async function (prefixFile) {
		let prefixData = fs.readFileSync(prefixFile, 'utf8');
		let prefixes = EnapsoGraphDBClient.parsePrefixes(prefixData);
		return prefixes;
	},

	exec: async function () {
		console.log("Enapso Ontotext GraphDB Command Line Interface");
		console.log("(C) 2019 Innotrade GmbH, Herzogenrath, NRW, Germany, https://www.innotrade.com");

		let lOptions = commandLineArgs(this.mOptionDefinitions);
		// console.log(JSON.stringify(lOptions, null, 2));

		let prefixes = GRAPHDB_DEFAULT_PREFIXES
		if (lOptions.prefixfile) {
			prefixes = await this.readPrefixes(lOptions.prefixfile);
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
				console.log("Login failed");
				process.exit(-1);
			}
		}

		if ('export' === lOptions.command) {
			this.export(lOptions);
		} else if ('import' === lOptions.command) {
			this.import(lOptions);
		} else if ('transform' === lOptions.command) {
			this.transform(lOptions);
		} else if ('query' === lOptions.command) {
			this.query(lOptions);
		} else {
			console.log("No valid command passed");
		}
	}

}

EnapsoGraphDBCLI.exec();