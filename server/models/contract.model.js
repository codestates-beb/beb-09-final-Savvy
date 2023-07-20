var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContractSchema = new Schema(
  {
    address: String,
    type: String,
    alias: String,
    createdAt: { type: Date, default: Date.now },
    community_id: {
      // community의 id
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Community'
      type: String,
    },
  },
  { versionKey: '_somethingElse' }
);

module.exports = mongoose.model('Contract', ContractSchema);
