const ethers = require('ethers');
const Tba = require('../models/tba.model');
const Community = require('../models/community.model');

const erc6551RegistryAbi = require('../abi/ERC6551Registry.json');

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

module.exports = {
  getTbaByAddress: async (req, res) => {
    const nftContract = req.params.nftContract;

    try {
      const ERC6551RegistryAddress = process.env.ERC6551REGISTRY;

      const contract = new ethers.Contract(
        ERC6551RegistryAddress,
        erc6551RegistryAbi,
        provider
      );

      const TBAs = [];
      const filter = contract.filters.AccountCreated();

      const fromBlock = 1;
      const toBlock = 'latest';

      const events = await contract.queryFilter(filter, fromBlock, toBlock);

      await Promise.all(
        events.map(async (event) => {
          if (event.args.tokenContract == nftContract) {
            TBAs.push(event.args.account);

            const tba = await Tba.findOne({ address: event.args.account });
            if (tba) {
              console.log('TBA already exists');
              Tba.updateOne(
                { address: event.args.account },
                { $set: { owner: '', level: '' } }
              );
            } else {
              console.log('TBA does not exist');
              const community = await Community.findOne({ address: nftContract });
              console.log(community);
              Tba.create({
                address: event.args.account,
                owner: '',
                level: '',
                community_id: community._id,
              });
            }
          }
        })
      );

      if (TBAs.length == 0) {
        res.status(404).json({
          error: 'No TBAs found for nftContract',
          TBAs: TBAs,
        });
      } else {
        res.status(200).json({
          message: 'Successfully fetched TBAs of nftContract',
          TBAs: TBAs,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getTbaDetail: async (req, res) => {
		const tba = req.params.tba;
		
	},
};
