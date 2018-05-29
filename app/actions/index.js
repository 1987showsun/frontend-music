import axios          from "axios";
import mongodbURL     from './dbURL';

export const index = () => {
  let url = mongodbURL();
  return function(dispatch) {
    dispatch({type: "FETCH_INDEX"});
    axios.get(url+'/api/index')
      .then((response) => {
        dispatch({type: "FETCH_INDEX_FULFILLED", kvData: response.data.kvData, theLatestAlbum: response.data.theLatestAlbum, chinesehito: response.data.chinesehito, westernhito: response.data.westernhito, japanesehito: response.data.japanesehito, koreanhito:response.data.koreanhito, artistshito:response.data.artistshito});
      })
      .catch((err) => {
        dispatch({type: "FETCH_INDEX_ERROR", payload: err})
      })
  }
}
