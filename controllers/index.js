const router = require("express").Router();

// const pageRoutes = require("./page");
const homeRoute = require("./homeRoutes");

router.use("/", homeRoute);
// router.use("/pages", pageRoute);

module.exports = router;
