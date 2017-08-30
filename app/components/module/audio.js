import React,{Component}  from 'react';
import { connect }        from 'react-redux';
import $                  from 'jquery';
import ReactAudioPlayer   from 'react-audio-player';

var onplaySongsId = '';


export default class Audio extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      playList      : [],
      selectListen  : [],
    }
  }

  render(){
    this.audioAction();
    return(
      <div id="audio">
        <div className="audioShear left">
          <ul className="controls">
            <li className="changeStatus prev"></li>
            <li className="status play"></li>
            <li className="changeStatus next"></li>
          </ul>
        </div>
        <div className="audioShear center">
          <audio id="player"></audio>
          <div id="timeLine">
            <div className="line">
              <span></span>
            </div>
          </div>
        </div>
        <div className="audioShear right"> </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.data.selectListen!=undefined){
      this.setState({
        playList     : nextProps.data.data,
        selectListen : nextProps.data.selectListen
      })
    }
  }

  audioAction(){
    const selectListen  = this.state.selectListen;
    const playList      = this.state.playList;
    if(selectListen!=''){
      audioAction(selectListen,playList);
    }
  }
}


//Audio javascript
function audioAction(selectListen,playList){
  onplaySongsId = selectListen._id;
  var audioId   = document.getElementById('player');

  audioId.src = selectListen.filenam;
  audioId.onloadedmetadata = function(){
    audioId.play();
    controls.initial(audioId,playList);
    timeLine.initial(audioId);
  }
}

//控制台
var controls = {

  initial : function(audioId,playList){
    audioId.onplaying = function(){
      $('.status').removeClass('play').addClass('pause');
    }
    audioId.onpause = function(){
      $(this).removeClass('pause').addClass('play');
    }
    controls.playPause(audioId);
    controls.changeAudio(audioId,playList);
  },

  playPause : function(audioId){
    $('.status').off().on({
      click : function(){
        var nowClass = $(this).attr('class').split(' ');
        if( nowClass.indexOf('play')>=0 ){
          audioId.play();
          $(this).removeClass('play').addClass('pause');
        }else{
          audioId.pause();
          $(this).removeClass('pause').addClass('play');
        }
      }
    })
  },

  changeAudio : function(audioId,playList){
    var playListLength = playList.length;
    $('.changeStatus').off().on({
      click : function(){
        var touchClass = $(this).attr('class').split(' ');
        if( touchClass.indexOf('prev')>=0 ){
          playList.map((item,i,array)=>{
            if( item._id==onplaySongsId ){
              i-- ;
              if( i < 0 ){
                i = playListLength-1;
              }
              onplaySongsId = array[i]._id;
              audioId.src   = array[i].filenam;
            }
          });
        }else{

        }
      }
    })
  }
}

//時間軸
var timeLine = {
  initial : function(audioId,totalTime){
    var timeLine_W = $('#timeLine').width(),
        now_w      = 0,
        totalTime  = audioId.duration;;

    audioId.ontimeupdate = function(){
      now_w = (audioId.currentTime / totalTime)*100;
      $('#timeLine').find('>.line').css({
        width : now_w+'%',
      })
    }
  }
}
