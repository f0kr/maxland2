const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  purchases: [
    {
      items: [
        {
          item: {
            type: mongoose.Schema.ObjectId,
            ref: "Item",
          },
          quantity: {
            type: Number,
          },
        },
      ],
      totalPrice: {
        type: Number,
      },
      purchaseDate: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
