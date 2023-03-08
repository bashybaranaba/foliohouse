# Foliohouse

### Project Description
Foliohouse is a decentralized dataset repository that provides access control and a built-in token economy to incentivize the contribution of quality datasets and cover the cost of storage

#### Live Prototype
https://foliohouse-prototype.vercel.app/  (Smart contract deployed on Hyperspace testnet)

#### Project Background and Problem Statement
Datasets provide the foundation for data analysis, machine learning, and artificial intelligence. The availability and accessibility of high-quality datasets are crucial for research, development, and innovation. Without high-quality datasets, it would be impossible to train models to make predictions and to analyze and draw meaningful conclusions from the data around us. However, creating, storing, and maintaining high-quality datasets is a resource-intensive process, and there are inadequate incentives to make them accessible. This project leverages the Filecoion VM and IPFS Web3 storage to create a decentralized dataset repository that provides access control and a built-in token economy to incentivize contributions and cover the cost of storage.

### Key Features
- **Built-in Token Economy**: Dataset creators earn tokens each time their datasets are used which can be used to cover storage costs
- **Access contro**l: The platform gives dataset creators the ability to control who can view, access, load, and use their datasets
- **Dataset Loader**: A lightweight python library for interacting with datasets available on Foliohouse. It downloads and prepares datasets for inspection, evaluation, and training in a standard format. ~ more info at: https://github.com/bashybaranaba/foliohouse-datasetloader


### Key Technologies Used
- **Next js**: A popular open-source framework for building server-rendered React applications that enable developers to build highly performant and scalable web applications by providing a set of powerful features and optimizations out-of-the-box.
- **Filecoin VM**: A runtime environment for smart contracts on the Filecoin network that brings user programmability to Filecoin
- **Web3 Storage**: A service that stores data redundantly across multiple Filecoin miners and the public IPFS network, provides information about where the data is stored and retrieves data by CID.

## Usage
- One can create, upload and preview datasets on the web interface at https://foliohouse-prototype.vercel.app/ (One will be required to commect their metamask wallet on the hyperspace testnet)
- To access and use datasets on Foliohouse, use the dataset loader to load and interact with datasets in your ML/data science projects

### Accessing Foliohouse datasets using the dataset loader
#### Installation

```shell
pip install foliohouse
```
#### Functions

The main methods are:

`foliohouse.load_dataset(dataset_url)` : for instantiating a dataset

#### Quick example

```python
from foliohouse import load_dataset

dataset = load_dataset("https://dweb.link/ipfs/bafybeife7x5l2mzfsbkhfraltoj2obun6wh5n74mxm7hr22mah3pkxdhb4/dataset")
```

## Future Works
The overarching goal of the Foliohouse project is to advance and democratize machine learning and data science by leveraging blockchain to promote open science. The aim is to go beyond datasets and create tools and open protocols that govern the sharing of scientific papers, data, and the usage and ownership of machine learning models.

### License
- MIT


