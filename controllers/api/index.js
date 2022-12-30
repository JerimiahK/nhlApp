const router = require("express").Router();

const signIn = require("./signIn");
const games = require("./games-routes");

router.use("/users", signIn);
router.use("/current", games);

module.exports = router;
