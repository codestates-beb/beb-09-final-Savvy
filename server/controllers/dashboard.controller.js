const ethers = require("ethers");

const Community = require("../models/community.model");
const Tba = require("../models/tba.model");
const Item = require("../models/item.model");

require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

module.exports = {
  dashboard: async (req, res) => {
    const communityAddress = req.params.communityAddress;

    try {
      const community = await Community.findOne({ address: communityAddress });

      if (!community) {
        return res
          .status(400)
          .json({ error: "No community found for this community" });
      }

      const TBAs = await Tba.find({ community_id: community._id });
      //console.log(TBAs);

      if (TBAs.length === 0) {
        return res
          .status(404)
          .json({ error: "No TBAs found for this community" });
      }

      const items = await Item.find({ Tba_id: TBAs._id });

      if (items.length === 0) {
        return res.status(200).json({
          message: "Successfully fetched TBAs",
          community: community,
          TBAs: TBAs,
          items: [],
        });
      }

      return res.status(200).json({
        message: "Successfully fetched TBAs",
        community: community,
        TBAs: TBAs,
        items: items,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },
};
