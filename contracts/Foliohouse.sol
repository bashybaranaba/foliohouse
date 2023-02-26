// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Foliohouse  {
    using Counters for Counters.Counter;
    Counters.Counter private datasetIds;

    uint256 public constant GB = 1024 * 1024 * 1024; // 1GB in bytes
    uint256 public constant FREE_STORAGE_LIMIT = GB; // 1GB
    uint256 public constant STORAGE_PRICE_PER_BYTE = 1 wei; // price per byte for storage
    
    mapping (address => uint256) public balances; // balances of users
    mapping(address => uint) public usedStorage; //Storage consumed by users

    struct Dataset {
        uint256 id;
        address creator;
        uint256 size;
        string name;
        string fileUrl;
        string metaData;
        uint256 accessCount;
        uint256 tokensEarned;
        bool isPrivate;  
    }

    Dataset[] public datasets;

     
    event DatasetCreated(uint256 indexed id, address indexed creator, uint256 size);
    event DatasetAccessed(uint256 indexed id, address indexed user, uint256 tokensEarned);
    event DatasetAllowed(uint256 indexed id, address indexed user);
    event DatasetRemoved(uint256 indexed id, address indexed remover);
    
    // create a new dataset
    function createDataset( uint256 size, string memory name, string memory fileUrl, string memory metaData, bool isPrivate) external {
        uint256 id = datasetIds.current();
        datasetIds.increment();
        usedStorage[msg.sender]+=size;
        if(usedStorage[msg.sender] > FREE_STORAGE_LIMIT){
            uint storageCost = size * STORAGE_PRICE_PER_BYTE; 
            require(balances[msg.sender] >= storageCost, "Free storage limit exceeded");
            balances[msg.sender] -= storageCost; // User is charged for storage exceeding free storage limit
            datasets.push(Dataset(id, msg.sender, size, name, fileUrl, metaData, 0, 0, isPrivate));
            emit DatasetCreated(id, msg.sender, size);
        }
        datasets.push(Dataset(id, msg.sender, size, name, fileUrl, metaData, 0, 0, isPrivate));
        emit DatasetCreated(id, msg.sender, size);
    }
    
    // remove a dataset from the repository
    function removeDataset(uint256 id) external {
        require(msg.sender == datasets[id].creator, "Not dataset creator");
        delete datasets[id];
        emit DatasetRemoved(id, msg.sender);
    }
    
    //access a dataset and earn tokens for the creator
    function accessDataset(string memory fileUrl) external {
        for (uint256 i = 0; i < datasets.length; i++) {
            if (keccak256(bytes(datasets[i].fileUrl)) == keccak256(bytes(fileUrl))) {
                Dataset storage dataset = datasets[i];
                require(dataset.creator != address(0), "Dataset does not exist");
                uint256 tokensEarned = 1;
                if (dataset.isPrivate){
                    dataset.accessCount +=1;
                    dataset.tokensEarned += tokensEarned;
                    balances[dataset.creator] += tokensEarned; // reward dataset creator
                    emit DatasetAccessed(i, msg.sender, tokensEarned);
                }
                dataset.accessCount +=1;
                dataset.tokensEarned += tokensEarned;
                balances[dataset.creator] += tokensEarned; // reward dataset creator
                emit DatasetAccessed(i, msg.sender, tokensEarned);
            }
        }
                
    }

    function getAllDatasets() public view returns (Dataset[] memory) {
        return datasets;
    }

    function getPublicDatasets() public view returns (Dataset[] memory) {
        uint256 publicDatasetCount = 0;
        for (uint256 i = 0; i < datasets.length; i++) {
            if (!datasets[i].isPrivate) {
                publicDatasetCount++;
            }
        }
        Dataset[] memory publicDatasets = new Dataset[](publicDatasetCount);
        uint256 j = 0;
        for (uint256 i = 0; i < datasets.length; i++) {
            if (!datasets[i].isPrivate) {
                publicDatasets[j] = datasets[i];
                j++;
            }
        }
        return publicDatasets;
    }

    function getOwnedDatasets() public view returns (Dataset[] memory) {
        uint256 creatorDatasetCount = 0;
        for (uint256 i = 0; i < datasets.length; i++) {
            if (datasets[i].creator == msg.sender) {
                creatorDatasetCount++;
            }
        }
        Dataset[] memory creatorDatasets = new Dataset[](creatorDatasetCount);
        uint256 j = 0;
        for (uint256 i = 0; i < datasets.length; i++) {
            if (datasets[i].creator == msg.sender) {
                creatorDatasets[j] = datasets[i];
                j++;
            }
        }
        return creatorDatasets;
    }

    function getPublicDatasetsByCreator(address creator) public view returns (Dataset[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < datasets.length; i++) {
            Dataset memory dataset = datasets[i];
            if (dataset.creator == creator && !dataset.isPrivate) {
                count++;
            }
        }
        Dataset[] memory result = new Dataset[](count);
        count = 0;
        for (uint256 i = 0; i < datasets.length; i++) {
            Dataset memory dataset = datasets[i];
            if (dataset.creator == creator && !dataset.isPrivate) {
                result[count] = dataset;
                count++;
            }
        }

        return result;
    }

    function getDatasetById(uint id) public view returns (Dataset memory) {
         require(id < datasets.length, "Invalid dataset ID");
        return datasets[id];
    }

    function getMyTokens() public view returns (uint256) {
        return balances[msg.sender];
    }

    function getMyusedStorage() public view returns (uint256) {
        return usedStorage[msg.sender];
    }

}