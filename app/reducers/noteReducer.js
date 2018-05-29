
export default function noteReducer(state={
  data : []
},action
){
  switch(action.type){
    case 'NOTLOGIN_ADD_COLLECTION' :
      state = {...state,data:action.paylod,status:action.status}
      break;
  }
  return state;
}
