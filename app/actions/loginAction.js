import axios from 'axios';

export function loginAction(data){

  return function(dispatch){
    dispatch({type: "FETCH_LOGIN"});
    axios.get('http://localhost:5000/member/signIn',{
        params:{
          data : data
        }
      })
      .then((response) => {
        dispatch({type: "FETCH_LOGIN_FULFILLED", paylod:response.data});
      })
      .catch((err) => {
        const message = '';
        dispatch({type: "FETCH_LOGIN_REJECTED" , payload: message});
      })
  }
}

export function loginProtectedAction(token){
  return function(dispatch){
    axios.get('http://localhost:5000/member/signIn/protected',{
        headers: {
          Authorization : 'Basic '+token
        }
      })
      .then((data) => {
        dispatch({type: "FETCH_GETUSERINFO_FULFILLED", paylod:data.data});
      })
      .catch((err) => {
        const message = '';
        dispatch({type: "FETCH_LOGIN_REJECTED" , payload: message});
      })
  }
}
