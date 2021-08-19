import dayjs from "dayjs";

// parse array returned from backend into displayable text
function parseGameInfo(info) {
  let parsed = info.map((item) => {
    let result = item;

    switch (item.label) {
      case "Genre":
      case "Developer": {
        let split = item.value.split(";");
        let fieldArray = split.slice(0, split.length - 1);

        // format string
        result.value = fieldArray
          .map((item, index) => {
            if (index === fieldArray.length - 1) return item;
            else return item + ", ";
          })
          .join();
        break;
      }

      case "Release date": {
        result.value = dayjs(item.value).format("DD/MM/YYYY");
        break;
      }

      case "Last played": {
        let lastPlayed = dayjs.unix(item.value);

        // set 01/01 of last year as reference point (so that the comparison always works)
        let lastYear = dayjs(
          (parseInt(dayjs().format("YYYY")) - 1).toString() + "/01/01"
        );

        // calculate the difference between now and last played
        let diff =
          dayjs().diff(lastYear, "day") - lastPlayed.diff(lastYear, "day");

        // return values
        if (diff == 0) result.value = "Today";
        else if (diff == 1) result.value = "Yesterday";
        else result.value = dayjs.unix(item.value).format("DD/MM/YYYY");

        break;
      }

      case "Play time": {
        if (item.value >= 3600)
          result.value =
            Math.floor(item.value / 3600).toString() +
            "h " +
            (Math.floor(item.value / 60) % 60).toString() +
            "m";
        else result.value = Math.floor(item.value / 60) + " minutes";
        break;
      }

      default:
        break;
    }

    return result;
  });

  return parsed;
}

export default parseGameInfo;