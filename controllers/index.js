const router = require("express").Router();

const pageRoutes = require("./page");
const homeRoute = require("./homeRoutes");

router.use("/", homeRoute);
router.use("/page", pagesRoute);

module.exports = router;
