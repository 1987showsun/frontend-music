import React,{Component}  from 'react';
import {Link}             from 'react-router';
import {connect}          from 'react-redux';
import $                  from 'jquery';

//Compontent
import {lyricsTransfer} from '../../actions/lyrics';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((store) =>{
  return {
    lyrics   : store.lyrics,
  };
})

class Lyricss extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectListen        : [],
      lyricsData          : [],
      lyrics              : '',
      lyricsWindowStatus  : '',
      loadLyricsSwitch    : true,
      lrcObj              : [],
    }
  }

  componentDidMount() {
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  renderLyrics(){
    if( this.state.lyrics!='' ){
      const text = Object.keys(this.state.lyrics).map((item,i)=>{
        return (<div className="lyricsText" data-time={item} key={i}>{this.state.lyrics[item]}</div>);
      })
      return text;
    }else{
      return(
        <section className="message">No Lyrics</section>
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectListen        : nextProps.playList.selectListen,
      lyricsData          : nextProps.lyrics.data,
      lyricsWindowStatus  : nextProps.lyrics.lyricsWindowStatus,
      lyrics              : nextProps.lyrics.text
    })
  }

  render(){
    return(
      <article id="lyrics" className={this.props.lyrics.lyricsWindowStatus}>
        <article className="scrollbar-outer">
          <article className="in">
            {this.renderLyrics()}
          </article>
        </article>
      </article>
    )
  }
}

function mapStateToProps(state){
  return{
    lyrics      : state.lyrics,
    playList    : state.playList,
  }
}

export default connect(mapStateToProps)(Lyricss);
