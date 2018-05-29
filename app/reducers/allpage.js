export default function allpageReducer(state={
    pathname : '',
    fetching : false,
    fetched  : false,
    error    : null,
  },action) {
    switch(action.type){
      case 'SET_PATHNAME':
        state = {...state, pathname: action.payload}
        break;
    }

    return state;
  }
