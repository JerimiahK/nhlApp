const { model } = require("mongoose");
const router = require("express").Router();
const url = `http://statsapi.web.nhl.com/api/v1/schedule`;

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
  let currentTeamRecords;
  let teamRecords = [];
  let gameID;

  try {
    const todaysGames = await fetch(url, {
      method: "GET",
    });
    const currentData = await todaysGames.json();
    const allGames = currentData.dates[0].games;
    for (let g of allGames) {
      teamRecords.push({
        id: g.gamePk,
        homeWins: g.teams.home.leagueRecord.wins,
        homeLosses: g.teams.home.leagueRecord.losses,
        homeTies: g.teams.home.leagueRecord.ot,
        awayWins: g.teams.away.leagueRecord.wins,
        awayLosses: g.teams.away.leagueRecord.losses,
        awayTies: g.teams.away.leagueRecord.ot,
      });
    }

    gameID = req.params.id;

    for (let r of teamRecords) {
      if (gameID == r.id) {
        currentTeamRecords = {
          homeWins: r.homeWins,
          homeLosses: r.homeLosses,
          homeTies: r.homeTies,
          awayWins: r.awayWins,
          awayLosses: r.awayLosses,
          awayTies: r.awayTies,
        };
      }
    }

    const box = `https://statsapi.web.nhl.com/api/v1/game/${gameID}/feed/live`;

    const gameFetch = await fetch(box, {
      method: "GET",
    });
    const liveData = await gameFetch.json();

    res.render("selectedGame", {
      currentTeamRecords,
      liveData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
