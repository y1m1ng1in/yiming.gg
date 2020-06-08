export const base = (summonerName, server) => 
  `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;

export const matchList = (accountId, server) =>
  `https://${server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`;

export const matchData = (gameId, server) => 
  `https://${server}.api.riotgames.com/lol/match/v4/matches/${gameId}`;

export const summonerDetail = (summonerId, server) => 
  `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;