const { ethers } = require('ethers');
const { TokenboundClient } = require('@tokenbound/sdk');

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

module.exports = {
  createTba: async (req, res) => {
    const { nftContract, tokenId } = req.body;
    console.log(nftContract, tokenId);

    try {
      const ServerPrivateKey = process.env.SERVER_PRIVATE_KEY;
      const ServerWallet = new ethers.Wallet(ServerPrivateKey, provider);

      const tokenboundClient = new TokenboundClient({
        signer: ServerWallet,
        chainId: 11155111,
      });

      const tokenBoundAccount = tokenboundClient.getAccount({
        tokenContract: nftContract,
        tokenId: tokenId,
      });

      const tba = await tokenboundClient.createAccount({
        tokenContract: nftContract,
        tokenId: tokenId,
      });

      console.log(tba);

      res.status(200).json({
        message: 'Successfully created TBA',
        TBA: tokenBoundAccount,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Failed to create TBA',
      });
    }
  },
};
