import axios      from 'axios';
import mongodbURL from './dbURL';

export function artistsArea(){
  let url   = mongodbURL();
  return function(dispatch){
    axios.get(url+'/artist/area')
    .then((data) => {
      dispatch({type:'GET_AREA',paylod:data.data});
    })
  }
}

export function getArtists(path){
  let url   = mongodbURL();
  return function(dispatch){
    axios.get(url+'/artist/'+path)
    .then((data) => {
      dispatch({type:'GET_ARTISTS', paylod:data.data});
    })
  }
}

export function getSelectArtists(path,artistsId){
  let url   = mongodbURL();
  return function(dispatch){
    axios.get(url+'/artist/'+path+'/'+artistsId)
    .then((data) => {
      dispatch({type:'GET_SELECTARTISTS',paylod:data.data});
    })
  }
}

export function getArtistsSwitch(artistsSwitch){
  return function(dispatch){
    dispatch({type:'GET_ARTISTS_SWITCH',paylod:artistsSwitch});
  }
}

export function searchArtists(updatedList){
  return function(dispatch){
    dispatch({type:'GET_ARTISTS_SEARCH',paylod:updatedList});
  }
}
