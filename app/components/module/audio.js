import React,{Component}  from 'react';
import { connect }        from 'react-redux';
import $                  from 'jquery';
import ReactAudioPlayer   from 'react-audio-player';

import store                from "../../store";
import {audioPlayEndAction} from '../../actions/audioAction';

var onplaySongsId = '';

class Audio extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      videoId         : '',
      replayStatus    : 'not-replay',
      lyricsStatus    : 'close',
      playList        : [],
      playListLength  : 0,
      selectListen    : [],
    }
  }

  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.selectListen!=undefined){
      this.setState({
        playList        : nextProps.playList,
        playListLength  : nextProps.playList.length,
        selectListen    : nextProps.selectListen
      })
    }
  }

  componentDidMount() {
    this.setState({
      videoId      : document.getElementById('player'),
    })
  }

  render(){
    return(
      <div id="audio">
        <div className="audioShear left">
          <ul className="controls">
            <li className="changeStatus prev" onClick={this.changeSongs.bind(this,'prev')}></li>
            <li className="status play" onClick={this.songsPlay.bind(this)}></li>
            <li className="changeStatus next" onClick={this.changeSongs.bind(this,'next')}></li>
          </ul>
        </div>
        <div className="audioShear center">
          <audio id="player" src={this.state.selectListen.filenam}></audio>
          <div id="timeLine">
            <div className="line">
              <span></span>
            </div>
          </div>
        </div>
        <div className="audioShear right">
          <ul className="controls">
            <li className={"audioVicBtn replayStatus not-replay "+this.selectReplay('not-replay')} title="no replay" onClick={this.replayStatus.bind(this,'not-replay')}></li>
            <li className={"audioVicBtn replayStatus all-replay "+this.selectReplay('all-replay')} title="replay" onClick={this.replayStatus.bind(this,'all-replay')}></li>
            <li className={"audioVicBtn replayStatus one-replay "+this.selectReplay('one-replay')} title="one replay" onClick={this.replayStatus.bind(this,'one-replay')}></li>
            <li className={"audioVicBtn lyricsStatus close "+this.selectLyrics('close')} title="lyrics" onClick={this.lyricsStatus.bind(this,'close')}></li>
            <li className={"audioVicBtn lyricsStatus open "+this.selectLyrics('open')} title="lyrics" onClick={this.lyricsStatus.bind(this,'open')}></li>
          </ul>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    audioAction1.initial(
      this.state.videoId
    );
  }

  selectLyrics(status){
    if(status==this.state.lyricsStatus){
      return true;
    }
  }

  lyricsStatus(status){
    var statusArray = ['close','open'];
    statusArray.map( (item,i,array) =>{
      if( item==status ){
        i++;
        if( i>=statusArray.length ){
          i = 0;
        }
        this.setState({
          lyricsStatus : array[i],
        })
      }
    })
  }

  selectReplay(status){
    if(status==this.state.replayStatus){
      return true;
    }
  }

  replayStatus(status){
    var statusArray = ['not-replay','all-replay','one-replay'];
    statusArray.map( (item,i,array) =>{
      if( item==status ){
        i++;
        if( i>=statusArray.length ){
          i = 0;
        }
        this.setState({
          replayStatus : array[i],
        })
      }
    })
  }

  songsPlay(){
    this.state.videoId.play();
  }

  changeSongs(status){
    this.state.playList.map( (item,i,array) => {
      if( item._id == this.state.selectListen._id ){

        switch( status ){
          case 'prev' :
            i--;
            if( i < 0 ){
              i = this.state.playListLength-1;
            }
            break;

          case 'next' :
            i++;
            if( i >= this.state.playListLength ){
              i = 0;
            }
            break;
        }

        this.setState({
          selectListen : array[i],
        })
      }
    })
  }
}

var audioAction1 = {
  initial : function( videoId ){
    videoId.onloadedmetadata = function(){
      videoId.play();
      audioAction1.timeLine(videoId);
      audioAction1.controls(videoId);
      audioAction1.audioPlayEnd(videoId);
    }
  },

  timeLine : function(videoId){
    var $timeLine    = $('#timeLine').find('>.line'),
        _totalTime   = videoId.duration,
        _timeLine_W  = $timeLine.width(),
        _now_w       = 0,
        _currentTime = 0;

    videoId.ontimeupdate = function(){
      _currentTime = videoId.currentTime;
      _now_w = (_currentTime / _totalTime)*100;
      $timeLine.css({
        width : _now_w+'%',
      })
    }
  },

  controls : function(videoId){
    videoId.onplaying = function(){
      $('.status').removeClass('play').addClass('pause');
    }
    videoId.onpause = function(){
      $('.status').removeClass('pause').addClass('play');
    }
  },

  audioPlayEnd : function(videoId){
    videoId.onended = function() {
      store.dispatch({
        type : "FETCH_AUDIO",
        paylod : true
      })
    };
  }
}

function mapStateToProps(state){
  return{
    playList     : state.playList.data,
    selectListen : state.playList.selectListen
  }
}

export default connect(mapStateToProps)(Audio,audioAction1);
