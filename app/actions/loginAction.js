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
        console.log(response.data);
        if( response.data.success ){
          window.location = '/';
        }
      })
      .catch((err) => {
        const message = '';
        dispatch({type: "FETCH_LOGIN_REJECTED" , payload: message});
      })
  }
}
