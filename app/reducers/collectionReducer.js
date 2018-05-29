export default function collectionReducer(state={
  data     : [],
  fetching : false,
  fetched  : false,
  error    : null,
  windowStatus : false,
  playListSort : [],
  playListSong : [],
  noteType     : "",
  beforeName   : "",
  songsId      : ""
},action){
  switch(action.type){
    case 'FETCH_COLLECTION' :
      state = {...state,fetching : true,}
      break;

    case 'FETCH_COLLECTION_FULFILLED' :
      state = {...state,fetching : true,fetched  : true, data : action.paylod}
      break;

    case 'FETCH_COLLECTION_REJECTED' :
      state = {...state,fetching : false,fetched  : false}
      break;

    case 'FETCH_ALBUMCOLLECTION_ADD':
      state = {...state,fetching : false,fetched  : false, data : action.paylod}
      break;

    case 'FETCH_SONGSCOLLECTION_ADD':
      state = {...state,fetching : false,fetched  : false, songsCollection : action.paylod}
      break;

    case 'OPEN_PLAYLIST_SORT_NOTE' :
      state = {...state, windowStatus : action.paylod, noteType: action.noteType, beforeName: action.beforeName, songsId: action.songsId }
      break;

    case 'PLAYLIST_SORT_STATUS' :
      state = {...state, playListSort : action.paylod}
      break;

    case 'PLAYLIST_SONGS':
      state = {...state, playListSort : action.paylod}
      break;

    case 'REMOVE_PLAYLIST_SORT' :
      state = {...state, playListSort : action.paylod}
      break;
  }
  return state;
}
