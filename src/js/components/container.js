import { connect } from 'react-redux';
import Form from "../components/Form";
import SummonerGeneral from "../components/SummonerGeneral";
import MatchOverview from "../components/MatchOverview";
import Summoner from "../components/Summoner";
import MatchList from "../components/MatchList";
import MatchDetail from "../components/MatchDetail";
import { 
  getSummonerInfo, getMatchDetail, getMoreMatchStats 
} from "../../actions";

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
    const { kills, deaths, assists } = state.matchStats[index].summonerStat;
    return {
      champion: champion,
      matchInfo: { timestamp: timestamp, queue: queue },
      kda: { kills: kills, deaths: deaths, assists: assists },
      index: index
    };
  },
  dispatch => ({
    onSelect(indexOfMatchList) {
      console.log(indexOfMatchList, "match selected in container.js");
      dispatch(getMatchDetail(indexOfMatchList));
    }
  })
)(MatchOverview)

export const MatchListContainer = connect(
  state => ({ 
    indexRange: state.endIndex,
    matchMetas: {
      summonerName: state.name,
      server: state.server,
      matchList: state.matchList
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
  state => {
    return { matchData: state.matchStats[state.indexOfMatchListSelected] };
  },
  null
)(MatchDetail)