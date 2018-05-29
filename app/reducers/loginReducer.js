export default function login(state={
    data     : [],
    token    : [],
    profile  : [],
    fetching : false,
    fetched  : false,
    error    : null,
  },action) {
    switch(action.type){
      case 'FETCH_LOGIN':
        state = {...state }
        break;

      case 'FETCH_LOGIN_FULFILLED':
        state = {...state, token : action.paylod }
        if( action.paylod.success ){
          sessionStorage.setItem('login',JSON.stringify(action.paylod));
        }
        break;

      case 'FETCH_GETUSERINFO_FULFILLED' :
        state = {...state, profile : action.paylod }
        break;

      case 'FETCH_LOGIN_REJECTED' :
        state = {...state, data : JSON.stringify(action.paylod) }
        break;

      case 'GET_MEMBER_USERNAME':
        state = {...state, username : action.payload }
        break;
    }

    return state;
  }
