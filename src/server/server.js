import React from "react";
import ignoreStyles from 'ignore-styles'
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from '../js/App';
import storeFactory from "../js/store/";
import { base, matchList, matchData } from "./api";

let express    = require('express');
let path       = require('path');
let fs         = require('fs');
let https      = require('https');
let bodyParser = require('body-parser');
let rp         = require('request-promise');
let apiKey     = require('../config.json')["api-key"];

const maximumRequestForMatches 
  = require('../config.json')["match-data-maximum-request"];

const fileAssets = express.static(path.join(__dirname, '../../dist'));

const staticCss = fs.readFileSync(path.join(__dirname, '../../dist/styles.css'));

const emptyStore = storeFactory({ 
  hasSearchedSummoner: false,
  indexOfMatchListSelected: 0
});

const basePage = (html, state={}) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8">
      <title>Yiming.GG</title>
      <style>${staticCss}</style>
  </head>
  <body>
  <div id="app">${html}</div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(state)};
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

const createMatchStats = (originalMatchStats, summonerName) => {
  return originalMatchStats
    .map(m => transformMatchStat(m, summonerName))
    .map(m => {
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
    })
}

const app = express()
  .use(fileAssets)
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json()); 

app.get('/', function(req, res) {
  res.status(200).send(basePage(html()));
});

app.post('/search', function(req, res) {
  let summonerName = req.body['player-name'];
  let server       = req.body['server'];
  let state        = {};
  let url          = base(summonerName, server);
  let initStore    = {};
  let startIndex   = 0;
  let endIndex     = 0;

  const options = { uri: url, headers: { 'X-Riot-Token': apiKey }, json: true };
  rp(options)
    .then(value => {
      console.log(value);
      state = { ...value, server: server }
      initStore = { hasSearchedSummoner: true, ...value, server: server };
      return rp({
        uri: matchList(state.accountId, state.server), 
        headers: { 'X-Riot-Token': apiKey },
        json: true
      });
    })
    .then(value => {
      state = {
        ...state,
        ...value
      }
      if(value.matches.length > 0) {
        endIndex 
          = value.matches.length > maximumRequestForMatches 
          ? maximumRequestForMatches 
          : value.matches.length - 1;
      }
      state = { ...state, startIndex, endIndex };
      initStore = { 
        ...initStore, 
        startIndex, 
        endIndex, 
        matchList: value.matches 
      };
      return Promise.all([
        ...value.matches
            .slice(state.startIndex, state.endIndex)
            .map(m => matchData(m.gameId, server))
            .map(url => rp({
              uri: url, headers: { 'X-Riot-Token': apiKey }, json: true
            }))
      ]);
    })
    .then(values => {
      initStore = {
        ...initStore,
        matchStats: createMatchStats(values, summonerName),
        indexOfMatchListSelected: 0
      };
      initStore = storeFactory(initStore);
      res.send(basePage(html(initStore), initStore.getState()));
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/more', function(req, res) {
  let gameIds      = req.body.gameIds;
  let summonerName = req.body.summonerName;
  let server       = req.body.server;
  let indexStart   = req.body.expectedNextIndexStart;

  let indexEnd = 
    indexStart + maximumRequestForMatches > gameIds.length 
    ? gameIds.length - 1
    : indexStart + maximumRequestForMatches;

  Promise
    .all([
      ...gameIds
        .slice(indexStart, indexEnd)
        .map(id => rp(matchData(id, server, apiKey), {json: true}))
    ])
    .then(values => {
      let data = {
        matchStats: createMatchStats(values, summonerName),
      };
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

global.React = React;

app.listen(
  3000, 
  () => {console.log("server running at port 3000");}
);
