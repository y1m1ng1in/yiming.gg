import { connect } from 'react-redux';
import Form from "../components/Form";
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