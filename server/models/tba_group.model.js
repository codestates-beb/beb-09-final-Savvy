var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tba_groupSchema = new Schema({
  name: String,
  Tba_id: {
    // tba의 id
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Tba'
    type: [String],
  },
  community_id: {
    type: String,
  },
});

module.exports = mongoose.model('Tba_group', Tba_groupSchema);
