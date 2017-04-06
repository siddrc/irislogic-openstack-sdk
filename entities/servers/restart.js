var constants = require("../constants");
var http = require("../http");
var Schemas = require("../schemas/schemas")
function Restart() {}
Restart.prototype.restartInstance = function(token, inputArgs) {
    var schemas = new Schemas();
    var validSchema = schemas.validateData("restartSchema", inputArgs);
    if (!validSchema.error) {
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
        inputArgs.apiURL = inputArgs.protocol + "://" + inputArgs.openStackHost + ":" + constants.constants.getComputePort() + "/v2/servers/" + inputArgs.serverId;
        http.request.sendPostRequest(inputArgs);
    } else {
        inputArgs.errorCallback(validSchema.errors);
    }
}
module.exports = Restart;
