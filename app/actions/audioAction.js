export function audioPlayEndAction(status){
  return function(dispatch){
    dispatch({type:"FETCH_AUDIO",payload:status})
  }
}
