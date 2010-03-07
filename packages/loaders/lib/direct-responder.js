
function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };

var FILE = require("file");
var STATIC = require("jack/static");

exports.app = function(app) {

    return function(env) {

        var path = env.pinf.vars.path;

        env["PATH_INFO"] = path;

        return STATIC.Static(function() {}, {
            "urls": [
                path
            ],
            "root": FILE.Path(module.path).dirname()
        })(env);
    }
}
