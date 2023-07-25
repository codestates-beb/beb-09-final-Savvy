const Contract = require('../models/contract.model');
const Community = require('../models/community.model');

module.exports = {
  contract: async (req, res) => {
    const contractData = req.body;

    existedContract = await Contract.findOne({ address: contractData.contractAddress });
    try {
      if (existedContract) {
        console.log('Contract already exists');
        await Contract.updateOne(
          { address: contractData.contractAddress },
          {
            $set: {
              type: contractData.ercType,
              alias: contractData.contractName,
            },
          }
        );
        updatedContract = await Contract.findOne({
          address: contractData.contractAddress,
        });
        res.status(201).json({
          message: 'updated contract data',
          ContractData: updatedContract,
        });
      } else {
        console.log('Contract does not exist');

        const community = await Community.findOne({
          address: contractData.contractAddress,
        });

        const newContract = await Contract.create({
          address: contractData.contractAddress,
          type: contractData.ercType,
          alias: contractData.contractName,
          community_id: community._id,
        });
        res.status(200).json({
          message: 'created new contract data',
          ContractData: newContract,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getContract: async (req, res) => {
    try {
      const contracts = await Contract.find({});
      console.log(contracts);

      res.status(200).json({
        message: 'get contract',
        ContractData: contracts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getContractByAddress: async (req, res) => {
    const contractAddress = req.params.address;
    console.log(contractAddress);
    try {
      const contract = await Contract.findOne({ address: contractAddress });
      console.log(contract);

      if (contract) {
        res.status(200).json({
          message: 'get contract by address',
          ContractData: contract,
        });
      } else {
        res.status(404).json({
          message: 'No contracts found',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
