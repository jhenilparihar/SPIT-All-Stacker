const OTT = artifacts.require("OTT");

module.exports = async function(deployer) {
  await deployer.deploy(OTT);
};
