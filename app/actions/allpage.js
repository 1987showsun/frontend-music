export function nowPage(pathname){
  return function(dispatch){
    dispatch({type:'SET_PATHNAME', payload : pathname});
  }
}
