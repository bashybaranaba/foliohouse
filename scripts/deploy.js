const hre = require("hardhat");

async function main() {
  const Foliohouse = await hre.ethers.getContractFactory("Foliohouse");
  const folioContract = await Foliohouse.deploy();
  await folioContract.deployed();
  console.log("folioContract deployed to:", folioContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
