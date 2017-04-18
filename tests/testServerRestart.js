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
        inputArgs.openStackHost = "54.227.13.130";
        inputArgs.protocol = "http";
        inputArgs.serverId = "b80c6e30-8a65-4804-93cf-701c540fc1d0";
        inputArgs.auth = {
            "auth": {
                "tenantName": "admin",
                "passwordCredentials": {
                    "username": "admin",
                    "password": "irislogic@007"
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
