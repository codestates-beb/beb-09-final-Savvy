const jose = require('jose');
const ethers = require('ethers');

const Community = require('../models/community.model');
const Admin = require('../models/admin.model');
const Tba = require('../models/tba.model');
const Item = require('../models/item.model');
const Contract = require('../models/contract.model');
const Tba_group = require('../models/tba_group.model');

const erc6551RegistryAbi = require('../abi/ERC6551Registry.json');
const accountAbi = require('../abi/Account.json');
const nftContractAbi = require('../abi/NftContract.json');

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

// ERC6551Registry TBA 가져오기
const ERC6551RegistryAddress = process.env.ERC6551REGISTRY;

const erc6551Contract = new ethers.Contract(
  ERC6551RegistryAddress,
  erc6551RegistryAbi,
  provider
);

module.exports = {
  createCommunity: async (req, res) => {
    const communityData = req.body;

    const idToken = req.headers.authorization?.split(' ')[1];
    const jwks = jose.createRemoteJWKSet(new URL('https://api.openlogin.com/jwks'));
    const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ['ES256'] });

    const adminEmail = jwtDecoded.payload.email;

    existedCommunity = await Community.findOne({
      address: communityData.address,
    });

    try {
      if (existedCommunity) {
        res.status(404).json({
          message: 'Community already exists',
        });
      } else {
        console.log('Community does not exist');
        const admin = await Admin.findOne({ email: adminEmail });

        const newCommunity = await Community.create({
          address: communityData.address,
          type: communityData.type,
          alias: communityData.communityName,
          admin_id: admin._id,
        });

        const TBAs = [];
        const filter = erc6551Contract.filters.AccountCreated();

        //const latestBlockNumber = await provider.getBlockNumber();
        const fromBlock = 1;
        const toBlock = 'latest';

        const events = await erc6551Contract.queryFilter(filter, fromBlock, toBlock);

        events.forEach(async (event) => {
          if (newCommunity.address === event.args.tokenContract) {
            const accountContract = new ethers.Contract(
              event.args.account,
              accountAbi,
              provider
            );

            const token = await accountContract.token();
            const ethBalanceWei = await provider.getBalance(event.args.account);
            const ethBalance = ethers.utils.formatEther(ethBalanceWei);

            let owner = null;
            try {
              owner = await accountContract.owner();
            } catch (error) {
              console.log('Error occurred while getting owner');
            }

            const nftContract = new ethers.Contract(
              newCommunity.address,
              nftContractAbi,
              provider
            );

            let tokenURI = null;
            try {
              tokenURI = await nftContract.tokenURI(token.tokenId);
            } catch (error) {
              console.log('Error occurred while getting tokenURI');
            }
            if (owner !== null && tokenURI !== null) {
              const newTba = await Tba.create({
                address: event.args.account,
                owner: owner,
                level: '0',
                ethBalance: ethBalance,
                tokenURI: tokenURI,
                community_id: newCommunity._id,
              });
              const newItem = await Item.create({
                type: '',
                address: newCommunity.address,
                tokenId: token.tokenId,
                tokenAmount: '',
                Tba_id: newTba._id,
              });
            }
          }
        });

        res.status(200).json({
          message: 'created new community data',
          CommunityData: {
            id: newCommunity._id,
            type: newCommunity.type,
            communityAddress: newCommunity.address,
            communityName: newCommunity.alias,
            createAt: newCommunity.createdAt,
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  updateCommunity: async (req, res) => {
    const communityData = req.body;

    try {
      //const community = await Community.findOne({ _id: communityData.id });
      const community = await Community.findById(communityData.id);
      if (community) {
        await Community.findOneAndUpdate(
          { _id: communityData.id },
          {
            $set: {
              type: communityData.type,
              alias: communityData.communityName,
            },
          },
          { new: true }
        );

        const updatedCommunity = await Community.findById(communityData.id);

        res.status(200).json({
          message: 'updated community data',
          CommunityData: {
            id: updatedCommunity._id,
            type: updatedCommunity.type,
            communityAddress: updatedCommunity.address,
            communityName: updatedCommunity.alias,
            createAt: updatedCommunity.createdAt,
          },
        });
      } else {
        res.status(404).json({
          message: 'Community does not exist',
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
    const idToken = req.headers.authorization?.split(' ')[1];
    const jwks = jose.createRemoteJWKSet(new URL('https://api.openlogin.com/jwks'));
    const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ['ES256'] });

    const adminEmail = jwtDecoded.payload.email;

    try {
      // admin ETH balance update
      const admins = await Admin.findOne({ email: adminEmail });

      const ethBalanceWei = await provider.getBalance(admins.address);
      const ethBalance = ethers.utils.formatEther(ethBalanceWei);

      const updatedAdmin = await Admin.findOneAndUpdate(
        { email: adminEmail },
        {
          $set: {
            ethBalance: ethBalance,
          },
        },
        { new: true }
      );

      const communities = await Community.find({ admin_id: updatedAdmin._id });

      let tba = [];
      if (communities) {
        tba = await Tba.find({ community_id: communities[0]._id });
      }

      res.status(200).json({
        message: 'get manager data',
        admin: updatedAdmin,
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

      let tba = [];
      if (community) {
        tba = await Tba.find({ community_id: community._id });
      }

      res.status(200).json({
        message: 'get community data',
        community: community,
        tba: tba,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  deleteCommunity: async (req, res) => {
    const communityAddress = req.params.communityAddress;

    try {
      const community = await Community.findOne({ address: communityAddress });

      if (community) {
        const tba = await Tba.find({ community_id: community._id });

        // Delete all items associated with the Tba
        for (let i = 0; i < tba.length; i++) {
          const items = await Item.find({ Tba_id: tba[i]._id });
          for (let j = 0; j < items.length; j++) {
            await Item.findByIdAndDelete(items[j]._id);
          }
        }

        // Delete all TabGroup associated with the Tba
        await Tba_group.deleteMany({ Tba_id: { $in: tba.map((t) => t._id) } });

        // Delete all Tba associated with the Community
        await Tba.deleteMany({ community_id: community._id });

        // Delete all contract associated with the Community
        await Contract.deleteMany({ community_id: community._id });

        // Delete the Community
        await Community.findOneAndDelete({ address: communityAddress });

        res.status(200).json({
          message: 'Successfully deleted Community and tba, tba_group, and Items',
        });
      } else {
        res.status(404).json({
          error: 'Community not found',
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
