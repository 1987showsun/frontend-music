import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link,browserHistory} from 'react-router';
import $ from 'jquery';

import {mvWindowAction,mvSelectAction} from '../../actions/mvAction';

@connect((store)=>{
  return{
    mv : store.mv
  }
})


class Player extends React.Component{

  windowStatus(windowSwitch,videoId){
    this.props.dispatch( mvWindowAction(windowSwitch) );
    this.props.dispatch( mvSelectAction(videoId) );
    var pathname = this.props.pathname.split('/'),
        pathnameLength  = pathname.length,
        afterPathname   = [],
        newURL          = '';

    for(var i=1 ; i < pathnameLength-1 ; i++ ){
      afterPathname.push(pathname[i])
    }
    for(var i=0 ; i < afterPathname.length ; i++){
      newURL += '/'+afterPathname[i]
    }
    browserHistory.push(newURL);
  }

  checkYoutubeId(){
    if( this.props.mv.selectMv.length>0 ){
      return(
        <iframe src={"https://www.youtube.com/embed/"+this.props.mv.selectMv[0].youtubeId+"?rel=0&amp;showinfo=0;playsinline=1"}></iframe>
      )
    }else{
      return null;
    }
  }

  returnMvNav(){
    var pathname = this.props.pathname.split('/'),
        pathnameLength  = pathname.length,
        afterPathname   = [],
        newURL          = '';

    for(var i=1 ; i < pathnameLength-1 ; i++ ){
      afterPathname.push(pathname[i])
    }
    for(var i=0 ; i < afterPathname.length ; i++){
      newURL += '/'+afterPathname[i]
    }

    const render = this.props.mv.data.map((item,i)=>{
      return(
        <li key={i}>
          <Link to={newURL+'/'+item._id}>
            <figure onClick={this.windowStatus.bind(this,true,item._id)}>
              <img src={item.poster} title={item.name} alt={item.name}/>
              <figcaption>
                <h2>{item.name}</h2>
                <h3>{item.artists}</h3>
              </figcaption>
            </figure>
          </Link>
        </li>
      );
    })
    return render;
  }

  render(){
    return (
      <div id="playerWindow" className={this.props.mv.windowStatus}>
        <div className="shera main">
          {this.checkYoutubeId()}
        </div>
        <button className="close" onClick={this.windowStatus.bind(this,false,'')}></button>
        <div className="shera vic">
          <div className="title">
            <span>MV Playlist</span>
          </div>
          <div className="block">
            <ul className="list Block model1 style1 videoNav">
              {this.returnMvNav()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    mv : state.mv
  }
}

export default connect(mapStateToProps)(Player);
