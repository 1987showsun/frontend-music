export default function areaReducer(state={
    data     : [],
    fetching : false,
    fetched  : false,
    error    : null,
  },action) {
    switch(action.type){
      case 'FETCH_AREA':
        state = {...state,fetching:true}
        break;

      case 'GET_AREA_DATA':
        state = {...state, fetching : true, fetched : true, data : action.paylod}
        break;
    }

    return state;
  }
