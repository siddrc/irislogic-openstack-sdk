var Remove = require("./remove")
var Authentication = require("../keystone/authentication");
var Restart = require("./restart");
var Get = require("./get");
function Servers() {}
Servers.prototype.restart = function(inputArgs) {
    var authentication = new Authentication();
    var restart = new Restart();
    authentication.authenticate(inputArgs, function(error, token) {
        if (error === null) {
            restart.restartInstance(token, inputArgs);
        } else {
            inputArgs.callback(error, null)
        }
    })
}
Servers.prototype.remove = function(inputArgs) {
    var remove = new Remove();
    var authentication = new Authentication();
    authentication.authenticate(inputArgs, function(error, token) {
        if (error === null) {
            remove.remove(token, inputArgs);
        } else {
            inputArgs.callback(error, null)
        }
    })
}
Servers.prototype.get = function(inputArgs) {
    var get = new Get();
    var authentication = new Authentication();
    authentication.authenticate(inputArgs, function(error, token) {
        if (error === null) {
            get.getServers(token, inputArgs);
        } else {
            inputArgs.callback(error, null)
        }
    })
}
module.exports = Servers;
