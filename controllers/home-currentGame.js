const { response } = require("express");
const { Db } = require("mongodb");
const router = require("express").Router();
const url = `https://statsapi.web.nhl.com/api/v1/schedule`;
let gameID;
let currentTeamRecords;
let gamesArray = [];
let teamRecords = [];

router.get("/", async (req, res) => {
  try {
    //fetch to NHL API for current days general information on games (ie: total games)
    const recentGames = await fetch(url, {
      method: "GET",
    });

    //return API information as JSON into a variable we can start extracting information from
    const currentData = await recentGames.json();

    //grabs all of todays games information, including gameID's as an array of objects
    const games = currentData.dates[0].games;

    //creates a new array of the games, but only with the information we need
    for (let g of games) {
      gamesArray.push({
        id: g.gamePk,
        status: g.status.detailedState,
      });
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
    //filters out an array of the games that are scheduled
    const scheduled = gamesArray.filter(
      (status) => status.status == "Scheduled" || "Pre-Game"
    );
    //filters out an array of the games that are in progress
    const inProgress = gamesArray.filter(
      (status) => status.status == "In Progress"
    );

    //filters out an array of the games that are finished
    const final = gamesArray.filter((status) => status.status == "Final");

    // creates a function that contains logic to display the most current game to be played, being played, or the last game of the night that finished
    const gameIDStatus = function () {
      if (gamesArray[0].status == "Scheduled" || "Pre-Game") {
        gameID = scheduled[0].id;
      } else if (
        gamesArray[0].status == "In Progress" ||
        "In Progress - Critical"
      ) {
        gameID = inProgress.pop().id;
      } else if (gamesArray.at(-1).status == "Final") {
        gameID = final.pop().id;
      }
    };
    gameIDStatus();
    console.log(gameID);
    //calls the gameIDStatus function to determine what the most current game ID is based on the games status'
    //creates a for loop to find the the current teams records based on comparing the gameID with the teams record ID
    for (let r of teamRecords) {
      if (gameID === r.id) {
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

    //creates a variable containing the URL for the NHL API to get the most current game feed stats using the gameID
    const box = `https://statsapi.web.nhl.com/api/v1/game/${gameID}/feed/live`;

    //fetches the most current games stats information
    const liveGameFetch = await fetch(box, {
      method: "GET",
    });

    //puts the live game data into a json format inside of variable
    const liveData = await liveGameFetch.json();

    //renders the homepage with the current teams records, the gamesArray, the live data, and the logged in status
    res.render("homepage", {
      currentTeamRecords,
      gamesArray,
      liveData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
