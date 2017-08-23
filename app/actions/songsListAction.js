import axios from 'axios';

export function songsListAction(props){
  const id = props.params.id;
  return function(dispatch){
    dispatch({type: "FETCH_SONGSLIST"});
    axios.get('http://localhost:5000/albumlist/list/'+id)
      .then((response) => {
        dispatch({type: "FETCH_SONGSLIST_FULFILLED", paylod:response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_SONGSLIST_REJECTED", payload: err});
      })
  }
}
