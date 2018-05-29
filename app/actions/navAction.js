import axios from 'axios';

export function navAction(ssss){
  return function(dispatch){
    dispatch({type:"FETCH_NAV_FULFILLED",paylod:ssss})
  }
}


export function selectViceNav(selectVal){
  return function(dispatch){
    dispatch({type:"SELECT_VICENAV",paylod: selectVal})
  }
}
