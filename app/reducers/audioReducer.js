export default function audioReducer(state={
    audioPlayEnded     : false,
    fetching : false,
    fetched  : false,
    error    : null,
  },action){
    switch (action.type){
      case 'FETCH_AUDIO' :
        state = {...state, audioPlayEnded : action.paylod}
        break;
    }
    return state;
  }
