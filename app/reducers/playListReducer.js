import Playlist from '../components/module/playlist';

export default function playListReducer(state={
    data          : [],
    selectListen  : [],
    fetching      : false,
    fetched       : false,
    error         : null,
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
        //console.log(action.paylod);
        state = {...state, selectListen : action.paylod}
        break;

      case 'DELETE_LISTEN' :
        var playListArray = JSON.parse( sessionStorage.getItem('playlist') );
        playListArray.map( (item,i)=>{
          if( item._id==action.paylod ){
            playListArray.splice(i,1);
          }
        })
        state = {...state, fetching : true, fetched : true, data : playListArray}
        sessionStorage.setItem('playlist',JSON.stringify(playListArray) );
        break;

      case 'ADD_ALL_PLAYLIST_SONGS' :
        //console.log(action.paylod.data);
        state = {...state, fetching : true, fetched : true, data : action.paylod.data}
        sessionStorage.setItem('playlist',JSON.stringify(action.paylod.data) );
        break;
    }

    return state;
  }
