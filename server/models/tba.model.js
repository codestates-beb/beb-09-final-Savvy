var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TbaSchema = new Schema({
  address: String,
  owner: String,
  level: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  community_id: {
    // community의 id
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Community'
    type: String,
  },
});

module.exports = mongoose.model('Tba', TbaSchema);
