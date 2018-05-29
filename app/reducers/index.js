export default function index(state={
    data            : [],
    theLatestAlbum  : [],
    kvData          : [],
    chinesehito     : [],
    westernhito     : [],
    japanesehito    : [],
    artistshito     : [],
    fetching  : false,
    fetched   : false,
    error     : null,
  },action) {
    switch(action.type){
      case 'FETCH_INDEX':
        state = {...state,fetching:true}
        break;

      case 'FETCH_INDEX_FULFILLED':
        state = {...state, fetching : true, fetched : true, theLatestAlbum : action.theLatestAlbum, kvData:action.kvData, chinesehito: action.chinesehito, westernhito:action.westernhito, japanesehito:action.japanesehito, koreanhito:action.koreanhito, artistshito:action.artistshito}
        break;
    }

    return state;
  }
