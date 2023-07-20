var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema(
  {
    address: String,
    ethBalance: String,
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: '_somethingElse' }
);

module.exports = mongoose.model('Admin', AdminSchema);
