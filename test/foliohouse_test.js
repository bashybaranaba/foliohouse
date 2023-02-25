const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Foliohouse", function () {
  it("A decentralized dataset repository", async function () {
    const Foliohouse = await ethers.getContractFactory("Foliohouse");
    const foliohouseContract = await Foliohouse.deploy();
    await foliohouseContract.deployed();

    const [_, firstMemberAddress, secondMemberAddress, thirdMemberAddress] =
      await ethers.getSigners();

    //Creating news Items
    await foliohouseContract
      .connect(firstMemberAddress)
      .createDataset(
        20,
        "DatasetName",
        "https://fileurl",
        "https://metadata",
        false
      );

    await foliohouseContract
      .connect(secondMemberAddress)
      .createDataset(
        1024 * 1024 * 1024,
        "DatasetName1",
        "https://fileurl",
        "https://metadata",
        false
      );

    await foliohouseContract
      .connect(thirdMemberAddress)
      .createDataset(
        20,
        "DatasetName3",
        "https://fileurl",
        "https://metadata",
        false
      );

    await foliohouseContract.accessDataset(1);

    await foliohouseContract
      .connect(secondMemberAddress)
      .createDataset(
        1,
        "DatasetName1",
        "https://fileurl",
        "https://metadata",
        false
      );

    let allDatasets = await foliohouseContract.getAllDatasets();
    let publicDatasets = await foliohouseContract.getPublicDatasets();
    let ownedDatasets = await foliohouseContract
      .connect(thirdMemberAddress)
      .getOwnedDatasets();

    let creatorDatasets = await foliohouseContract.getPublicDatasetsByCreator(
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    );

    let balance = await foliohouseContract
      .connect(secondMemberAddress)
      .getMyTokens();

    let usedstorage = await foliohouseContract
      .connect(secondMemberAddress)
      .getMyusedStorage();

    console.log("all datasets : ", allDatasets);
    console.log("all public datasets : ", publicDatasets);
    console.log("Owned datasets : ", ownedDatasets);
    console.log("Creator datasets : ", creatorDatasets);
    console.log("User balance : ", balance);
    console.log("Used storage : ", usedstorage);
  });
});
