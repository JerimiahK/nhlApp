const dayjs = require("dayjs");
const year = dayjs().format("YYYY");
const month = dayjs().format("MM");
const day = dayjs().format("DD");
const time = dayjs().format("hh" + ":" + "mm");
const url = `https://api.sportradar.us/nhl/trial/v7/en/games/${year}/${month}/${day}/schedule.json?api_key=hpxpgrv2r94ta5maqhzhxgnx`;

// const nextButton = async (e) => {
//   console.log(e);
//   //   const gameData = await fetch(url);
//   //   const data = await gameData.json();
//   //   console.log(data);
// };


$("#currentGame").click(function() {
    console.log("hello");
});
// async function nextButton() {
//   const gameData = await fetch(url);
//   const data = await gameData.json();
// //   const gameArray = data.games;
// console.log(data);
// //   for (i = 0; i < data.length; i++) {
// //     if ()
// //   }
// //   latestGameID = data.games[0].id;
// }
