

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var ContentLength = require("jack/contentlength").ContentLength,
    ContentType = require("jack/contenttype").ContentType,
    ShowExceptions = require("jack/showexceptions").ShowExceptions,
    Lint = require("jack/lint").Lint;

var FILE = require("file");
var STATIC = require("jack/static");
var JSON = require("json");
var UTIL = require("util");
var PACKAGES = require("packages");
// TODO: Once we can jackup an app with a using-package context we can use the "pinf-common" alias
var DESCRIPTOR = require("package/descriptor", "registry.pinf.org/cadorn.org/github/pinf/packages/common/master");
//var PACKAGE = require("package", "registry.pinf.org/cadorn.org/github/pinf/packages/common/master");


var programPath = FILE.Path(system.env.PROGRAM_PATH);
var descriptor = DESCRIPTOR.PackageDescriptor(programPath.join("package.json"));
var options = descriptor.getPinfSpec().launcher.options || {};


var app = function(env) {

    var rootPath = programPath;

    var path = env["PATH_INFO"];
    if(path=="/") {
        // determine index file based on launcher options
        if(options.directoryIndex) {
            path = "/" + options.directoryIndex;
        } else {
            path = "/index.html";
        }
    }

    var m = path.match(/^\/pinf\/@uid\/(.*?)\/@direct\/(.*)$/);
    if(m) {

        var path = PACKAGES.usingCatalog[m[1] + "/master"].directory;

        // TODO: Read @direct mapping from package descriptor

        rootPath = path;
        if(options.documentRoot) {
            path = "/" + options.documentRoot + "/" + m[2];
        } else {
            path = "/" + m[2];
        }
    } else {
        if(options.documentRoot) {
            path = "/" + options.documentRoot + path;
        }
    }

    env["PATH_INFO"] = path;

    return STATIC.Static(function() {}, {
        "urls": [
            path
        ],
        "root": rootPath
    })(env);
}

// The application.
exports.app = ShowExceptions(Lint(ContentType(ContentLength(app))));

