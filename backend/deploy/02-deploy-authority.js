const { network, ethers } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async function (hre) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  console.log(`Deploying on ${network.name} [${chainId}]...`);
  const myContract = await deploy("Authorities", {
    from: deployer,
    args: [], // if constructor has arguments
    log: true,
    waitConfirmations: networkConfig[chainId].blockConfirmations || 0,
  });
  console.log(`Authorities Contract deployed at ${myContract.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await new Promise((resolve) => setTimeout(resolve, 15 * 1000));
    await verify(myContract.address, []);
  }
};

module.exports.tags = ["all", "authority"];
