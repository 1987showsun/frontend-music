export default function lyrics(state={
  lyricsWindowStatus  : 'close',
  data                : [],
  lyrics              : '',
  audioDom            : '',
},action){
  switch (action.type){

    case 'LYRICS_TRANSFER':
      state = { ...state, lyrics : action.lyrics }
      break;
  }
  return state;
}
