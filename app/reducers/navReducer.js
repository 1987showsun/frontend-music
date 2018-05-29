export default function navReducer(state={
    data     : [],
    selectVal: '',
    fetching : false,
    fetched  : false,
    error    : null,
  },action) {
    switch(action.type){
      case 'FETCH_NAV':
        state = {...state,fetching:true}
        break;

      case 'FETCH_NAV_FULFILLED':
        state = {...state, data : action.paylod}
        break;

      case 'SELECT_VICENAV':
        state = {...state, selectVal : action.paylod}
        break;
    }

    return state;
  }
