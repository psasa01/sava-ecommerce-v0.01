const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 48,
      text: true
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true
    },
    brand: {
      type: String,
      trim: true,
      required: true,
      maxlength: 16,
      text: true
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      text: true
    },
    price: {
      type: Number,
      required: true,
      trim: true
    },
    discount: {
      type: Number,
      required: true,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category"
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub"
      }
    ],
    quantity: Number,
    images: {
      type: Array
    },
    // shipping: {
    //   type: String,
    //   enum: ["Dostava", "Preuzimanje"],
    // },
    width: {
      type: String,
      trim: true,
      required: true,
      maxlength: 3,
      text: true
    },
    height: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2,
      text: true
    },
    rim: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2,
      text: true
    },
    speedindex: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1,
      text: true
    },
    loadindex: {
      type: String,
      trim: true,
      required: true,
      maxlength: 8,
      text: true
    },
    dot: {
      type: String,
      trim: true,
      required: true,
      minlength: 4,
      maxlength: 4
    },
    producedin: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    fuel: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1,
      text: true
    },
    wetGrip: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1,
      text: true
    },
    noise: {
      type: String,
      trim: true,
      required: true,
      maxlength: 3,
      text: true
    },
    posebnaPonuda: {
      type: Boolean
    },
    // ratings: [
    //     {
    //         star: Number,
    //         postedBy: {type: ObjectId, ref: 'User'}
    //     }
    // ],
    fullTitle: {
      type: String,
      trim: true,
      required: true,
      text: true
    },
    sifra: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      text: true
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
