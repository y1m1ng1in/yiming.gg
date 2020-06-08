# Yiming GG
A web application analyzes League of Legends summoners and match statistics.
Yiming GG is available under the [MIT License](./LICENSE).

## Contributor Info.
Yiming Lin [yl6@pdx.edu](yl6@pdx.edu)

## Url
Visite our live site: [Yiming.GG](https://yiming-gg-testing-278304.ue.r.appspot.com/)
Live site url: https://yiming-gg-testing-278304.ue.r.appspot.com

## Build Instruction
In order to build the app locally, you need to apply for an api key at [Riot official api](https://developer.riotgames.com/).

    // go to the top-level directory
    cd yiming.gg/ 

	  // change your api key
	  cd src/
	  vim config.json
	  // then replace the "replace-me" with your Riot api key
    
    // install dependencies
    npm install
    
    // webpack build
    npx webpack

	  // transpile JSX code and run server
	  npx babel-node ./src/server/server.js
	
	  // now visit site at localhost:3000


## App usage
1. Firstly, visit our site [Yiming.GG](https://yiming-gg-testing-278304.ue.r.appspot.com/)
2. In the landing page, choose the server you want to search for (currently the app only support NA1 and KR), then enter the summoner name. Click "Search" button.
3. The match list is shown on the left-hand side, the match detail data is shown on the right-hand side.
4. Click button in the match graph control panel to view different match graphs. 
5. Click site Logo on the left-top corner to return to landing page.
6. You can also choose server and enter summoner name on the right-top corner to search other summoners.

## Technical Stack
| Programming languages | Frameworks | Library |Package Management|
|--|--|--|--|
| Html | Node.js | D3.js |Webpack|
| SCSS | Express | OpenCV |
| JavaScript | React-Redux |  |
| Python |  |  |
