const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const { themeAccessType } = require("../../../config");

const themesSchema = new Schema(
  {
    themeName: { type: String, required: true },
    description: { type: String },
    _userId: { type: Mongoose.Types.ObjectId, ref: "User", required: true },
    accessType: {
      type: [String],
      enum: themeAccessType,
      default: [],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = themesSchema;
