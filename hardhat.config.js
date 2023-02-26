require("@nomicfoundation/hardhat-toolbox");
const projectId = process.env.PROJECT_ID;
const privateKey = process.env.PRIVATE_KEY;
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      account: [privateKey],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/2${projectId}`,
      account: [privateKey],
    },
  },
  solidity: "0.8.4",
};
