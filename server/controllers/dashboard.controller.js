const ethers = require('ethers');
const erc6551RegistryAbi = require('../abi/ERC6551Registry.json');

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

module.exports = {
  dashboard: async (req, res) => {
    try {
      const ERC6551RegistryAddress = process.env.ERC6551REGISTRY;

      const contract = new ethers.Contract(
        ERC6551RegistryAddress,
        erc6551RegistryAbi,
        provider
      );

      const TBAs = [];
      const filter = contract.filters.AccountCreated();

      //const latestBlockNumber = await provider.getBlockNumber();
      const fromBlock = 3950718;
      const toBlock = 'latest';

      const events = await contract.queryFilter(filter, fromBlock, toBlock);

      events.forEach((event) => {
        TBAs.push(event.args.account);
      });

      res.status(200).json({
        message: 'Successfully fetched TBAs',
        TBAs: TBAs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
