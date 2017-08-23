import Playlist from '../components/module/playlist';

export default function playListReducer(state={
    data     : [],
    fetching : false,
    fetched  : false,
    error    : null,
  },action) {
    switch(action.type){
      case 'FETCH_PLAYLIST':
        state = {...state,fetching:true}
        break;

      case 'FETCH_PLAYLIST_FULFILLED':
        state = {...state, fetching : true, fetched : true, data : action.paylod}
        sessionStorage.setItem('playlist',JSON.stringify(action.paylod) );
        break;

      case 'FETCH_PLAYLIST_EDIT' :
        state = {...state, data: action.paylod}
        break;

      case 'SELECT_LISTEN' :
        state = {...state, selectListen : action.paylod}
        break;
    }

    return state;
  }
