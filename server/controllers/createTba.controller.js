const ethers = require('ethers');

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

module.exports = {
  createTba: async (req, res) => {
    try {
      const txHash = req.body.txHash;

      //const tx = await provider.getTransaction(txHash);
      const receipt = await provider.waitForTransaction(txHash);
      //console.log(receipt);

      if (receipt && receipt.status == 1) {
        res.status(200).json({
          message: 'Successfully created TBA',
        });
      } else {
        res.status(400).json({
          error: 'Failed to create TBA',
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
