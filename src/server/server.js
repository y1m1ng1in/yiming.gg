import React from "react";
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from '../js/App';
import storeFactory from "../js/store/";
import { base, matchList, matchData } from "./api";

let express = require('express');
let path    = require('path');
let https   = require('https');
let rp      = require('request-promise');
let apiKey  = require('../config.json')["api-key"];

const maximumRequestForMatches 
  = require('../config.json')["match-data-maximum-request"];

const fileAssets = express.static(path.join(__dirname, '../../dist'));

const emptyStore = storeFactory();

const basePage = (html, store=emptyStore) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8">
      <title>Yiming.GG</title>
  </head>
  <body>
  <div id="app">${html}</div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};
    console.log(${JSON.stringify(store.getState())});
  </script>
  <script type="text/javascript" src="bundle.js"></script>
  </body>
  </html>
`
  
const html = (initStore=emptyStore) => renderToString(  
  <Provider store={initStore}>
    <App />
  </Provider>
);

const transformMatchStat = (match, summonerName) => {
  let result = {};

  let getParticipants = (participants, participantIdentities) => {
    participantIdentities.forEach(p => {
      result[p.participantId] = {}
      result[p.participantId].info = p.player;
      if(p.player.summonerName === summonerName) {
        result.summonerParticipantId = p.participantId;
      }
    });

    participants.forEach(p => {
      result[p.participantId].stat = p;
    });
  }

  getParticipants(match.participants, match.participantIdentities);

  return result;
}

const app = express()
  .use(fileAssets)
  .use(express.urlencoded()); 

app.get('/', function(req, res) {
  res.status(200).send(basePage(html()));
});

app.post('/search', function (req, res) {
  let summonerName = req.body['player-name'];
  let server       = req.body['server'];
  let state        = {};
  let url          = base(summonerName, server, apiKey);
  let initStore    = {};

  rp(url, {json: true})
    .then(value => {
      console.log(value);
      state = {
        ...value,
        server: server
      }
      initStore = {...value};
      return rp(
        matchList(state.accountId, state.server, apiKey), 
        {json: true}
      );
    })
    .then(value => {
      state = {
        ...state,
        ...value
      }
      if(value.matches.length > 0) {
        state.startIndex = 0;
        state.endIndex 
          = value.matches.length > maximumRequestForMatches 
          ? maximumRequestForMatches 
          : value.matches.length - 1;
      }
      return Promise.all([
        ...value.matches
            .slice(state.startIndex, state.endIndex)
            .map(m => matchData(m.gameId, server, apiKey))
            .map(url => rp(url, {json: true}))
      ]);
    })
    .then(values => {
      state.matchStats = values.map(m => transformMatchStat(m, summonerName));
      initStore = {
        ...initStore,
        matchStats: state.matchStats.map(m => {
          let generalKeys = [
            'participantId', 
            'teamId', 
            'championId', 
            'spell1Id', 
            'spell2Id'
          ];
          let summonerStat = {};
          let otherPlayerStat = {};
          
          generalKeys.forEach(k => summonerStat[k] = m[m.summonerParticipantId]["stat"][k]);
          summonerStat = {
            ...summonerStat,
            ...m[m.summonerParticipantId]["stat"]["stats"]
          }
          Object
            .keys(m)
            .filter(id => 
              id != m.summonerParticipantId &&
              id != 'lose' &&
              id != 'win' &&
              id != 'summonerParticipantId'
            )
            .forEach(id => {
              otherPlayerStat[id] = {};
              generalKeys.forEach(k => otherPlayerStat[id][k] = m[id]["stat"][k]);
              otherPlayerStat[id] = {
                ...otherPlayerStat[id],
                ...m[id]["stat"]["stats"],
                ...m[id]["info"],
              }
            });
          return {
            summonerStat: summonerStat,
            otherPlayerStat: otherPlayerStat
          }
        }),
      };
      initStore = storeFactory(initStore);
      res.send(basePage(html(initStore)));
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(
  3000, 
  () => {console.log("server running at port 3000");}
);
