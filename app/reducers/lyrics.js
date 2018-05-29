export default function lyrics(state={
  lyricsWindowStatus  : 'close',
  data                : [],
  text                : '',
  lyrics              : '',
  audioDom            : '',
},action){
  switch (action.type){
    case 'LYRICS_WINDOW_STATUS':
      state = { ...state, lyricsWindowStatus : action.status }
      break;

    case 'GET_LYRICS_DATA':
      state = { ...state, data : action.data }
      break;

    case 'LYRICS_TRANSFER':
      state = { ...state, lyrics : action.lyrics }
      break;

    case 'AUDIO_DOM':
      state = { ...state, audioDom : action.dom }
      break;

    case 'LYRICS_TEXT':
      state = { ...state, text : action.text }
      break;
  }
  return state;
}
