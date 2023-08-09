const ethers = require('ethers');
const { Alchemy, Network } = require('alchemy-sdk');

const Community = require('../models/community.model');
const Tba = require('../models/tba.model');
const Item = require('../models/item.model');

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

// Item 가져오기 위한 alchemy 설정
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

module.exports = {
  dashboard: async (req, res) => {
    const communityAddress = req.params.communityAddress;

    try {
      const community = await Community.findOne({ address: communityAddress });

      if (!community) {
        return res.status(400).json({ error: 'No community found for this community' });
      }

      let TBAs = [];
      TBAs = await Tba.find({ community_id: community._id });
      //console.log(TBAs);

      if (TBAs.length > 0) {
        for (const tba of TBAs) {
          const items = await Item.deleteMany({ Tba_id: tba._id });

          const nfts = await alchemy.nft.getNftsForOwner(tba.address);

          if (nfts.ownedNfts.length > 0) {
            for (const nft of nfts.ownedNfts) {
              const newItem = await Item.create({
                type: nft.tokenType,
                address: nft.contract.address,
                tokenId: nft.tokenId,
                tokenAmount: '',
                Tba_id: tba._id,
              });
              //console.log(newItem);
            }
          } else {
            //console.log('No NFTs found for owner');
          }

          const erc20Tokens = await alchemy.core.getTokensForOwner(tba.address);
          if (erc20Tokens.tokens.length > 0) {
            for (const token of erc20Tokens.tokens) {
              const newItem = await Item.create({
                type: 'ERC20',
                address: token.contractAddress,
                tokenId: '',
                tokenAmount: token.balance,
                Tba_id: tba._id,
              });
            }
          } else {
            //console.log('No ERC20 tokens found for owner');
          }
        }
      }

      let updatedItems = [];
      for (const tba of TBAs) {
        const items = await Item.find({ Tba_id: tba._id });
        updatedItems = updatedItems.concat(items);
      }

      return res.status(200).json({
        message: 'Successfully fetched TBAs',
        community: community,
        TBAs: TBAs,
        items: updatedItems,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
