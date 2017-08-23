export default function hitoAlbum(state={
    data     : [],
    fetching : false,
    fetched  : false,
    error    : null,
  },action) {
    switch(action.type){
      case 'FETCH_HITOABLUM':
        state = {...state,fetching:true}
        break;

      case 'FETCH_HITOABLUM_FULFILLED':
        state = {...state, fetching : true, fetched : true, data : action.paylod}
        break;
    }

    return state;
  }
