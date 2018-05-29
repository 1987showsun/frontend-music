import axios      from 'axios';
import mongodbURL from './dbURL';

export function songsListAction(props){
  let url   = mongodbURL(),
      id    = props.params.id;
  return function(dispatch){
    dispatch({type: "FETCH_SONGSLIST"});
    axios.get(url+'/albumlist/list/'+id)
      .then((response) => {
        dispatch({type: "FETCH_SONGSLIST_FULFILLED", paylod:response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_SONGSLIST_REJECTED", payload: err});
      })
  }
}

export function getTop100Songs(area){
  let url   = mongodbURL();
  return function(dispatch){
    dispatch({type: "FETCH_SONGSLIST"});
    axios.get(url+'/api/top100Songs/'+area)
      .then((response) => {
        dispatch({type: "FETCH_TOP_SONGS_FULFILLED", paylod:response.data.songaData})
      })
  }
}
