var Constants = require("../../constants");
var HttpClient = require("../../http/httpclient");
var Schemas = require("../../schemas/schemas");
function Remove() {}
Remove.prototype.removeInstance = function(token, inputArgs) {
    var schemas = new Schemas();
    var constants =  new Constants();
    var validSchema = schemas.validateData("restartSchema", inputArgs);
    if (!validSchema.error) {
        var args = {
            headers: {
                "X-Auth-Token": token,
                "Content-Type": "application/json"
            }
        };
        var httpClient = new HttpClient();
        inputArgs.apiURL = inputArgs.protocol + "://" + inputArgs.openStackHost + ":" + constants.constants.getComputePort() + "/v2/servers/" + inputArgs.serverId;
        httpClient.sendDeleteRequest(inputArgs);
    } else {
        inputArgs.errorCallback(validSchema.errors);
    }
}
module.exports = Remove;
