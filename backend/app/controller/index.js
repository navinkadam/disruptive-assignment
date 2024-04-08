const express = require("express");
const router = express.Router();

const appRoutes = require("./app");
const authenticateUser = require("../middleware/authentication");
const userRoutes = require("./user");
const themeRoute = require("./themes");
const contentRoute = require("./content");

router.use("/app", appRoutes);

router.use(authenticateUser);

router.use("/user", userRoutes);
router.use("/theme", themeRoute);
router.use("/content", contentRoute);

module.exports = router;
