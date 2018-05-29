import React,{Component}            from 'react';
import {Link,browserHistory}        from 'react-router';
import {connect}                    from 'react-redux';
import $                            from 'jquery';

//action
import {getPlaylistSortSongs,removePlaylistSort}  from '../../actions/collectionAction';
import {replacePlayListAction}                    from '../../actions/playListAction';

//Component
import ColumnList from '../module/listColumn';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props)=>{
  return{
    profile    : state.login.profile,
    collection : state.collection
  }
})

export default class Sort extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profile       : [],
      songs         : [],
      sort          : '',
      reloadSwitch  : true,
    }
  }

  componentDidMount() {
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  closeWindow(){
    let pathname = this.props.pathname.split('/');
    let newURL   = [];
    for(var i=1 ; i < pathname.length-1 ; i++){
      newURL += '/'+pathname[i];
    }
    browserHistory.push(newURL);
  }

  windowStatus(){
    if( this.props.playListSort!=undefined ){
      return true;
    }else {
      return false;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile : (nextProps.profile.data[0]!=undefined)? nextProps.profile.data[0] : [],
      songs   : (nextProps.collection.playListSort.songs!=undefined)? nextProps.collection.playListSort.songs : [],
      sort    : nextProps.playListSort,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if( prevState.sort!=this.state.sort ){
      this.props.dispatch( getPlaylistSortSongs(this.state.sort,this.state.profile._id) );
    }
  }

  renderSongs(){
    if(this.props.collection.playListSort.songs!=undefined){
      if(this.props.collection.playListSort.songs.length>0){
        return (
          <ColumnList data={this.props.collection.playListSort.songs} sort={this.state.sort} tdNumber='5' type='songsList'/>
        )
      }else{
        return (<div className="div-note">No Songs</div>);
      }
    }
  }

  remove(){
    //this.props.dispatch( removePlaylistSort(this.state.profile._id,) );
  }

  ReplacePlayList(){
    this.props.dispatch( replacePlayListAction(this.props.collection.playListSort.songs) );
  }

  render(){
    return (
      <article className={"playlistSort "+this.windowStatus()}>
        <article className="scrollbar-outer">
          <article className="in">
            <article className="top">
              <section className="name">{this.props.playListSort}</section>
              <ul className="action">
                <li><button className="play" title="Replace existing playlist" onClick={this.ReplacePlayList.bind(this)}>Replace PlayList</button></li>
                <li><button className="remove" onClick={this.remove.bind(this,this.props.playListSort)} title="Remove PlayList Sort"></button></li>
                <li><button className="close" onClick={this.closeWindow.bind(this)} title="Close PlayList Sort Window" ></button></li>
              </ul>
            </article>
            <article className="bottom">
              {this.renderSongs()}
            </article>
          </article>
        </article>
      </article>
    );
  }
}
