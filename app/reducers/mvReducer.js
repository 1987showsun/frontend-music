export default function mvReducer(state={
    data          : [],
    fetching      : false,
    fetched       : false,
    error         : null,
    selectMv      : [],
    windowStatus  : ''
  },action) {
    switch(action.type){
      case 'FETCH_MV':
        state = {...state,fetching:true}
        break;

      case 'FETCH_WINDOW_MV':
        state = {...state, windowStatus : action.windowSwitch}
        break;

      case 'FETCH_SELECT_MV':
        state = {...state, selectMv:action.paylod}
        break;

      case 'FETCH_GET_MV':
        state = {...state, data : action.paylod}
        break;
    }

    return state;
  }
