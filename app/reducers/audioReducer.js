export default function audioReducer(state={
    audioPlayEnded     : false,
    replayStatus       : 'not-replay',
    fetching : false,
    fetched  : false,
    error    : null,
  },action){
    switch (action.type){
      case 'FETCH_AUDIO' :
        state = {...state, audioPlayEnded : action.paylod}
        break;

      case 'REPLAY_STATUS':
        state = {...state, replayStatus : action.status}
        break;
    }
    return state;
  }
