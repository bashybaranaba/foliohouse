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
        0,
        20,
        "DatasetName",
        "https://fileurl",
        "Dataset Hedline",
        "Dataset Description",
        false
      );

    await foliohouseContract
      .connect(secondMemberAddress)
      .createDataset(
        1,
        1024 * 1024 * 1024,
        "DatasetName1",
        "https://fileurl",
        "Dataset Hedline1",
        "Dataset Description1",
        false
      );

    await foliohouseContract
      .connect(thirdMemberAddress)
      .createDataset(
        2,
        20,
        "DatasetName3",
        "https://fileurl",
        "Dataset Hedline2",
        "Dataset Description2",
        false
      );

    await foliohouseContract.accessDataset(1);

    await foliohouseContract
      .connect(secondMemberAddress)
      .createDataset(
        3,
        1,
        "DatasetName1",
        "https://fileurl",
        "Dataset Hedline1",
        "Dataset Description1",
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
