require("@nomicfoundation/hardhat-toolbox");
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
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
    alfajores: {
      url: `https://celo-alfajores.infura.io/v3/e3ce47b1fda64c938525793e7afb0277`,
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
