export default function mainBanner( state={
    data     : [],
    fetching : false,
    fetched  : false,
    error    : null,
  }, action) {

    switch (action.type) {
      case "FETCH_MAINBANNER" :
        state = { ...state, fetching: true }
        break;

      case "FETCH_MAINBANNER_REJECTED" :
        state = { ...state, fetching: false, error: action.payload }
        break;

      case "FETCH_MAINBANNER_FULFILLED" :
        state = { ...state, fetching: false, fetched: true, data: action.payload }
        break;

    }
    return state
}
