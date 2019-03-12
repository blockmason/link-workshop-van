var Ownership = artifacts.require("./Ownership.sol");
var OwnershipLink = artifacts.require("./OwnershipLink.sol");

module.exports = function(deployer) {
	deployer.deploy(Ownership);
	deployer.deploy(OwnershipLink);
};