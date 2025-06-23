const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  fullName: String,
  contact: String,
  flatNumber: String,
  totalRooms: Number,
  wing: String,
  ownership: { type: String, enum: ["owner", "renter"] },
  hasVehicle: Boolean,
  twoWheelers: Number,
  fourWheelers: Number,
});

module.exports = mongoose.model("Resident", residentSchema);
