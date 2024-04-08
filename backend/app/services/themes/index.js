const Models = require("../../models");
const s3Helper = require("../../utils/s3Helper");

async function insertTheme(params) {
  const { themeName, description, accessType = [], userId } = params;
  let errorMsg = "";
  if (!themeName?.trim()) errorMsg += "Theme Name, ";
  if (!accessType?.length) errorMsg += "Access Type, ";
  if (errorMsg)
    throw {
      status: 422,
      message: errorMsg.substring(0, errorMsg.length - 2) + " is required.",
    };

  const payload = {
    themeName: themeName.trim(),
    uniqueThemeName: themeName.trim().replace(" ", "-"),
    description,
    accessType: accessType,
    _userId: userId,
  };
  const result = await new Models.Themes(payload).save();

  return result;
}

async function getAllThemes(params = {}, projections = {}) {
  const query = { isActive: true };

  if (params?.name?.trim())
    query.themeName = new RegExp(params?.name?.trim(), "ig");

  console.log("query", query);
  return await Models.Themes.find(query, projections).lean();
}

async function getThemesById(params) {
  if (!params.themeId) throw { message: "Theme id missing!" };
  const result = await Models.Themes.findOne({ _id: params.themeId }).lean();
  if (!result) throw { message: "Invalid theme id!" };
  return result;
}

async function updateTheme(params) {
  const result = await getThemesById({ themeId: params.themeId });
  console.log("params", params);
  const { accessType, description } = params;
  let updatePayload = {};

  if (description) updatePayload.description = description;

  if (accessType?.length) updatePayload.accessType = accessType;

  console.log("updatePayload", updatePayload);
  await Models.Themes.updateOne({ _id: result._id }, { $set: updatePayload });
  return await getThemesById({ themeId: params.themeId });
}

async function deleteTheme(params) {
  const { themeId } = params;
  const result = await getThemesById({ themeId });
  return await Models.Themes.updateOne(
    { _id: mongoose.Types.ObjectId(result._id) },
    { $set: { isActive: false } }
  );
}

module.exports = {
  insertTheme,
  getAllThemes,
  getThemesById,
  updateTheme,
  deleteTheme,
};
