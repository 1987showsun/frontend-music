import axios      from 'axios';
import mongodbURL from './dbURL';

export const albumListAction = (paramName,nowpage) => {
  let url   = mongodbURL();
  return function(dispatch){
    dispatch({type: "FETCH_ALBUMLIST"});
    axios.get(url+'/albumlist/'+paramName,{
      params: {
        nowpage: nowpage
      }
    })
    .then((response) => {
      dispatch({type: "FETCH_ALBUMLIST_FULFILLED", albumsListData: response.data.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_ALBUMLIST_REJECTED", payload: err});
    })
  }
}
