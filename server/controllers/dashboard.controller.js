module.exports = {
  dashboard: async (req, res) => {
    res.status(200).json({
      message: 'dashboard',
    });
  },
};
