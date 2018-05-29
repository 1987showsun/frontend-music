import axios      from 'axios';
import mongodbURL from './dbURL';

export function mvWindowAction(windowStatus){
  return function(dispatch){
    dispatch({type:"FETCH_WINDOW_MV", windowSwitch:windowStatus});
  }
}

export function mvSelectAction(videoId){
  let url = mongodbURL();
  return function(dispatch){
    if( videoId!='' ){
      axios.get(url+'/api/mv/'+videoId)
      .then((Mv) => {
        dispatch({type:"FETCH_SELECT_MV",paylod:Mv.data.data});
      })
    }else{
      dispatch({type:"FETCH_SELECT_MV",paylod:[]});
    }
  }
}

export function getMvAction(props){
  let url     = mongodbURL(),
      albumId = props.params.id;

  return function(dispatch){
    axios.get(url+'/api/mv/all/'+albumId)
    .then((Mv) => {
      dispatch({type:"FETCH_GET_MV",paylod:Mv.data.data});
    })
  }
}
