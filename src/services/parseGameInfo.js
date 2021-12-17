import dayjs from "dayjs";

function handleColonSplits(string) {
  let split = string.split(";");
  // remove last element (no value), join
  return split.slice(0, split.length - 1).join(", ");
}

function handleLastPlayed(last) {
  let lastPlayed = dayjs.unix(last);

  // set 01/01 of last year as reference point (so that the comparison always works)
  let lastYear = dayjs(
    (parseInt(dayjs().format("YYYY")) - 1).toString() + "/01/01"
  );

  // calculate the difference between now and last played
  let diff = dayjs().diff(lastYear, "day") - lastPlayed.diff(lastYear, "day");

  // return values
  if (diff == 0) return "Today";
  else if (diff == 1) return "Yesterday";
  else return dayjs.unix(last).format("YYYY/MM/DD");
}

function handleTimePlayed(timePlayed) {
  if (timePlayed >= 3600)
    return Math.floor(timePlayed / 3600).toString() + "h " + (Math.floor(timePlayed / 60) % 60).toString() + "m";
  else return Math.floor(timePlayed / 60) + " minutes";
}

function parseGameInfo(game) {
  const parsedGame = {
    id: game.id,
    name: game.name,
    image: game.image,
    desc: game.description || "",
    data: [
      { label: "Genres", value: handleColonSplits(game.genres) },
      { label: "Developers", value: handleColonSplits(game.devs) },
      { label: "Release date", value: game.releaseDate.split("/").reverse().join("/") }
    ]
  }

  if (game.lastPlayed > 0) parsedGame.data.push({
    label: "Last played", value: handleLastPlayed(game.lastPlayed)
  })

  if (game.playTime > 0) parsedGame.data.push({
    label: "Time played", value: handleTimePlayed(game.playTime)
  })

  return parsedGame;
}

export default parseGameInfo;