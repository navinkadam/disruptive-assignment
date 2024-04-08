const Mongoose = require("mongoose");

const userSchema = require("./user");
const themesSchema = require("./themes");
const contentSchema = require("./content");

module.exports = {
  User: Mongoose.model("User", userSchema),
  Themes: Mongoose.model("Themes", themesSchema),
  Content: Mongoose.model("Content", contentSchema),
};
