export default function collectionReducer(state={
  data     : [],
  fetching : false,
  fetched  : false,
  error    : null,
},action){
  switch(action.type){
    case 'FETCH_COLLECTION' :
      state = {...state,fetching : true,}
      break;

    case 'FETCH_COLLECTION_FULFILLED' :
      state = {...state,fetching : true,fetched  : true, data : action.paylod}
      break;

    case 'FETCH_COLLECTION_REJECTED' :
      state = {...state,fetching : false,fetched  : false, data : action.paylod}
      break;

    case 'FETCH_COLLECTION_ADD':
      state = {...state,fetching : false,fetched  : false, data : action.paylod}
      break;
  }
  return state;
}
