const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  quantitySold: {
    type: Number,
  },
});

const Catagory = mongoose.model("Catagory", catagorySchema);

module.exports = Catagory;
