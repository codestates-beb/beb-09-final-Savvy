const jose = require("jose");
const Admin = require("../models/admin.model");

module.exports = {
  login: async (req, res) => {
    const adminData = req.body;

    try {
      // passed from the frontend in the Authorization header
      const idToken = req.headers.authorization?.split(" ")[1];

      // Get the JWK set used to sign the JWT issued by Web3Auth
      const jwks = jose.createRemoteJWKSet(
        new URL("https://api.openlogin.com/jwks")
      );

      // Verify the JWT using Web3Auth's JWKS
      const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
        algorithms: ["ES256"],
      });

      // Checking `app_pub_key` against the decoded JWT wallet's public_key
      if (jwtDecoded.payload.wallets[0].public_key === adminData.appPubKey) {
        //if (true) {

        // Check if the user exists in the database
        const user = await Admin.findOne({ email: adminData.email });

        console.log(user);
        if (user) {
          res
            .status(200)
            .json({ message: "Verification successful and user exists" });
        } else {
          res
            .status(201)
            .json({ message: "Verification successful. Welcome, new user!" });
        }
      } else {
        res.status(400).json({ error: "Verification Failed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },
  signup: async (req, res) => {
    const adminData = req.body;
    try {
      const idToken = req.headers.authorization?.split(" ")[1];
      const jwks = jose.createRemoteJWKSet(
        new URL("https://api.openlogin.com/jwks")
      );
      const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
        algorithms: ["ES256"],
      });
      if (jwtDecoded.payload.wallets[0].public_key === adminData.appPubKey) {
        // Check if the user exists in the database
        const user = await Admin.findOne({ email: adminData.email });
        if (user) {
          return res
            .status(200)
            .json({ message: "Verification successful and user exists" });
        }
        const newUser = await Admin.create({
          address: adminData.address,
          ethBalance: adminData.balance.hex,
          chainId: adminData.chainId,
          email: adminData.email,
          name: adminData.name,
          profileImage: adminData.profileImage,
          appPubKey: adminData.appPubKey,
        });
        res
          .status(200)
          .json({ message: "Verification successful. Welcome, new user!" });
      } else {
        res.status(400).json({ error: "Verification Failed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },
};
