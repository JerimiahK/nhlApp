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
    for (let g of allGames) {
      gamesArray.push({
        homeName: g.teams.home.team.name,
        homeScore: g.teams.home.score,
        awayName: g.teams.away.team.name,
        awayScore: g.teams.away.score,
        status: g.status.detailedState,
      });
    }
    res.render("games", {
      gamesArray,
      // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//allGames.teams.[home or away].score = score
//allGames.teams.[home or away].team.name = name
module.exports = router;
