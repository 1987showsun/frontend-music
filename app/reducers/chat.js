export default function chatReducer(state={
  data     : [],
  message  : [],
  fetching : false,
  fetched  : false,
  error    : null,
},action){
  switch(action.type){
    case 'FETCH_CHAT' :
      state = {...state, fetching: true,}
      break;

    case 'FETCH_CHAT_FULFILLED' :
      state = {...state, fetching: true, fetched : true, message:action.payload}
      break;
  }
  return state;
}
