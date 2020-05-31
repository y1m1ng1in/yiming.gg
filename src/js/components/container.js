import { connect } from 'react-redux';
import Form from "../components/Form";
import SummonerGeneral from "../components/SummonerGeneral";
import MatchOverview from "../components/MatchOverview";
import Summoner from "../components/Summoner";
import MatchList from "../components/MatchList";
import MatchDetail from "../components/MatchDetail";
import GraphController from "../components/GraphController";
import { 
  getSummonerInfo, getMatchDetail, getMoreMatchStats, changeGraphDisplay 
} from "../../actions";
import MatchGraphs from './MatchGraphs';

export const SummonerSearch = connect(
  null, 
  dispatch => ({
    onSubmit(summoner) {
      console.log("in container.js", summoner);
      dispatch(getSummonerInfo(summoner.summoner, summoner.server));
    }
  })
)(Form)

export const SummonerGeneralInfo = connect(
  state => ({
    name: state.name,
    level: state.summonerLevel,
    icon: state.profileIconId 
  }),
  null
)(SummonerGeneral)

export const MatchListItem = connect(
  (state, ownProps) => {
    const { startIndex } = state;
    const { index } = ownProps;
    const matchListIndex = startIndex + index;
    const { champion, timestamp, queue } = state.matchList[matchListIndex];
    const { 
      kills, deaths, assists, win, tripleKills, 
      quadraKills, pentaKills, totalDamageDealtToChampions,
      totalDamageTaken, teamId, goldEarned
    } = state.matchStats[index].summonerStat;
    const outstanding = {
      mostKills: true,
      mostGoldEarned: true,
      mostDamageTaken: true,
      mostDamageDealt: true,
      tripleKills: tripleKills > 0,
      quadraKills: quadraKills > 0,
      pentaKills: pentaKills > 0
    }

    Object
      .keys(state.matchStats[index].otherPlayerStat)
      .forEach(key => {
        const player = state.matchStats[index].otherPlayerStat[key];
        if(player.teamId === teamId) {
          if(player.kills > kills) {
            outstanding['mostKills'] = false;
          }
          if(player.goldEarned > goldEarned) {
            outstanding['mostGoldEarned'] = false;
          }
          if(player.totalDamageTaken > totalDamageTaken) {
            outstanding['mostDamageTaken'] = false;
          }
          if(player.totalDamageDealtToChampions > totalDamageDealtToChampions) {
            outstanding['mostDamageDealt'] = false;
          }
        }
      });

    return {
      champion: champion,
      matchInfo: { timestamp: timestamp, queue: queue, win: win },
      kda: { kills: kills, deaths: deaths, assists: assists },
      index: index,
      outstanding: outstanding
    };
  },
  dispatch => ({
    onSelect(indexOfMatchList) {
      console.log(indexOfMatchList, "match selected in container.js");
      dispatch(getMatchDetail(indexOfMatchList));
      dispatch(changeGraphDisplay({ mode: 'individual', view: 'damage' }))
    }
  })
)(MatchOverview)

export const MatchListContainer = connect(
  state => ({ 
    indexRange: state.endIndex,
    matchMetas: {
      summonerName: state.name,
      server: state.server,
      matchList: state.matchList,
      hasMore: state.endIndex < state.matchList.length,
    }
  }),
  dispatch => ({
    onShowMore(matchStats) {
      dispatch(getMoreMatchStats(matchStats));
    }
  })
)(MatchList)

export const SummonerData = connect(
  state => ({ hasSearchedSummoner: state.hasSearchedSummoner }),
  null
)(Summoner)

export const MatchDetailContainer = connect(
  state => ({
     matchData: state.matchStats[state.indexOfMatchListSelected] 
  }),
  null
)(MatchDetail)

export const MatchGraphContainer = connect(
  (state, ownProps) => ({
    display: state.graphDisplay,
    data: ownProps.data
  }),
  null
)(MatchGraphs)

export const MatchGraphController = connect(
  state => ({ display: state.graphDisplay }),
  dispatch => ({
    onSelect(selection) {
      dispatch(changeGraphDisplay(selection))
    }
  })
)(GraphController)