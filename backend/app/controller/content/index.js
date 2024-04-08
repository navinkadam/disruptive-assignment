const express = require("express");
const router = express.Router();
const ContentService = require("../../services/content");
const { getErrorPayload } = require("../../utils/errorUtil");
const authorization = require("../../middleware/authorization");

async function insertContent(req, res) {
  try {
    const body = req.body;
    body.userId = req.user._id;
    const result = await ContentService.insertContent(body);
    return res
      .status(201)
      .json({ data: result, message: "Successfully created content." });
  } catch (error) {
    const { status, ...rest } = getErrorPayload(error, 401);
    res.status(status).json({ ...rest });
  }
}

async function updateContent(req, res) {
  try {
    const body = req.body;
    const { contentId } = req.params;
    body.contentId = contentId;
    const result = await ContentService.updateContent(body);
    return res
      .status(200)
      .json({ data: result, message: "Successfully updated content." });
  } catch (error) {
    const { status, ...rest } = getErrorPayload(error, 401);
    res.status(status).json({ ...rest });
  }
}

async function getContentById(req, res) {
  try {
    const { contentId } = req.params;

    const result = await ContentService.getContentById({ contentId });
    return res.status(200).json({ data: result });
  } catch (error) {
    const { status, ...rest } = getErrorPayload(error, 401);
    res.status(status).json({ ...rest });
  }
}

async function getAllContent(req, res) {
  try {
    const result = await ContentService.getAllContent(req.query);
    if (!result.length)
      return res.status(200).json({
        message: "No records found Sorry! could not fetch the desired content.",
        data: [],
      });
    return res
      .status(200)
      .json({ data: result, message: "Successfully fetch content." });
  } catch (error) {
    const { status, ...rest } = getErrorPayload(error, 401);
    res.status(status).json({ ...rest });
  }
}

async function deleteContent(req, res) {
  try {
    const { contentId } = req.params;
    await ContentService.deleteContent({ contentId });
    return res.status(200).json({
      message: "Content has been successfully deleted.",
    });
  } catch (error) {
    console.log("error", error);
    let { status, errorObj } = getErrorPayload(error, 401);
    return res.status(status).json(errorObj);
  }
}

router.get("/", getAllContent);

router.post("/", authorization(["admin", "creator"]), insertContent);
router.put("/:contentId", authorization(["admin", "creator"]), updateContent);
router.get("/:contentId", getContentById);
router.delete("/:contentId", authorization(["admin"]), deleteContent);

module.exports = router;
