import axios from 'axios';

export function albumListAction(props){
  const paramName = props.params.paramName;
  return function(dispatch){
    dispatch({type: "FETCH_ALBUMLIST"});
    axios.get('http://localhost:5000/albumlist/'+paramName)
      .then((response) => {
        dispatch({type: "FETCH_ALBUMLIST_FULFILLED", paylod:response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_ALBUMLIST_REJECTED", payload: err});
      })
  }
}
