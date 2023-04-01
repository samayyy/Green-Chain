const {
  frontEndContractsFile,
  frontEndAbiFile,
} = require("../helper-hardhat-config");
const fs = require("fs");
const { network } = require("hardhat");

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Writing to front end...");
    await updateContractAddresses();
    await updateAbi();
    console.log("Front end written!");
  }
};

async function updateAbi() {
  const myContract = await ethers.getContract("Case");
  fs.writeFileSync(
    frontEndAbiFile,
    myContract.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const myContract = await ethers.getContract("Case");
  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractsFile, "utf8")
  );
  if (network.config.chainId.toString() in contractAddresses) {
    if (
      !contractAddresses[network.config.chainId.toString()].includes(
        myContract.address
      )
    ) {
      contractAddresses[network.config.chainId.toString()].push(
        myContract.address
      );
    }
  } else {
    contractAddresses[network.config.chainId.toString()] = [myContract.address];
  }
  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}
module.exports.tags = ["all", "frontend"];
