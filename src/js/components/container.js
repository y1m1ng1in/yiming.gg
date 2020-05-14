import { connect } from 'react-redux';
import Form from "../components/Form";
import SummonerGeneral from "../components/SummonerGeneral";
import MatchOverview from "../components/MatchOverview";
import Summoner from "../components/Summoner";
import { getSummonerInfo } from "../../actions";

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
    const { startIndex, endIndex } = state;
    const { index } = ownProps;
    const matchListIndex = startIndex + index;
    // assert(
    //   matchListIndex >= startIndex && 
    //   matchListIndex < endIndex
    // );
    const { champion, timestamp, queue } = state.matchList[matchListIndex];
    const { kills, deaths, assists } = state.matchStats[index].summonerStat;
    return {
      champion: champion,
      matchInfo: { timestamp: timestamp, queue: queue },
      kda: { kills: kills, deaths: deaths, assists: assists }
    };
  },
  null
)(MatchOverview)

export const SummonerData = connect(
  state => ({ hasSearchedSummoner: state.hasSearchedSummoner }),
  null
)(Summoner)
