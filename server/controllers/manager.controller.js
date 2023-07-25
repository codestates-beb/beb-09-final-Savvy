const Community = require('../models/community.model');
const Admin = require('../models/admin.model');
const Tba = require('../models/tba.model');

const adminEmail = 'sjlee80@gmail.com'; //test

module.exports = {
  community: async (req, res) => {
    const communityData = req.body;
    console.log(communityData);

    existedCommunity = await Community.findOne({
      address: communityData.address,
    });
    try {
      if (existedCommunity) {
        console.log('Community already exists');
        await Community.updateOne(
          { address: communityData.address },
          {
            $set: {
              type: communityData.type,
              alias: communityData.alias,
            },
          }
        );
        updatedCommunity = await Community.findOne({
          address: communityData.address,
        });
        res.status(201).json({
          message: 'updated community data',
          CommunityData: updatedCommunity,
        });
      } else {
        console.log('Community does not exist');
        const admin = await Admin.findOne({ email: communityData.email });

        const newCommunity = await Community.create({
          address: communityData.address,
          type: communityData.type,
          alias: communityData.alias,
          admin_id: admin._id,
        });
        res.status(200).json({
          message: 'created new community data',
          CommunityData: newCommunity,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getManager: async (req, res) => {
    try {
      const admins = await Admin.find({ email: adminEmail });
      const communities = await Community.find({ admin_id: admins[0]._id });

      let tba = [];
      if (communities.length) {
        tba = await Tba.find({ community_id: communities[0]._id });
      }

      res.status(200).json({
        message: 'get manager data',
        admin: admins,
        communities: communities,
        tba: tba,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getCommunity: async (req, res) => {
    const communityAddress = req.params.communityAddress;

    try {
      const community = await Community.findOne({ address: communityAddress });
      res.status(200).json({
        message: 'get community data',
        community: community,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
