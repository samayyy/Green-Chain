const networkConfig = {
  default: {
    name: "hardhat",
    blockConfirmations: 0,
  },
  31337: {
    name: "localhost",
    blockConfirmations: 0,
  },
  1: {
    name: "mainnet",
    blockConfirmations: 1,
  },
  5: {
    name: "goerli",
    blockConfirmations: 1,
  },
  80001: {
    name: "polygon_mumbai",
    blockConfirmations: 1,
  },
};

const frontEndContractsFile =
  "../frontend/src/constants/contractAddresses.json";
const frontEndAbiFile = "../frontend/src/constants/abi.json";

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
  frontEndContractsFile,
  frontEndAbiFile,
};
