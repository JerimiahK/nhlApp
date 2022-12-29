const { response } = require("express");
const router = require("express").Router();
const url = `https://statsapi.web.nhl.com/api/v1/schedule`;

router.get("/home", async (req, res) => {
  try {
    const recentGames = await fetch(url, {
      method: "GET",
    });
    const currentData = await recentGames.json();
    // console.log(currentData.dates[0].games[0].teams);
    const currentID = currentData.dates[0].games[1].gamePk;
    const teamRecords = currentData.dates[0].games[0].teams;

    const box = `https://statsapi.web.nhl.com/api/v1/game/${currentID}/feed/live`;

    const liveGameFetch = await fetch(box, {
      method: "GET",
    });

    const liveData = await liveGameFetch.json();
    // console.log(liveData);

    res.render("homepage", {
      teamRecords,
      liveData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
