export default function albumListReducer(state={
    albumsListData      : [],
    fetching            : false,
    fetched             : false,
    error               : null,
  },action) {
    switch(action.type){
      case 'FETCH_ALBUMLIST':
        state = {...state, fetching:true}
        break;

      case 'FETCH_ALBUMLIST_FULFILLED':
        state = {...state, fetching : true, fetched : true, albumsListData : action.albumsListData}
        break;
    }
    return state;
  }
