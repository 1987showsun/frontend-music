import axios from 'axios';
import mongodbURL from './dbURL';
import $ from 'jquery';

export function lyricsWindowStatus(status,songsId){
  let url   = mongodbURL(),
      token = checkTokenAction();

  return function(dispatch){
    dispatch({type:"LYRICS_WINDOW_STATUS",status:status});

    axios.get(url+'/api/lyrics',{
      params : {
        songsId : songsId
      },
      headers: {
        Authorization : 'Basic '+token
      }
    }).then((res) => {
      dispatch({type:"GET_LYRICS_DATA", data: res.data.data});
      if(res.data.data.length>0){

        let filenam = res.data.data[0].filenam,
            lyrics  = '',
            lrcObj  = {};

        $.get(filenam,function(text){

          lyrics = text.split("\n");

          for(var i=0 ; i < lyrics.length ; i++){
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            if(!timeRegExpArr)continue;
            var clause = lyric.replace(timeReg,'');

            for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
              var t = timeRegExpArr[k];
              var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                  sec = Number(String(t.match(/\:\d*/i)).slice(1));
              var time = min * 60 + sec;
              lrcObj[time] = clause;
            }
          }

          dispatch({type:"LYRICS_TEXT", text: lrcObj});
        });
      }else{
        dispatch({type:"LYRICS_TEXT", text: ''});
      }
    })
  }
}

export function audioDom(dom){
  return function(dispatch){
    dispatch({type:"AUDIO_DOM",dom:dom});
  }
}

function checkTokenAction(){
  var login = sessionStorage.getItem('login') || [],
      token = '';

  if( login ){
    if(JSON.parse(login).success){
      token = JSON.parse(login).token;
    }else{
      token = '';
    }
  }
  return token;
}
