const { default: mongoose } = require("mongoose");
const Models = require("../../models");
const s3Helper = require("../../utils/s3Helper");
const ThemeService = require("../themes");

async function insertContent(params) {
  const { title, userId, themeId, description } = params;
  const themeResult = await ThemeService.getThemesById({ themeId });

  if (!title?.trim())
    throw { status: 422, message: "Content Name is required." };
  const contentPayload = await checkThemeAndContentAccess(themeResult, params);

  const payload = {
    title,
    description,
    _userId: userId,
    description,
    _themeId: themeResult._id,
    ...contentPayload,
  };

  const result = await new Models.Content(payload).save();

  return result;
}

async function checkThemeAndContentAccess(themeResult, params) {
  const { images, videoLinks, txtDoc } = params;

  const imageAccess = themeResult.accessType.includes("img");
  const videoLinkAccess = themeResult.accessType.includes("video");
  const txtDocAccess = themeResult.accessType.includes("text-doc");

  if (!imageAccess && images?.length)
    throw {
      status: 422,
      message:
        "The payload is invalid. Images cannot be uploaded into the selected theme.",
    };

  if (!videoLinkAccess && videoLinks?.length)
    throw {
      status: 422,
      message:
        "The payload is invalid. Video cannot be uploaded into the selected theme.",
    };

  if (!txtDocAccess && txtDoc?.length)
    throw {
      status: 422,
      message:
        "The payload is invalid. Txt document cannot be uploaded into the selected theme.",
    };

  const payload = {};
  if (imageAccess) {
    payload.images = await Promise.all(
      images.map((img) =>
        s3Helper.getUpload({
          ...img,
          fileName: `${new Date().getTime()}-${img.fileName}`,
        })
      )
    );
  }

  if (videoLinkAccess) {
    payload.videoLinks = videoLinks;
  }
  if (txtDocAccess) {
    payload.txtDoc = txtDoc;
  }
  return payload;
}

async function getAllContent(params) {
  const query = { isActive: true };
  if (params?.name?.trim()) {
    const themeIds = await ThemeService.getAllThemes(params, { themeName: 1 });
    query.$or = [
      { _themeId: { $in: themeIds.map((x) => x._id) } },
      { title: new RegExp(params.name.trim(), "ig") },
    ];
  }
  return await Models.Content.find(query).sort({ createdAt: -1 }).lean();
}

async function getContentById(params) {
  if (!params.contentId) throw { message: "Content id missing!" };
  const result = await Models.Content.findOne({ _id: params.contentId })
    .populate("_themeId")
    .lean();
  if (!result) throw { message: "Invalid content id!" };
  return result;
}

async function updateContent(params) {
  const result = await getContentById({ contentId: params.contentId });
  let updatePayload = {};
  const { title, description } = params;
  if (title && title.trim()) updatePayload.title = title;
  if (description && description.trim())
    updatePayload.description = description;

  const contentPayload = await checkThemeAndContentAccess(
    result._themeId,
    params
  );
  updatePayload = { ...updatePayload, ...contentPayload };
  await Models.Content.updateOne({ _id: result._id }, { $set: updatePayload });
  return await getContentById({ contentId: result._id });
}

async function deleteContent(params) {
  const { contentId } = params;
  const result = await getContentById({ contentId });
  return await Models.Content.updateOne(
    { _id: new mongoose.Types.ObjectId(result._id) },
    { $set: { isActive: false } }
  );
}

module.exports = {
  insertContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
};
