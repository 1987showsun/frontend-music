export default function songsListReducer(state={
    data        : [],
    top100Songs : [],
    fetching    : false,
    fetched     : false,
    error       : null,
  },action) {
    switch(action.type){
      case 'FETCH_SONGSLIST':
        state = {...state,fetching:true}
        break;

      case 'FETCH_SONGSLIST_FULFILLED':
        state = {...state, fetching : true, fetched : true, data : action.paylod}
        break;

      case 'FETCH_TOP_SONGS_FULFILLED':
        state = {...state, fetching : true, fetched : true, top100Songs : action.paylod}
        break;
    }

    return state;
  }
