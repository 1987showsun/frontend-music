import axios from 'axios';
import mongodbURL from './dbURL';

export function audioPlayEndAction(status){
  return function(dispatch){
    dispatch({type:"FETCH_AUDIO",paylod:status});
  }
}

export function replayStatus(status){
  return function(dispatch){
    dispatch({type:"REPLAY_STATUS", status: status});
    sessionStorage.setItem('replayStatus',status);
  }
}

export function endedSongsPutCount(songsId){
  let url   = mongodbURL();
  return function(dispatch){
    axios.get(url+'/songs/songsPutCount/'+songsId).then((value) => {})
  }
}
