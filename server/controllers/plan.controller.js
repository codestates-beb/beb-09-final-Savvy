const Admin = require('../models/admin.model');

module.exports = {
  updatePlan: async (req, res) => {
    const { adminEmail, plan } = req.body;

    try {
      const admin = await Admin.findOne({ email: adminEmail });

      if (!admin) {
        return res.status(400).json({ error: 'No admin found' });
      }

      await Admin.updateOne({ email: adminEmail }, { plan: plan });

      res.status(200).json({
        message: 'Successfully updated plan',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  },
};
