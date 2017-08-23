import axios from 'axios';

export function hitoAlbumAction(){
  return function(dispatch) {
    dispatch({type: "FETCH_MAINBANNER"});
    axios.get('http://localhost:5000/ranking')
      .then((response) => {
        dispatch({type: "FETCH_HITOABLUM_FULFILLED", paylod:response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_HITOABLUM_REJECTED", payload: err});
      })
  }
}
