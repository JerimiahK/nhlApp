const { model } = require("mongoose");
const router = require("express").Router();
const url = `http://statsapi.web.nhl.com/api/v1/schedule`;
const gamesArray = [];

router.get("/games", async (req, res) => {
  try {
    const todaysGames = await fetch(url, {
      method: "GET",
    });
    const currentData = await todaysGames.json();
    const allGames = currentData.dates[0].games;
    // for (let g of games)
    console.log(allGames[0].teams);
    res.render("games");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
