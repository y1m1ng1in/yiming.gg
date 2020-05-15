export const getSummonerInfo = (summonerName, server) => ({
  summoner: summonerName,
  server: server,
  url: `${summonerName}  ${server}`,
  type: "get_summoner_name_and_server"
});

export const getMatchDetail = index => ({
  indexOfMatchListSelected: index,
  type: "get_match_detail"
});