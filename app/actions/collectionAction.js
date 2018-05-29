import axios      from 'axios';
import mongodbURL from './dbURL';

export function collectionAction(params,id){
  let url   = mongodbURL(),
      token = checkTokenAction(),
      theme = ['albumCollection','songsCollection','playRecord','playList'];

  return function(dispatch){
    dispatch({type:"FETCH_COLLECTION"});
    if(token!=''){
      if( id!='' ){
        axios.get(url+'/member/signIn/get/collection/'+params,{
          params:{
            id : id
          },
          headers: {
            Authorization : 'Basic '+token
          }
        })
        .then((data) => {
          if( params==theme[0] ){
            dispatch({type:"FETCH_COLLECTION_FULFILLED" ,paylod:data.data});
          }else if(params==theme[3]){
            dispatch({type: "PLAYLIST_SORT_STATUS", paylod: data.data});
          }else{
            dispatch({type:"FETCH_SONGSCOLLECTION_ADD" ,paylod:data.data});
          }
        })
      }
    }
  }
}

export function collectionAddAction(params,memberId,selectId){
  let url   = mongodbURL(),
      token = checkTokenAction(),
      theme = ['albumCollection','songsCollection','playRecord','playList'];
  return function(dispatch){
    dispatch({type:"FETCH_COLLECTION"})
    if(token!=''){
      if( memberId!='' ){
        axios.get(url+'/member/signIn/put/collection/'+params,{
          params:{
            memberId : memberId,
            selectId : selectId
          },
          headers: {
            Authorization : 'Basic '+token
          }
        })
        .then((data) => {
          if( params==theme[0] ){
            dispatch({type:"FETCH_ALBUMCOLLECTION_ADD" ,paylod:data.data})
          }else if( params==theme[1] ){
            dispatch({type:"FETCH_SONGSCOLLECTION_ADD" ,paylod:data.data})
          }
        })
      }
    }
  }
}

export function openPlaylistSortNote(windowStatus,noteType,beforeName,songsId){
  var songsId     = songsId     || '',
      beforeName  = beforeName  || '',
      noteType    = noteType    || false;
  return function(dispatch){
    dispatch({type:"OPEN_PLAYLIST_SORT_NOTE" ,paylod: windowStatus ,noteType: noteType, beforeName: beforeName, songsId: songsId})
  }
}

export function addPlaylistSort(id,sort){
  let url   = mongodbURL(),
      token = checkTokenAction();
  return function(dispatch){
    axios.get(url+'/member/post/addplaylistsort',{
      params:{
        id    : id,
        sort  : sort,
      },
      headers: {
        Authorization : 'Basic '+token
      }
    })
    .then((data) => {
      dispatch({type: "PLAYLIST_SORT_STATUS", paylod: data.data});
    })
  }
}

export function editPlaylistSort(id,afterName,beforeName){
  let url   = mongodbURL();
  return function(dispatch){
    axios.put(url+'/member/put/editplaylistsort/'+id+'/'+beforeName+'/'+afterName)
    .then((data) => {
      dispatch({type: "PLAYLIST_SORT_STATUS", paylod: data.data});
    })
  }
}

export function getPlaylistSortList(id,sort){
  let url   = mongodbURL(),
      token = checkTokenAction();

  if(id!=undefined){
    return function(dispatch){
      axios.get(url+'/member/get/playlistsortlist',{
        params:{
          id    : id,
          sort  : sort,
        },
        headers: {
          Authorization : 'Basic '+token
        }
      })
      .then((data) => {
        dispatch({type: "PLAYLIST_SORT_STATUS", paylod: data.data});
      })
    }
  }
}

export function getPlaylistSortSongs(sort,id){
  let url   = mongodbURL(),
      token = checkTokenAction();
  return function(dispatch){
    axios.get(url+'/api/playlistsortsongs',{
      params:{
        id    : id,
        sort  : sort
      },
      headers: {
        Authorization : 'Basic '+token
      }
    })
    .then((data) => {
      dispatch({type: "PLAYLIST_SONGS", paylod: data.data});
    })
  }
}

export function removePlaylistSort(id,sort){
  let url   = mongodbURL(),
      token = checkTokenAction();
  return function(dispatch){
    axios.delete(url+'/member/remove/playlistsort',{
      params:{
        id    : id,
        sort  : sort
      },
      headers: {
        Authorization : 'Basic '+token
      }
    })
    .then((data) => {
      dispatch({type: "PLAYLIST_SORT_STATUS", paylod: data.data});
    })
  }
}

export function removePlaylistSongs(id,sort,songsId){
  let url   = mongodbURL(),
      token = checkTokenAction();
  return function(dispatch){
    axios.delete(url+'/member/remove/playlistsongs',{
      params:{
        id      : id,
        sort    : sort,
        songsId : songsId
      },
      headers: {
        Authorization : 'Basic '+token
      }
    })
    .then((data) => {
      dispatch({type: "PLAYLIST_SONGS", paylod: data.data});
    })
  }
}

export function removeSelectPlaylistSongs(id,sort,songsId){
  let url   = mongodbURL(),
      token = checkTokenAction();
  return function(dispatch){
    axios.delete(url+'/member/remove/selectplaylistsongs',{
      params:{
        id      : id,
        sort    : sort,
        songsId : songsId
      },
      headers: {
        Authorization : 'Basic '+token
      }
    })
    .then((data) => {
      dispatch({type:'PLAYLIST_SORT_STATUS', paylod:data.data})
    })
  }
}

export function  addSelectPlaylistSong(profileId,selectSort,songsId){
  let url   = mongodbURL();
  return function(dispatch){
    axios.post(url+'/member/post/selectplaylistsongs',{
      id      : profileId,
      sort    : selectSort,
      songsId : songsId
    })
    .then((data) => {
      dispatch({type:'PLAYLIST_SORT_STATUS', paylod:data.data})
    })
  }
}

function checkTokenAction(){
  var login = sessionStorage.getItem('login') || [],
      token = '';

  if( login ){
    if(JSON.parse(login).success){
      token = JSON.parse(login).token;
    }else{
      token = '';
    }
  }
  return token;
}
