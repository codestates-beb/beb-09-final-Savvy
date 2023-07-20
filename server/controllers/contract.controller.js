module.exports = {
  contract: async (req, res) => {
    res.status(200).json({
      message: 'contract',
    });
  },
};
