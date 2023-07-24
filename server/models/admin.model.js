var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    address: String,
    ethBalance: String,
    chainId: Number,
    email: String,
    name: String,
    profileImage: String,
    appPubKey: String,
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: '_somethingElse' }
);

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
