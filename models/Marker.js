const mongoose = require("mongoose");

const MarkerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    dogname: {
      type: String,
    },
    description: {
      type: String,
    },
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
    imageurl: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Marker || mongoose.model("Marker", MarkerSchema);
