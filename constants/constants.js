var ports = require("./ports.json")
function Constants(){};
Constants.prototype.getComputePort = function(){
   return ports.computePort;
}
Constants.prototype.getNovaPort = function(){
	return ports.novaPort;
}
module.exports = Constants;