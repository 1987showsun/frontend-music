import React,{Component}  from 'react';
import { connect }        from 'react-redux';
import $                  from 'jquery';
import ReactAudioPlayer   from 'react-audio-player';

//reducer
import {audioPlayEndAction,replayStatus,endedSongsPutCount}  from '../../actions/audioAction';
import {selectListenAction}               from '../../actions/playListAction';
import {lyricsWindowStatus,audioDom}      from '../../actions/lyrics';
import {noteAction}                       from '../../actions/noteAction';
import {selectViceNav}                    from '../../actions/navAction';


@connect( (store)=>{
  return{
    audio           : store.audio,
    playList        : store.playList.data,
    selectListen    : store.playList.selectListen,
    lyrics          : store.lyrics,
    nav             : store.nav
  }
})

class Audio extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      audio             : '',
      audioPlayEnded    : false,
      replayStatusArray : ['not-replay','all-replay','one-replay'],
      replayStatus      : sessionStorage.getItem('replayStatus') || 'not-replay',
      lyricsStatusArray : ['close','open'],
      lyricsStatus      : 'close',
      lyricsData        : [],
      lyrics            : '',
      playListLength    : 0,
      playList          : [],
      selectListen      : [],
      songsDuration     : 0,
      songsCurrentTime  : 0
    }
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      playList        : nextProps.playList,
      playListLength  : nextProps.playList.length,
      selectListen    : nextProps.selectListen,
      audioPlayEnded  : nextProps.audio.audioPlayEnded,
      replayStatus    : nextProps.audio.replayStatus,
      lyricsStatus    : nextProps.lyrics.lyricsWindowStatus,
      lyricsData      : nextProps.lyrics.data,
      lyrics          : nextProps.lyrics.text
    })
  }

  componentDidMount() {
    this.props.dispatch( replayStatus( this.state.replayStatus ) );
  }

  audioImages(){
    let _src = '';
    if(this.state.selectListen!=''){
      _src = this.state.selectListen.albumsImg;
    }else{
      _src = 'public/images/icon/compact.svg';
    }
    return _src;
  }

  onEnded(){
    const songsId = this.state.selectListen._id;
    this.props.dispatch( endedSongsPutCount(songsId) );
    this.props.dispatch( audioPlayEndAction( true ));
    this.checkPlayEnded();
  }

  onPause(){
    $('.controls').find('li.pause').css({display:'none'});
    $('.controls').find('li.play').css({display:'flex'});
  }

  onPlay(){
    $('.controls').find('li.pause').css({display:'flex'});
    $('.controls').find('li.play').css({display:'none'});
  }

  onListen(_currentTime){
    let $timeLine    = $('#timeLine').find('>.line'),
        _timeLine_W  = $timeLine.width(),
        _now_w       = 0,
        _this        = this;

    _now_w = (_currentTime / this.state.songsDuration)*100;
    $timeLine.css({
      width : _now_w+'%',
    })

    if( this.state.lyrics!='' ){
      const nowSet = test(_currentTime);
      $('.lyricsText').removeClass('nowSet').eq(nowSet-1).addClass('nowSet');

      function test(_currentTime){
        let _select           = 0,
            _lyricsTimeLength = Object.keys(_this.state.lyrics).length;

        for( var i=0 ; i < _lyricsTimeLength ; i++ ){
          if( _currentTime <= Number(Object.keys(_this.state.lyrics)[i]) ){
            _select = i;
            return _select;
          }
        }
      }
    }
    this.setState({
      songsCurrentTime : _currentTime,
    })
  }

  onSeeked(){

  }

  onLoadedMetadata(){
    this.setState({
      songsDuration : document.getElementsByClassName('react-audio-player ')[0].duration
    })

    let $timeLine       = $('#timeLine'),
        $thisAction     = '',
        touchSwitch     = false,
        test_w          = 0,
        page_X          = 0,
        move_X          = 0,
        induction_W     = 0,
        inductionOffset = 0,
        proportion      = this.state.songsDuration/100;

    $timeLine.off().on({
      mousedown : function(e) {
        document.getElementsByClassName('react-audio-player ')[0].pause();
        induction_W     = $(this).width();
        $thisAction     = $(this).find('>.line');
        touchSwitch     = true;
        inductionOffset = parseInt($(this).offset().left);

        $('body').off().on({
          mousedown : function(e) {
            page_X = e.pageX - inductionOffset;
          },

          mousemove : function(e) {
            if( touchSwitch ){
              move_X = (e.pageX - inductionOffset);
              test_w = ((move_X/induction_W)*100);
              $thisAction.css({
                width : test_w+'%',
              })
              document.getElementsByClassName('react-audio-player ')[0].currentTime = proportion*test_w;
            }
          },

          mouseup : function(e) {
            if( touchSwitch ){
              document.getElementsByClassName('react-audio-player ')[0].play();
            }
            touchSwitch = false;
          }
        })
      }
    })
  }

  audioPlayStatus(status){
    if( this.props.profile!='' ){
      if(status=='play'){
        document.getElementsByClassName('react-audio-player ')[0].play();
      }else{
        document.getElementsByClassName('react-audio-player ')[0].pause();
      }
    }else{
      const noteText = '請登入會員在進行收聽';
      const status   = 'notLogin'
      this.props.dispatch( noteAction(noteText,status) );
    }
  }

  render(){
    return(
      <div id="audio" className={ (this.props.nav.selectVal=='player')? true : '' }>
        <div className="bg" style={{backgroundImage: 'url('+this.state.selectListen.albumsImg+')'}}></div>
        <div className="audioShear left">
          <div className="albumImg">
            <img src={this.audioImages()}/>
          </div>
          <h2>{this.state.selectListen.name}</h2>
          <ul className="controls">
            <li className="changeStatus prev" onClick={this.changeSongs.bind(this,'prev')}>
              <img src="public/images/icon/audioPrev.svg"/>
            </li>
            <li className="status play"  onClick={ this.audioPlayStatus.bind(this,'play') }>
              <img src="public/images/icon/audioPlay.svg"/>
            </li>
            <li className="status pause" onClick={this.audioPlayStatus.bind(this,'pause')}>
              <img src="public/images/icon/audioPause.svg"/>
            </li>
            <li className="changeStatus next" onClick={this.changeSongs.bind(this,'next')}>
              <img src="public/images/icon/audioNext.svg"/>
            </li>
          </ul>
        </div>
        <div className="audioShear center">
          <ReactAudioPlayer src={this.state.selectListen.filenam} autoPlay
            listenInterval = {100}
            onPlay={this.onPlay.bind(this)}
            onListen={this.onListen.bind(this)}
            onEnded={this.onEnded.bind(this)}
            onPause={this.onPause.bind(this)}
            onSeeked={this.onSeeked.bind(this)}
            onLoadedMetadata={this.onLoadedMetadata.bind(this)}
          />
          <div id="timeLine">
            <div className="line">
              <span></span>
            </div>
          </div>
        </div>
        <div className="audioShear right">
          <ul className="controls">
            <li className={"audioVicBtn replayStatus "+this.state.replayStatus} title="no replay" onClick={this.replayStatus.bind(this)}></li>
            <li className={"audioVicBtn lyricsStatus "+this.state.lyricsStatus} title="lyrics" onClick={this.lyricsStatus.bind(this)}></li>
            <li className={"audioVicBtn volumeStatus open "} title="lyrics"></li>
          </ul>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if( prevState.selectListen._id!=this.state.selectListen._id ){
      let songsId = this.state.selectListen._id;
      this.props.dispatch( lyricsWindowStatus(this.state.lyricsStatus,songsId) );
    }
  }

  //檢查是否播畢
  checkPlayEnded(){
    const state = this.state;

    if(this.state.audioPlayEnded){
      let selectSongs     = 0,
          playList        = this.state.playList,
          playListLength  = playList.length,
          selectListen_Id = this.state.selectListen._id;

      switch( this.state.replayStatus ){
        case 'not-replay':
          selectSongs = nextSongs(this.state.replayStatus);
          if( selectSongs < playListLength ){
            this.props.dispatch(
              selectListenAction( playList[selectSongs] ),
              audioPlayEndAction( false )
            );
          }
          break;

        case 'all-replay':
          selectSongs = nextSongs(this.state.replayStatus);
          this.props.dispatch(
            selectListenAction( playList[selectSongs] ),
            audioPlayEndAction( false )
          );
          break;

        case 'one-replay':
          oneReplay();
          this.props.dispatch(
            audioPlayEndAction( false )
          );
          break;
      }

      function nextSongs(replayStatus){
        let returnResult = [];
        for( var i=0 ; i < playListLength ; i++ ){
          if( playList[i]._id == selectListen_Id ){
            i++;
            switch(replayStatus){
              case 'not-replay':
                if( i>=playListLength-1 ){
                  i = playListLength-1;
                }
                break;

              default :
              if( i>=playListLength ){
                i = 0;
              }
                break;
            }
            return i;
          }
        }
      }

      function oneReplay(){
        document.getElementsByClassName('react-audio-player ')[0].currentTime = 0;
        document.getElementsByClassName('react-audio-player ')[0].play();
      }
    }
  }

  lyricsStatus(status){
    let songsId     = this.state.selectListen._id;
    this.state.lyricsStatusArray.map( (item,i,array) =>{
      if( item==this.state.lyricsStatus ){
        i++;
        if( i>=this.state.lyricsStatusArray.length ){
          i = 0;
        }
        this.props.dispatch( lyricsWindowStatus(array[i],songsId) );
      }
    })
    if( this.state.lyricsStatus=='close' ){
      this.props.dispatch( selectViceNav('') );
    }
  }

  replayStatus(status){
    let replayStatusArray       = this.state.replayStatusArray,
        replayStatusArrayLength = replayStatusArray.length,
        _select                 = 0;

    for(var i=0 ; i < replayStatusArrayLength ; i++){
      if( this.state.replayStatus == replayStatusArray[i] ){
        _select = i+1;
        if( _select>=replayStatusArrayLength ){
          _select = 0;
        }
      }
    }
    this.props.dispatch( replayStatus(replayStatusArray[_select]) );
  }

  //上下首
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
        this.props.dispatch( selectListenAction( array[i] ) );
      }
    })
  }
}

function mapStateToProps(state){
  return{
    playList        : state.playList.data,
    selectListen    : state.playList.selectListen,
    audio           : state.audio,
    lyrics          : state.lyrics,
    nav             : state.nav,
    profile         : state.login.profile,
  }
}

export default connect(mapStateToProps)(Audio);
