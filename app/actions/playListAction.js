import axios      from 'axios';
import $          from 'jquery';
import mongodbURL from './dbURL';

export function playlistAction(id){

  let url           = mongodbURL(),
      playlistArray = getStoragePlayList(),
      login         = sessionStorage.getItem('login') || [];

  return function(dispatch){
    if(login!=''){
      const token = JSON.parse(login).token;
      dispatch({type : "FETCH_PLAYLIST"});
      axios.get(url+'/songs/'+id,{
        headers: {
          Authorization : 'Basic '+token
        }
      }).then((response) => {
        var object = response.data['data'][0];
        if( playlistArray.length==0 ){
          playlistArray.push(object)
        }else{
          playlistArray.map(function(item,i){
            playlistArray = checkPlayList(playlistArray,object,item,i);
          })
          playlistArray.push(object);
        }
        dispatch({type: "FETCH_PLAYLIST_FULFILLED", paylod:playlistArray});
      }).catch((err) => {
        dispatch({type: "FETCH_PLAYLIST_REJECTED", payload: err});
      })
    }
  }
}

export function allAddPlaylist(albums_id){
  let url           = mongodbURL(),
      login         = sessionStorage.getItem('login') || [];

  return function(dispatch){
    if(login!=''){
      const token = JSON.parse(login).token;
      axios.get(url+'/songs/allplay/',{
        params : {
          albums_id : albums_id
        },
        headers: {
          Authorization : 'Basic '+token
        }
      }).then((response) => {
        dispatch({type: "ADD_ALL_PLAYLIST_SONGS", paylod:response.data});
      }).catch((err) => {
        dispatch({type: "FETCH_PLAYLIST_REJECTED", paylod: err});
      })
    }
  }
}

export function replacePlayListAction(list){
  return function(dispatch){
    dispatch({type: "FETCH_PLAYLIST_FULFILLED", paylod:list});
  }
}

export function editPlayListAction(){
  var playlistArray = getStoragePlayList();
  return function(dispatch){
    dispatch({type: "FETCH_PLAYLIST_EDIT", paylod:playlistArray});
  }
}

export function selectListenAction(item){
  return function(dispatch){
    dispatch({type: "SELECT_LISTEN",paylod:item});
  }
}

export function deleteListenAction(item){
  return function(dispatch){
    dispatch({type: "DELETE_LISTEN",paylod:item});
  }
}


const getStoragePlayList = () => {
  var playlistArray = JSON.parse(sessionStorage.getItem('playlist')) || [];
  return playlistArray;
}

const checkPlayList = (playlistArray,object,item,i) => {
  if( object._id==item._id  ){
    playlistArray.splice(i,1);
  }
  return playlistArray;
}
