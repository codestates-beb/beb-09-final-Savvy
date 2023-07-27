const Tba = require('../models/tba.model');
const Community = require('../models/community.model');
const Item = require('../models/item.model');
const tba_group = require('../models/tba_group.model');

module.exports = {
  getTbaByAddress: async (req, res) => {
    const communityAddress = req.params.communityAddress;

    try {
      const community = await Community.findOne({ address: communityAddress });

      if (!community) {
        return res.status(400).json({ error: 'No community found for this community' });
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
      console.log(tba);

      const items = await Item.find({ Tba_id: tbaId });
      console.log(items);

      if (tba) {
        res.status(200).json({
          message: 'Successfully fetched TBA details',
          TBA: tba,
          items: items,
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
    const { groupName, tbaIds } = req.body;

    try {
      const existingGroup = await tba_group.findOne({ name: groupName });
      if (existingGroup) {
        return res.status(400).json({ error: 'Group name already exists' });
      }

      tbaIds.forEach(async (tbaId) => {
        const tba = await Tba.findById(tbaId);
        if (tba) {
          const newGroup = await tba_group.create({
            name: groupName,
            Tba_id: tba._id,
          });
        }
      });

      res.status(200).json({
        message: 'Successfully created TBA groups',
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getGroupTBA: async (req, res) => {
    const groupName = req.params.groupName;

    try {
      const createdGroup = await tba_group.find({ name: groupName });

      if (createdGroup.length === 0) {
        return res.status(404).json({ error: 'No group found' });
      }

      const tbaIds = createdGroup.map((group) => group.Tba_id);

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
};
