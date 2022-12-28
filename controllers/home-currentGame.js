const { response } = require("express");
const router = require("express").Router();
const currentGame = require("../public/js/script");
console.log(currentGame);

router.get("/home", async (req, res) => {
  try {
    const box = `http://api.sportradar.us/nhl/trial/v7/en/games/${latestGameID}/analytics.json?api_key=hpxpgrv2r94ta5maqhzhxgnx`;
    console.log(box);
    const recentGame = await fetch(box);
    const currentData = await recentGame.json();
    console.log(currentData);

    res.render("homepage", {
      currentData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
