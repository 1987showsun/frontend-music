import axios      from 'axios';
import mongodbURL from './dbURL';

export function areaAction(){
  let url   = mongodbURL();
  return function(dispatch){
    axios.get(url+'/api/area')
    .then((data) => {
      dispatch({type:'GET_AREA_DATA',paylod:data.data.data});
    })
    .catch((err) => {

    })
  }
}
