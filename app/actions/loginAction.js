import axios      from 'axios';
import mongodbURL from './dbURL';

export function loginAction(data){
  let url = mongodbURL();
  return function(dispatch){
    dispatch({type: "FETCH_LOGIN"});
    axios.get(url+'/member/signIn',{
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
  let url = mongodbURL();
  return function(dispatch){
    axios.get(url+'/member/signIn/protected',{
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

export function getAllMemberName(){
  let url = mongodbURL();
  return function(dispatch){
    axios.get(url+'/api/getAllMemberName')
    .then((data) => {
      dispatch({type: "GET_MEMBER_USERNAME", payload:data.data.username});
    })
  }
}

export function joinMemberAction(data){
  let url = mongodbURL();
  return function(dispatch){
    axios.get(url+'/member/join',{
        params : {
          data : data
        }
      })
      .then((data) => {
        dispatch({type: "FETCH_LOGIN_FULFILLED", paylod:data.data});
      })
      .catch((err) => {
        const message = '';
        dispatch({type: "FETCH_LOGIN_REJECTED" , payload: message});
      })
  }
}

export function shareLoginAction(response){
  let url = mongodbURL();
  return function(dispatch){
    if(response!=undefined){
      var data = [{
        "username"  : response.email,
        "password"  : "",
        "tel"       : "",
        "email"     : response.email,
        "address"   : response.locale,
        "headShot"  : response.picture.data.url,
        "token"     : "",
        "name"      : response.name,
        "level"     : "General",
        "status"    : "false"
      }]
      axios.get(url+'/member/share/join',{
        params : {
          data : data
        }
      })
      .then((data) => {
        dispatch({type: "FETCH_LOGIN_FULFILLED", paylod:data.data});
      })
      .catch((err) => {
        const message = '';
        dispatch({type: "FETCH_LOGIN_REJECTED" , payload: message});
      })
    }
  }
}
