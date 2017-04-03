var exports = module.exports = {};
var restart = require("./restart");
var keystone = require("../keystone");
exports.restartServer = function(inputArgs) {
    keystone.authentication.authenticate(inputArgs, function(error, token) {
        if (error === null) {
            restart.restart(token, inputArgs);
        }else{
            inputArgs.callback(error,null)
        }
    })
}
