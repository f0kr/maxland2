const mongoose = require("mongoose");
const slugify = require("slugify");
const { trim } = require("validator");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An item must have a name"],
    trim: true,
  },
  slug: String,
  price: {
    type: Number,
    // required: [true, "An item must have a price"],
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    // required: [true, "Each item should have an image "],
    default: "default.jpg",
  },
  category: {
    type: String,
    trim: true,
  },
  soldOut: {
    type: Boolean,
    default: false,
  },
});

itemSchema.index({ catagory: 1 });
itemSchema.index({ slug: 1 });

itemSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
itemSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true });
  }
  next();
});
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
