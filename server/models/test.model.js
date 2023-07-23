var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TestSchema = new Schema(
  {
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("Test", TestSchema);
