const { response } = require("express");
const { Db } = require("mongodb");
const router = require("express").Router();
const url = `https://statsapi.web.nhl.com/api/v1/schedule`;
let gameID;
let gamesArray = [];

router.get("/home", async (req, res) => {
  try {
    const recentGames = await fetch(url, {
      method: "GET",
    });
    const currentData = await recentGames.json();
    const games = currentData.dates[0].games;
    // gameID = games.pop().gamePk;
    for (let g of games) {
      gamesArray.push({
        id: g.gamePk,
        status: g.status.detailedState,
      });
    }
    const inProgress = gamesArray.filter(
      (status) => status.status == "In Progress"
    );
    const scheduled = gamesArray.filter(
      (status) => status.status == "Scheduled"
    );
    const final = gamesArray.filter((status) => status.status == "Final");
    // const scheduledID = inProgress.pop().id;
    if (inProgress) {
      gameID = inProgress.pop().id
    } else if (final) {
      gameID = final.pop().id
    } else {
      gameID = games[0].gamePk
    }
    //  IF all games = Scheduled, THAN gameID = gameArray[0].id
    // ELSE Loop through games array, find last games Index === "In Progress" THAN firstID = games[i].pop().gamePk
    // ELSE IF Loop through games array, THAN firstID = games.pop().gamePk
    const teamRecords = currentData.dates[0].games[0].teams;
    const box = `https://statsapi.web.nhl.com/api/v1/game/${gameID}/feed/live`;
    const liveGameFetch = await fetch(box, {
      method: "GET",
    });
    const liveData = await liveGameFetch.json();

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
