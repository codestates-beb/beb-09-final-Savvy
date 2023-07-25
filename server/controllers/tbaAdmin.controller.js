const ethers = require('ethers');
const Tba = require('../models/tba.model');
const Community = require('../models/community.model');

const erc6551RegistryAbi = require('../abi/ERC6551Registry.json');

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

module.exports = {
  tbaAdmin: async (req, res) => {
    const nftContract = req.body.nftContract;

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

      events.forEach((event) => {
        if (event.args.tokenContract == nftContract) {
          TBAs.push(event.args.account);

          Tba.findOne({ address: event.args.account })
            .then((tba) => {
              if (tba) {
                console.log('TBA already exists');
                Tba.updateOne(
                  { address: event.args.account },
                  { $set: { owner: '', level: '', community_id: '' } }
                );
              } else {
                console.log('TBA does not exist');
                Tba.create({
                  address: event.args.account,
                  owner: '',
                  level: '',
                  community_id: '',
                });
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });

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
};
