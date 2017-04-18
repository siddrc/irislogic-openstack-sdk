var Constants = require("../../constants/constants");
var HttpClient = require("../../http/httpclient");
var Schemas = require("../../schemas/schemas")

function Restart() {}
Restart.prototype.restartInstance = function(token, inputArgs) {
    var schemas = new Schemas();
    var constants = new Constants();
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
        inputArgs.args = args;
        var httpClient = new HttpClient();
        inputArgs.apiURL = inputArgs.protocol + "://" + inputArgs.openStackHost + ":" + constants.getComputePort() + "/v2/servers/" + inputArgs.serverId + "/action";
        httpClient.sendPostRequest(inputArgs);

    } else {
        inputArgs.errorCallback(validSchema.errors);
    }
}
module.exports = Restart;
