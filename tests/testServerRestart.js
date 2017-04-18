//TODO:test if connection fails
var chai = require('chai');
const chaiJWT = require('chai-jwt');
chai.use(chaiJWT);
var expect = chai.expect; 
var Server = require("../entities/servers/servers");

describe('Restart server', function() {
    it('restart() should restart the openstack instance', function() {
        var server = new Server();
        var inputArgs = {};
        inputArgs.openStackHost = "";
        inputArgs.protocol = "http";
        inputArgs.serverId = "";
        inputArgs.auth = {
            "auth": {
                "tenantName": "",
                "passwordCredentials": {
                    "username": "",
                    "password": ""
                }
            }

        }
        inputArgs.callback = function(errors, data) {
            if (errors)
                console.log("Error:" +JSON.stringify(errors));
            else
                console.log("data : "+JSON.stringify(data));
        }
        server.restart(inputArgs)
    });
});
