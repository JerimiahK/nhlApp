const router = require("express").Router();

const allGames = require("./games-routes");
const favoriteTeams = require("./favoriteTeams-routes");
const signIn = require("./signIn-routes");

router.use("/games", allGames);
router.use("/favorites", favoriteTeams);
router.use("/sign-in", signIn);

module.exports = router;
