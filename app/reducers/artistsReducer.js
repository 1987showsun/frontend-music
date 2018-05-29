export default function artistsReducer(state={
  data      : [],
  fetching  : false,
  fetched   : false,
  error     : null,
  searchArtists : []
},action){
  switch(action.type){
    case 'GET_AREA':
      state = {...state , area : action.paylod}
      break;

    case 'GET_ARTISTS':
      state = {...state , artists : action.paylod}
      break;

    case 'GET_SELECTARTISTS':
      state = {...state , select  : action.paylod}
      break;

    case 'GET_ARTISTS_SWITCH':
      state = {...state , artistsSwitch : action.paylod}
      break;

    case 'GET_ARTISTS_SEARCH':
      state = {...state , searchArtists : action.paylod}
      break;
  }
  return state;
}
