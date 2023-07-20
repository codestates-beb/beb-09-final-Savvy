module.exports = {
  manager: async (req, res) => {
    res.status(200).json({
      message: 'manager',
    });
  },
};
