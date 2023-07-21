module.exports = {
  login: async (req, res) => {
    console.log(req.body);

    try {
      res.status(200).json({
        message: 'user',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Failed to login',
      });
    }
  },
};
