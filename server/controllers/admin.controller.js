const jose = require('jose');
const Admin = require('../models/admin.model');
const Community = require('../models/community.model');

module.exports = {
  login: async (req, res) => {
    const adminData = req.body;
    console.log(req.headers.authorization);

    try {
      // passed from the frontend in the Authorization header
      const idToken = req.headers.authorization?.split(' ')[1];

      // Get the JWK set used to sign the JWT issued by Web3Auth
      const jwks = jose.createRemoteJWKSet(new URL('https://api.openlogin.com/jwks'));

      // Verify the JWT using Web3Auth's JWKS
      const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
        algorithms: ['ES256'],
      });

      // Checking `app_pub_key` against the decoded JWT wallet's public_key
      if (jwtDecoded.payload.wallets[0].public_key === adminData.appPubKey) {
        //if (true) {

        // Check if the user exists in the database
        const user = await Admin.findOne({ email: adminData.email });

        if (user) {
          console.log('user exists');
          return res
            .status(200)
            .json({ message: 'Verification successful and user exists' });
        } else {
          console.log('user does not exist');
          const newUser = await Admin.create({
            address: adminData.address,
            ethBalance: adminData.balance.hex,
            chainId: adminData.chainId,
            email: adminData.email,
            name: adminData.name,
            profileImage: adminData.profileImage,
            appPubKey: adminData.appPubKey,
            plan: 'free',
          });
          return res
            .status(201)
            .json({ message: 'Verification successful. Welcome, new user!' });
        }
      }

      res.status(400).json({ error: 'Verification Failed' });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
  getCommunity: async (req, res) => {
    try {
      const idToken = req.headers.authorization?.split(' ')[1];
      const jwks = jose.createRemoteJWKSet(new URL('https://api.openlogin.com/jwks'));
      const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
        algorithms: ['ES256'],
      });

      const adminEmail = jwtDecoded.payload.email;

      const admin = await Admin.findOne({ email: adminEmail });

      const community = await Community.find({ admin_id: admin._id });

      if (!community || community.length === 0) {
        return res.status(404).json({
          error: 'Community does not exist',
        });
      }

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
