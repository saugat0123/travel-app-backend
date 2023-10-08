const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "Enter name"],
  },
  itemType: {
    type: String,
    required: [true, "Enter type"],
  },

  itemPrice: {
    type: String,
    required: [true, "Enter price"],
  },
  itemDes: {
    type: String,
    required: [true, "Enter description"],
  },

  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
