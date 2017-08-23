import axios from 'axios';
import $ from 'jquery';
var playlistArray = JSON.parse(sessionStorage.getItem('playlist')) || [];

export function playlistAction(id){
  return function(dispatch){
    dispatch({type : "FETCH_PLAYLIST"});
    axios.get('http://localhost:5000/songs/'+id)
    .then((response) => {
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

export function editPlayListAction(){
  return function(dispatch){
    dispatch({type: "FETCH_PLAYLIST_EDIT", paylod:playlistArray});
  }
}

export function selectListenAction(item){
  return function(dispatch){
    dispatch({type: "SELECT_LISTEN",paylod:item});
  }
}

const checkPlayList = (playlistArray,object,item,i) => {
  if( object._id==item._id  ){
    playlistArray.splice(i,1);
  }
  return playlistArray;
}
