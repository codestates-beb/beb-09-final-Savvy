const jose = require('jose');

const Contract = require('../models/contract.model');
const Community = require('../models/community.model');
const Admin = require('../models/admin.model');

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
      const community = await Community.findOne({
        address: contractData.communityAddress,
      });

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
          community_id: newContract.community_id,
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

    updatedContract = await Contract.findOne({ _id: contractData.id });
    try {
      if (updatedContract) {
        await Contract.updateOne(
          { _id: contractData.id },
          {
            $set: {
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
        res.status(404).json({ error: 'Contract does not exist' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getContract: async (req, res) => {
    const idToken = req.headers.authorization?.split(' ')[1];
    const jwks = jose.createRemoteJWKSet(new URL('https://api.openlogin.com/jwks'));

    try {
      const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
        algorithms: ['ES256'],
      });

      const adminEmail = jwtDecoded.payload.email;
      const admins = await Admin.findOne({ email: adminEmail });

      const community = await Community.find({ admin_id: admins._id });
      //console.log(community);
      const contracts = [];
      for (let i = 0; i < community.length; i++) {
        const contract = await Contract.find({ community_id: community[i]._id });
        contracts.push(...contract);
      }
      //console.log(contracts);

      res.status(200).json({
        message: 'get contract',
        ContractData: contracts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getContractByAddress: async (req, res) => {
    const contractAddress = req.params.contractAddress;
    //console.log(contractAddress);
    try {
      const contract = await Contract.findOne({ address: contractAddress });
      //console.log(contract);

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
          error: 'No contracts found',
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
