require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: __dirname + "/.env" });
const privateKey = process.env.PRIVATE_KEY;
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    hyperspace: {
      chainId: 3141,
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
