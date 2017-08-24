export default function login(state={
    data     : [],
    fetching : false,
    fetched  : false,
    error    : null,
  },action) {
    switch(action.type){
      case 'FETCH_LOGIN':
        state = {...state,fetching:true}
        break;

      case 'FETCH_LOGIN_FULFILLED':
        state = {...state, fetching : true, fetched : true, data : action.paylod }
        break;

      case 'FETCH_LOGIN_REJECTED' :
        state = {...state, fetching : true, fetched : true, data : action.paylod }
        break;
    }

    return state;
  }
