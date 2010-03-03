
var FOO = require("./foo");

exports.main = function() {

    console.log("Hello World from main.js");

    console.log(FOO.hi());

}

exports.foo = function() {
    return FOO.hi();
}

if (require.main == module) {
    exports.main();
}
