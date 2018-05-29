export function lyricsTransfer(lyrics){
  return function(dispatch){
    dispatch({type:"LYRICS_TRANSFER",lyrics:lyrics});
  }
}
