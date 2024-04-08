const express = require("express");
const router = express.Router();
const ThemesService = require("../../services/themes");
const { getErrorPayload } = require("../../utils/errorUtil");

async function insertTheme(req, res) {
  try {
    const body = req.body;
    body.userId = req.user._id;
    const result = await ThemesService.insertTheme(body);
    return res
      .status(201)
      .json({ data: result, message: "Successfully created theme." });
  } catch (error) {
    const { status, ...rest } = getErrorPayload(error, 401);
    res.status(status).json({ ...rest });
  }
}

async function updateTheme(req, res) {
  try {
    const body = req.body;
    const { themeId } = req.params;
    body.themeId = themeId;
    const result = await ThemesService.updateTheme(body);
    return res
      .status(200)
      .json({ data: result, message: "Successfully updated theme." });
  } catch (error) {
    const { status, ...rest } = getErrorPayload(error, 401);
    res.status(status).json({ ...rest });
  }
}

async function getThemesById(req, res) {
  try {
    const { themeId } = req.params;

    const result = await ThemesService.getThemesById({ themeId });
    return res.status(200).json({ data: result });
  } catch (error) {
    const { status, ...rest } = getErrorPayload(error, 401);
    res.status(status).json({ ...rest });
  }
}

async function getAllThemes(req, res) {
  try {
    const result = await ThemesService.getAllThemes({});
    if (!result.length)
      return res.status(200).json({
        message: "No records found Sorry! could not fetch the desired theme.",
        data: [],
      });
    return res
      .status(200)
      .json({ data: result, message: "Successfully fetch theme." });
  } catch (error) {
    const { status, ...rest } = getErrorPayload(error, 401);
    res.status(status).json({ ...rest });
  }
}

async function deleteTheme(req, res) {
  try {
    const { themeId } = req.params;
    await new ThemesService.deleteTheme({ themeId });
    return res.status(200).json({
      message: "Theme has been successfully deleted.",
    });
  } catch (error) {
    let { status, errorObj } = getErrorPayload(error, 401);
    return res.status(status).json(errorObj);
  }
}

router.get("/", getAllThemes);

router.use((req, res, next) => {
  if (req.user.role === "admin") return next();
  return res
    .status(401)
    .json({ message: "You Don't have access to theme route's." });
});

router.post("/", insertTheme);
router.put("/:themeId", updateTheme);
router.get("/:themeId", getThemesById);
router.delete("/:themeId", deleteTheme);

module.exports = router;
