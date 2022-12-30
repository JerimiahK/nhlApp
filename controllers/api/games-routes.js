const { model } = require("mongoose");

const router = require("express").Router();
const url = `http://statsapi.web.nhl.com/api/v1/schedule`;

router.get("/games", async (req, res) => {
  try {
    const recentGames = await fetch(url, {
      method: "GET",
    });
    const currentData = await recentGames.json();
    const games = currentData.dates[0].games;
    const teamRecords = currentData.dates[0].games[0].teams;
    

    res.render("homepage", {
      teamRecords,
      liveData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
