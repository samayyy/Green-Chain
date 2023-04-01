const {
  frontEndContractsFile,
  frontEndAbiFile,
} = require("../helper-hardhat-config");
const fs = require("fs");
const { network } = require("hardhat");

module.exports = async () => {
  let CONTRACT = ["Case", "Authorities"];
  if (process.env.UPDATE_FRONT_END) {
    for (let contract of CONTRACT) {
      console.log("Writing ", contract, " to front end...");
      await updateContractAddresses(contract);
      await updateAbi(contract);
      console.log("Front end written!");
    }
  }
};

async function updateAbi(contract) {
  const myContract = await ethers.getContract(contract);
  fs.writeFileSync(
    frontEndAbiFile,
    myContract.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses(contract) {
  const myContract = await ethers.getContract(contract);
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
