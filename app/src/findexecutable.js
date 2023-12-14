// Forked from https://github.com/springernature/hasbin
// Because it has been archived.
// MIT License
// Copyright (c) 2023, ono ono
// Copyright (c) 2015, Nature Publishing Group
var fs = require('node:fs');
var path = require('path');

function findExecutableFullPath (programName) {
	for (const programFullPath of getPossibleProgramPaths(programName)) {
		if (fileExistsSync(programFullPath)) {
			return programFullPath;
		}
	}
	return ''
}

function getPossibleProgramPaths (bin) {
	var envPath = (process.env.PATH || '');
	var envExt = (process.env.PATHEXT || '');
	return envPath.replace(/["]+/g, '').split(path.delimiter).map(function (chunk) {
		return envExt.split(path.delimiter).map(function (ext) {
			return path.join(chunk, bin + ext);
		});
	}).reduce(function (a, b) {
		return a.concat(b);
	});
}

function fileExistsSync (filePath) {
	try {
		return fs.statSync(filePath).isFile();
	} catch (error) {
		return false;
	}
}

exports.findExecutableFullPath = findExecutableFullPath;
exports.fileExistsSync = fileExistsSync;
