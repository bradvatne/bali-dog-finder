const mongoose = require("mongoose");

const MarkerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      maxlength: 10,
      required: true
    },
    dogname: {
      type: String,
      maxlength: 20,
      required: true
    },
    description: {
      type: String,
      maxlength: 200,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    long: {
      type: Number,
      required: true
    },
    imageurl: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    gender: {
      type: Boolean,
      required: true
    },
    medication: {
      type: Boolean
    },
    size: {
      type: String
    },
    vaccinated: {
      type: Boolean
    },
    sterilized: {
      type: Boolean,
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Marker || mongoose.model("Marker", MarkerSchema);
