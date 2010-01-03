
function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };

var ARGS = require("args");
var parser = exports.parser = new ARGS.Parser();

var OS = require("os");
var UTIL = require("util");
var FILE = require("file");
var TUSK = require("narwhal/tusk/tusk");

parser.help('Tools for CommonJS browser deployment');

parser.helpful();


var tusk = TUSK.Tusk().activate(),
    sea = TUSK.getActive().getSea(),
    command;

command = parser.command('bundle', function(options) {

    
});
command.help('Bundle a program for browser deployment');
command.helpful();


exports.main = function (args) {
    var options = parser.parse(args);
    if (!options.acted) {
        parser.printHelp(options);
    }
}

exports.command = function (command) {
    var process = os.popen(command);
    var result = process.communicate();
    if (result.status !== 0)
        throw new Error(result.stderr.read());
    var stdout = result.stdout.read() || result.stderr.read();
    return stdout;
};

