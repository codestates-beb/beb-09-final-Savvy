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

      const newGroup = await tba_group.create({
        name: groupName,
        Tba_id: tbaIds,
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
    try {
      const groups = await tba_group.find();

      if (groups.length === 0) {
        return res.status(404).json({ error: 'No groups found' });
      }

      res.status(200).json({
        message: 'Successfully fetched all groups',
        groups: groups,
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
