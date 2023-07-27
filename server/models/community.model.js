var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommunitySchema = new Schema(
  {
    address: String,
    type: String,
    alias: String,
    admin_id: {
      // admin의 id
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Admin'
      type: String,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: '_somethingElse' }
);

module.exports = mongoose.model('Community', CommunitySchema);
