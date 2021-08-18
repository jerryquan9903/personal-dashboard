import api from "../services/api";

function getGameDetails(id) {
  api.get(`/games/game-details?id=${id}`)
    .then((success) => {
      return success.data;
    })
    .catch(() => { });

  return {};
}

export default getGameDetails;