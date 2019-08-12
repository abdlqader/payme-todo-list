const mongoose = require("mongoose");

// this will be our data base's data structure 
const DataSchema = mongoose.Schema(
  {
    title: String,
    desc: String
  }
);
module.exports = mongoose.model("Data", DataSchema);