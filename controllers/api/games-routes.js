const { model } = require("mongoose");
const router = require("express").Router();
const url = `http://statsapi.web.nhl.com/api/v1/schedule`;
// let gamesArray = [];

router.get("/games", async (req, res) => {
  try {
    const todaysGames = await fetch(url, {
      method: "GET",
    });
    const currentData = await todaysGames.json();
    const allGames = currentData.dates[0].games;
    let gamesArray = [];
    for (let g of allGames) {
      gamesArray.push({
        id: g.gamePk,
        homeName: g.teams.home.team.name,
        homeScore: g.teams.home.score,
        awayName: g.teams.away.team.name,
        awayScore: g.teams.away.score,
        status: g.status.detailedState,
      });
    }
    res.render("games", {
      gamesArray,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/game/:id", async (req, res) => {
  try {
    const gameID = await req.params.id;
    const box = `https://statsapi.web.nhl.com/api/v1/game/${gameID}/feed/live`;

    const gameFetch = await fetch(box, {
      method: "GET",
    });
    const liveData = await gameFetch.json();

    res.render("selectedGame", {
      liveData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
