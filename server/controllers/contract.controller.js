const mongoose = require('mongoose');

const Contract = require('../models/contract.model');
const Community = require('../models/community.model');

require('dotenv').config();

module.exports = {
  createContract: async (req, res) => {
    const contractData = req.body;

    existedContract = await Contract.findOne({ address: contractData.contractAddress });
    if (existedContract) {
      console.log('Contract already exists');
      return res.status(400).json({ error: 'Contract already exists' });
    }
    try {
      const community = await Community.findOne();

      if (!community) {
        console.log('Community does not exist');
        return res.status(404).json({ error: 'Community does not exist' });
      }

      const newContract = await Contract.create({
        address: contractData.contractAddress,
        type: contractData.ercType,
        alias: contractData.contractName,
        community_id: community._id,
      });

      res.status(200).json({
        message: 'created new contract data',
        ContractData: {
          id: newContract._id,
          ercType: newContract.type,
          contractAddress: newContract.address,
          contractName: newContract.alias,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  updateContract: async (req, res) => {
    const contractData = req.body;

    // _id가 ObjectId 형식인지 확인
    const contractId = mongoose.Types.ObjectId.isValid(contractData.id)
      ? contractData.id
      : null;

    updatedContract = await Contract.findOne({ _id: contractId });
    try {
      if (updatedContract) {
        console.log('Contract already exists');
        await Contract.updateOne(
          { _id: contractId },
          {
            $set: {
              address: contractData.contractAddress,
              type: contractData.ercType,
              alias: contractData.contractName,
            },
          }
        );

        updatedContract = await Contract.findOne({
          _id: contractData.id,
        });

        res.status(200).json({
          message: 'updated contract data',
          ContractData: {
            id: updatedContract._id,
            ercType: updatedContract.type,
            contractAddress: updatedContract.address,
            contractName: updatedContract.alias,
          },
        });
      } else {
        console.log('Contract does not exist');
        res.status(404).json({ message: 'Contract does not exist' });
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
      //console.log(contracts);

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
    const contractAddress = req.params.contractAddress;
    //console.log(contractAddress);
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
  deleteContract: async (req, res) => {
    const contractAddress = req.params.contractAddress;
    try {
      const contract = await Contract.findOne({ address: contractAddress });
      if (contract) {
        await Contract.deleteOne({ address: contractAddress });
        res.status(200).json({
          message: 'deleted contract',
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
