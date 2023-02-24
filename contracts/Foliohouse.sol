// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Foliohouse is ERC20 {
    
    uint256 public constant GB = 1024 * 1024 * 1024; // 1GB in bytes
    uint256 public constant FREE_STORAGE_LIMIT = GB; // 1GB
    uint256 public constant STORAGE_PRICE_PER_BYTE = 1 wei; // price per byte for storage
    
    mapping (uint256 => Dataset) public datasets; // datasets in the repository
    
    struct Dataset {
        address creator;
        uint256 size;
        string name;
        string fileUrl;
        string headline;
        string description;
        uint256 accessCount;
        uint256 tokensEarned;
        bool isPrivate;  
    }

    Dataset[] public createdDatasets;
    
    event DatasetCreated(uint256 indexed id, address indexed creator, uint256 size);
    event DatasetAccessed(uint256 indexed id, address indexed user, uint256 tokensEarned);
    event DatasetAllowed(uint256 indexed id, address indexed user);
    event DatasetRemoved(uint256 indexed id, address indexed remover);
    
    constructor() ERC20("Dataset Token", "DT") {}
    
    // create a new dataset
    function createDataset(uint256 id, uint256 size, string memory name, string memory fileUrl,string memory headline, string memory description, bool isPrivate) external {
        require(size <= FREE_STORAGE_LIMIT, "Exceeded free storage limit");
        require(datasets[id].creator == address(0), "Dataset already exists");
        _mint(msg.sender, size * STORAGE_PRICE_PER_BYTE); // mint tokens to pay for storage
        createdDatasets.push(Dataset(msg.sender, size, name, fileUrl, headline, description, 0, 0, isPrivate));
        emit DatasetCreated(id, msg.sender, size);
    }
    

    // remove a dataset from the repository
    function removeDataset(uint256 id) external {
        require(msg.sender == datasets[id].creator, "Not dataset creator");
        delete datasets[id];
        emit DatasetRemoved(id, msg.sender);
    }
    
    // access a dataset and earn tokens for the creator
    function accessDataset(uint256 id) external {
        Dataset storage dataset = datasets[id];
        require(dataset.creator != address(0), "Dataset does not exist");
        uint256 tokensEarned = 1;
        if (dataset.isPrivate){
            dataset.accessCount +=1;
            dataset.tokensEarned += tokensEarned;
            _transfer(address(this), dataset.creator, tokensEarned); // transfer tokens to dataset creator
            emit DatasetAccessed(id, msg.sender, tokensEarned);
        }
        dataset.accessCount +=1;
        dataset.tokensEarned += tokensEarned;
        _transfer(address(this), dataset.creator, tokensEarned); // transfer tokens to dataset creator
        emit DatasetAccessed(id, msg.sender, tokensEarned);
    }

    function getAllDatasets() public view returns (Dataset[] memory) {
        return createdDatasets;
    }

    function getPublicDatasets() public view returns (Dataset[] memory) {
        uint256 publicDatasetCount = 0;
        for (uint256 i = 0; i < createdDatasets.length; i++) {
            if (!createdDatasets[i].isPrivate) {
                publicDatasetCount++;
            }
        }
        Dataset[] memory publicDatasets = new Dataset[](publicDatasetCount);
        uint256 j = 0;
        for (uint256 i = 0; i < createdDatasets.length; i++) {
            if (!createdDatasets[i].isPrivate) {
                publicDatasets[j] = createdDatasets[i];
                j++;
            }
        }
        return publicDatasets;
    }

    function getDatasetsByCreator(address creator) public view returns (Dataset[] memory) {
        uint256 creatorDatasetCount = 0;
        for (uint256 i = 0; i < createdDatasets.length; i++) {
            if (createdDatasets[i].creator == creator) {
                creatorDatasetCount++;
            }
        }
        Dataset[] memory creatorDatasets = new Dataset[](creatorDatasetCount);
        uint256 j = 0;
        for (uint256 i = 0; i < createdDatasets.length; i++) {
            if (createdDatasets[i].creator == creator) {
                creatorDatasets[j] = createdDatasets[i];
                j++;
            }
        }
        return creatorDatasets;
    }

}