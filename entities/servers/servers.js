var remove =  require("./remove")
var Authentication = require("../keystone/authentication");
var Restart = require("./restart");
function Servers(){}
Servers.prototype.restart = function(inputArgs) {
    var authentication = new Authentication();
    var restart = new Restart();
    authentication.authenticate(inputArgs, function(error, token) {
        if (error === null) {
            restart.restartInstance(token, inputArgs);
        }else{
            inputArgs.callback(error,null)
        }
    })
}
Servers.prototype.remove = function(inputArgs) {
    keystone.authentication.authenticate(inputArgs, function(error, token) {
        if (error === null) {
            remove.remove(token, inputArgs);
        }else{
            inputArgs.callback(error,null)
        }
    })
}
module.exports = Servers;