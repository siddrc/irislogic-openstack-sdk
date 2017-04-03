var exports = module.exports = {};
var Client = require('node-rest-client').Client;
exports.restart = function(token, inputArgs) {
    var client = new Client();
    var data = {
        "reboot": {
            "type": "HARD"
        }
    };
    var args = {
        data: JSON.stringify(data),
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json"
        }
    };
    var req = client.post("http://" + inputArgs.host + ":8774/v2/servers/" + inputArgs.serverId + "/action", args, function(dataFromRestartAPI, response) {
        inputArgs.callback(null,dataFromRestartAPI)
    });
    req.on('error', function(err) {
        console.log('request error', err);
        inputArgs.callback(err,null)
    });
    req.on('requestTimeout', function(req) {
        console.log('request has expired');
        req.abort();
        inputArgs.callback(err,null)
    });

    req.on('responseTimeout', function(res) {
        console.log('response has expired');
    });

}
