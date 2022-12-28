const dayjs = require("dayjs");
const year = dayjs().format("YYYY");
const month = dayjs().format("MM");
const day = dayjs().format("DD");
const url = `https://api.sportradar.us/nhl/trial/v7/en/games/${year}/${month}/${day}/schedule.json?api_key=hpxpgrv2r94ta5maqhzhxgnx`;

async function currentGame() {
  const gameData = await fetch(url);
  const data = await gameData.json();
  latestGameID = data.games[8].id;
}

currentGame();
module.exports = currentGame;
