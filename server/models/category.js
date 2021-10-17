const mongoose = require("mongoose");
// const {ObjectId} = mongoose.Schema

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Naziv za kategoriju je obavezan!",
      minlength: [2, "Naziv kategorije mora sadrzavati minimalno 3 karaktera!"],
      maxlength: [32, "Naziv kategorije ne moze imati vise od 32 karaktera!"],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
