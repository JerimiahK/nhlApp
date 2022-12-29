const { response } = require("express");
const router = require("express").Router();
const url = `https://statsapi.web.nhl.com/api/v1/schedule`;

router.get("/home", async (req, res) => {
  try {
    const recentGames = await fetch(url, {
      method: "GET",
    });
    const currentData = await recentGames.json();
    const games = currentData.dates[0].games
    const gameStatus = games.filter(game => game.status.detailedState === "In Progress")
    const mostRecentGameID = gameStatus.pop().gamePk
    const teamRecords = currentData.dates[0].games[0].teams;

    const box = `https://statsapi.web.nhl.com/api/v1/game/${mostRecentGameID}/feed/live`;

    const liveGameFetch = await fetch(box, {
      method: "GET",
    });

    const liveData = await liveGameFetch.json();

    res.render("homepage", {
      teamRecords,
      liveData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
