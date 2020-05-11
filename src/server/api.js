export const base = (summonerName, server, apiKey) => 
  `https://${server}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;

export const matchList = (accountId, server, apiKey) =>
  `https://${server}1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${apiKey}`;

export const matchData = (gameId, server, apiKey) => 
  `https://${server}1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${apiKey}`;
