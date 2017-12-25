#! /usr/local/bin/node

var fs = require("fs");
var path = require("path");
var dir = process.cwd();

if(process.argv.length >2) dir = process.argv[2];

process.stdout.write("Name\tSize\tDate\n");

function listdir(dir) {
	var dirstats = fs.statSync(dir);
	process.stdout.write(dir + "/\t" + dirstats.size + "\t" + dirstats.mtime + "\n");

	var files = fs.readdirSync(dir);
	
	files.forEach(function(filename) {
		var fullname = path.join(dir, filename);
		var stats = fs.statSync(fullname);

		if(stats.isDirectory()) listdir(fullname);

		process.stdout.write(filename + "\t" + stats.size + "\t" + stats.mtime + "\n");
	});
}

listdir(dir);

