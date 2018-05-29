
export function noteAction(noteText,status){
  return function(dispatch){
    dispatch({type:"NOTLOGIN_ADD_COLLECTION",paylod:noteText,status:status});
  }
}
