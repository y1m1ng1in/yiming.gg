export const base = (summonerName, server) => 
  `https://${server}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;

export const matchList = (accountId, server) =>
  `https://${server}1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`;

export const matchData = (gameId, server) => 
  `https://${server}1.api.riotgames.com/lol/match/v4/matches/${gameId}`;
