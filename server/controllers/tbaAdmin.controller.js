const jose = require('jose');
const { Alchemy, Network } = require('alchemy-sdk');

const Tba = require('../models/tba.model');
const Community = require('../models/community.model');
const Admin = require('../models/admin.model');
const Item = require('../models/item.model');
const tba_group = require('../models/tba_group.model');

// Item 가져오기 위한 alchemy 설정
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

module.exports = {
  getTbaByAddress: async (req, res) => {
    const communityAddress = req.params.communityAddress;

    try {
      const community = await Community.findOne({ address: communityAddress });

      if (!community) {
        return res.status(400).json({ error: 'No community found' });
      }

      const TBAs = await Tba.find({ community_id: community._id });

      if (TBAs.length === 0) {
        return res.status(404).json({ error: 'No TBAs found for this community' });
      }

      res.status(200).json({
        message: 'Successfully TBAs of communityAddress',
        TBAs: TBAs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getTbaDetail: async (req, res) => {
    const tbaId = req.params.tbaId;

    try {
      const tba = await Tba.findOne({ _id: tbaId });

      await Item.deleteMany({ Tba_id: tbaId });

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
        console.log('No NFTs found for owner');
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
        console.log('No ERC20 tokens found for owner');
      }
      //console.log(items);
      const updatedItems = await Item.find({ Tba_id: tbaId });

      if (tba) {
        res.status(200).json({
          message: 'Successfully fetched TBA details',
          TBA: tba,
          items: updatedItems,
        });
      } else {
        res.status(404).json({
          message: 'No TBA',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  createGroup: async (req, res) => {
    const { communityAddress, groupName, tbaIds } = req.body;

    try {
      const community = await Community.findOne({ address: communityAddress });
      if (!community) {
        return res.status(400).json({ error: 'No community found' });
      }

      const existingGroup = await tba_group.findOne({ name: groupName });
      if (existingGroup) {
        return res.status(400).json({ error: 'Group name already exists' });
      }

      const newGroup = await tba_group.create({
        name: groupName,
        Tba_id: tbaIds,
        community_id: community._id,
      });

      res.status(200).json({
        message: 'Successfully created TBA groups',
        id: newGroup._id,
        name: newGroup.name,
        tbaIds: newGroup.Tba_id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateGroup: async (req, res) => {
    const { id, groupName, tbaIds } = req.body;

    try {
      const existingGroup = await tba_group.findOne({ _id: id });
      if (!existingGroup) {
        return res.status(400).json({ error: 'Group does not exist' });
      }

      const updatedGroup = await tba_group.findOneAndUpdate(
        { _id: id },
        { name: groupName, Tba_id: tbaIds },
        { new: true }
      );

      res.status(200).json({
        message: 'Successfully updated TBA groups',
        id: updatedGroup._id,
        name: updatedGroup.name,
        tbaIds: updatedGroup.Tba_id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getGroupTBA: async (req, res) => {
    const groupId = req.params.groupId;

    try {
      const selectedGroup = await tba_group.findOne({ _id: groupId });
      console.log(selectedGroup);

      if (!selectedGroup) {
        return res.status(404).json({ error: 'No group found' });
      }

      const tbaIds = selectedGroup.Tba_id;

      const TBAs = await Tba.find({ _id: { $in: tbaIds } });
      //console.log(TBAs);

      if (TBAs.length === 0) {
        return res.status(404).json({ error: 'No TBAs found for this group' });
      }

      res.status(200).json({
        message: 'Successfully fetched TBAs of group',
        TBAs: TBAs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getAllGroups: async (req, res) => {
    const communityAddress = req.params.communityAddress;

    try {
      const community = await Community.findOne({ address: communityAddress });
      if (!community) {
        return res.status(400).json({ error: 'No community found' });
      }

      const groups = await tba_group.find({ community_id: community._id });
      //console.log(groups);
      if (groups.length === 0) {
        return res.status(404).json({ error: 'No groups found' });
      }

      const groupsWithTbas = await Promise.all(
        groups.map(async (group) => {
          const tbaIds = group.Tba_id;
          const TBAs = await Tba.find({ _id: { $in: tbaIds } });

          return {
            id: group._id,
            name: group.name,
            TBAs: TBAs,
          };
        })
      );

      res.status(200).json({
        message: 'Successfully fetched all groups',
        groups: groupsWithTbas,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  deleteGroup: async (req, res) => {
    const groupId = req.params.groupId;

    try {
      const deletedGroup = await tba_group.deleteMany({ _id: groupId });

      if (deletedGroup.deletedCount === 0) {
        return res.status(404).json({ error: 'No group found' });
      }

      res.status(200).json({
        message: 'Successfully deleted group',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
