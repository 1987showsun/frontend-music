import React,{Component}  from 'react';
import { connect }        from 'react-redux';
import $                  from 'jquery';
import ReactAudioPlayer from 'react-audio-player';

class Audio extends React.Component{

  componentDidMount() {

  }

  render(){
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

  componentDidUpdate(prevProps, prevState) {
    this.audioAction();
  }

  audioAction(){
    const {playList} = this.props;
    const selectListen = playList.selectListen || [];
    var src = '';
    if( selectListen!=null ){
      src = selectListen.filenam;
      audioAction(playList,src);
    }
  }
}

function audioAction(playList,src){
  var audioId = document.getElementById('player');
  if( src!=undefined ){
    audioId.src = src;
    audioId.onloadedmetadata = function() {
      audioId.play();
      var totalTime = audioId.duration;
      controls(audioId,playList);
      timeLine(audioId,totalTime);
    }
  }
}

const controls = (audioId,playList) => {

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

  $('.changeStatus').off().on({
    click : function(){
      var touchClass = $(this).attr('class').split(' ');
      if( touchClass.indexOf('prev')>=0 ){
        playList.data.map((item,i,array)=>{
          if( item._id==playList.selectListen._id  ){
            i--;
            console.log( array[i] );
          }
        })
      }else{

      }
    }
  })
}

const timeLine = (audioId,totalTime) => {
  var timeLine_W = $('#timeLine').width(),
      now_w      = 0;
  audioId.ontimeupdate = function(){
    now_w = (audioId.currentTime / totalTime)*100;
    $('#timeLine').find('>.line').css({
      width : now_w+'%',
    })
  }
}

function mapStateToProps(state){
  return{
    playList : state.playList
  }
}

export default connect(mapStateToProps)(Audio)
