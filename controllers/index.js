const router = require("express").Router();

const pageRoutes = require("./api");
const homeRoute = require("./home-currentGame");

router.use("/", homeRoute);
router.use("/pages", pageRoutes);

module.exports = router;
