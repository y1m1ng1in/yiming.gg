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

const fileAssets = express.static(path.join(__dirname, '../../dist'));

const store = storeFactory();

const basePage = html => `
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
  </script>
  <script type="text/javascript" src="dist/bundle.js"></script>
  </body>
  </html>
`
  
const html = renderToString(  
  <Provider store={store}>
    <App />
  </Provider>
);

const app = express()
  .use(fileAssets)
  .use(express.urlencoded()); 

app.get('/', function(req, res) {
  res.status(200).send(basePage(html));
});

app.post('/search', function (req, res) {
  let summonerName = req.body['player-name'];
  let server       = req.body['server'];
  let state        = {};
  let url          = base(summonerName, server, apiKey);

  rp(url, {json: true})
    .then(value => {
      console.log(value);
      state = {
        ...value,
        server: server
      }
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
      res.send(state);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(
  3000, 
  () => {console.log("server running at port 3000");}
);
