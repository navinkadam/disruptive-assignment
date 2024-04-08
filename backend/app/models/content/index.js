const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const contentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    _userId: { type: Mongoose.Types.ObjectId, ref: "User", required: true },
    _themeId: { type: Mongoose.Types.ObjectId, ref: "Themes", required: true },
    images: [],
    txtDoc: String,
    videoLinks: String,

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = contentSchema;
