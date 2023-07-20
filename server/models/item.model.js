var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema(
  {
    type: String,
    address: String,
    tokenId: String,
    tokenAmount: String,
    Tba_id: {
      // tba의 id
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Tba'
      type: String,
    },
  },
  { versionKey: '_somethingElse' }
);

module.exports = mongoose.model('Item', ItemSchema);
