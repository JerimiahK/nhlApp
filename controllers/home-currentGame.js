const { response } = require("express");
const { Db } = require("mongodb");
const router = require("express").Router();
const url = `https://statsapi.web.nhl.com/api/v1/schedule`;
let mostRecentGameID;
let gamesArray = [];

router.get("/home", async (req, res) => {
  try {
    const recentGames = await fetch(url, {
      method: "GET",
    });
    const currentData = await recentGames.json();
    const games = currentData.dates[0].games;
    const gameID = games[0].gamePk;
    for (let g of games) {
      gamesArray.push({
        id: g.gamePk,
        status: g.status.detailedState,
      });
    }
    module.exports = gamesArray;
    const inProgress = gamesArray.filter(
      (status) => status.status == "In Progress"
    );
    const scheduled = gamesArray.filter(
      (status) => status.status == "Scheduled"
    );
    const final = gamesArray.filter((status) => status.status == "Final");
    console.log(inProgress);
    //  IF games[0].status.detailedState === "Scheduled" THAN firstID = games[0].gamePk
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

// router.get("/home/:id", async (req, res) => {
//   try {
//     const nextGames = await fetch(url, {
//       method: "GET",
//     });
//     const currentData = await recentGames.json();
//     const games = currentData.dates[0].games;
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
