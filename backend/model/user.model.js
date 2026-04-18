const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
    unique: true,   // vendor must register with their own email
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,   // vendor must register with their own phone
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    imageId: { type: String, default: "1222131323" },
  },
  shopName: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
  },
  addresses: [
    {
      pincode: Number,
      city: String,
      state: String,
      country: String,
      addressLine: String,
      landmark: String,
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
