import axios from 'axios';
const login = sessionStorage.getItem('login') || []

export function collectionAction(params,id){
  return function(dispatch){
    dispatch({type:"FETCH_COLLECTION"})
    if(login!=''){
      const token = JSON.parse(login).token;
      if( id!='' ){
        axios.get('http://localhost:5000/member/signIn/'+params,{
          params:{
            id : id
          },
          headers: {
            Authorization : 'Basic '+token
          }
        })
        .then((data) => {
          dispatch({type:"FETCH_COLLECTION_FULFILLED" ,paylod:data.data})
        }).catch((err) => {
          dispatch({type: "FETCH_COLLECTION_REJECTED", payload: err});
        })
      }
    }
  }
}

export function collectionAddAction(params,memberId,selectId){
  return function(dispatch){
    dispatch({type:"FETCH_COLLECTION"})
    if(login!=''){
      const token = JSON.parse(login).token;
      console.log(params,memberId,selectId);
      if( memberId!='' ){
        axios.get('http://localhost:5000/member/signIn/collection/albumCollection',{
          params:{
            memberId : memberId,
            selectId : selectId
          },
          headers: {
            Authorization : 'Basic '+token
          }
        })
        .then((data) => {
          dispatch({type:"FETCH_COLLECTION_ADD" ,paylod:data.data})
        }).catch((err) => {
          //dispatch({type: "FETCH_COLLECTION_REJECTED", payload: err});
        })
      }
    }
  }
}
