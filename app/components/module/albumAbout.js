var token = JSON.parse( sessionStorage.getItem('login') ) || '';
import React,{Component}      from 'react';
import {Link}                 from 'react-router';
import { connect }            from 'react-redux';

import { allAddPlaylist }                       from "../../actions/playListAction";
import { collectionAction,collectionAddAction } from '../../actions/collectionAction';
import { noteAction }                           from '../../actions/noteAction';

@connect((store) => {
  return {
    collection  : store.collection.data,
    note        : store.noteAction,
  };
})

class AlbumAbout extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      token                   : JSON.parse( sessionStorage.getItem('login') ) || [],
      params                  : 'albumCollection',
      member_id               : '',
      profile                 : [],
      albumInfo               : [],
      albumCollection         : [],
      unfolded                : false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile         : (nextProps.profile.length!=0)?    nextProps.profile.data[0] : [],
      albumInfo       : (nextProps.songsList.length!=0)?  nextProps.songsList.album[0] : [],
      albumCollection : (nextProps.collection.length!=0)? nextProps.collection.data : []
    })
  }

  componentWillUpdate(nextProps, nextState) {
    const params    = this.state.params;
    if( nextProps.profile.data!=undefined ){
      if( this.state.member_id!=nextProps.profile.data[0]._id ){
        const _id = nextProps.profile.data[0]._id;
        this.setState({
          member_id : _id
        })
        this.props.dispatch( collectionAction(params,_id) );
      }
    }
  }

  collection(selectId){
    if(this.state.token!=''){
      if(this.state.token.success){
        const memberId  = this.state.profile._id;
        const params    = this.state.params;
        this.props.dispatch( collectionAddAction(params,memberId,selectId) );
      }
    }else{
      const noteText = '請新登入會員在進行收藏';
      const status   = 'notLogin';
      this.props.dispatch( noteAction(noteText,status) );
    }
  }

  collectionCheck(){

    var status    = false;
    if(this.state.token!=[]){
      if(this.state.token.success){
        const albumId = this.state.albumInfo._id;
        this.state.albumCollection.map( (item,i)=>{
          if(item._id==albumId){
            status = true;
          }
        })
      }else{
        status = false;
      }
    }
    return status;
  }

  allAddPlaylist(){
    let albums_id = '';
    if(this.state.token!=''){
      if( this.props.songsList.data.length>0 ){
        albums_id = this.props.songsList.data[0].albums_id;
        this.props.dispatch( allAddPlaylist(albums_id) );
      }
    }else{
      const noteText = '請新登入會員在進行收藏';
      const status   = 'notLogin';
      this.props.dispatch( noteAction(noteText,status) );
    }
  }

  Unfolded(){
    var _switch = this.state.unfolded;
    if( !this.state.unfolded ){
      _switch = true;
    }else{
      _switch = false;
    }
    this.setState({
      unfolded : _switch
    })
  }

  albumContent(){
    if( this.state.albumInfo.content!='' ){
      return(
        <article className={"narrative "+this.state.unfolded}>
          <section className="in" dangerouslySetInnerHTML={{__html: this.state.albumInfo.content}}></section>
          <section className="action">
            <button className="unfolded" onClick={this.Unfolded.bind(this)}>more</button>
          </section>
        </article>
      )
    }else{
      return null;
    }
  }

  albumIntroduction(){
    return(
      <main>
        <article className="info">
          <div className="albumBG" style={{backgroundImage: 'url('+this.state.albumInfo.albumsImg+')'}}></div>
          <aside className="cover">
            <img src={this.state.albumInfo.albumsImg} alt="" title="" />
          </aside>
          <main className="introduction">
            <ul className="list Column model2 style1 ">
              <li className="album">{this.state.albumInfo.music_name_cn}</li>
              <li className="artists"><Link className="noWidth100" to={"/artists/"+this.state.albumInfo.type+'/'+this.state.albumInfo.artists_id}>{this.state.albumInfo.artists}</Link></li>
              <li className="time">
                <ul>
                  <li>Release date</li>
                  <li><span className="colon">：</span>{this.state.albumInfo.publish_time}</li>
                </ul>
              </li>
              <li className="inc">
                <ul>
                  <li>Release Inc</li>
                  <li><span className="colon">：</span>{this.state.albumInfo.inc}</li>
                </ul>
              </li>
              <li className="tag">
                <ul>
                  <li>Album type</li>
                  <li><span className="colon">：</span>{this.state.albumInfo.tag}</li>
                </ul>
              </li>
            </ul>
            <section className="action">
              <span className="play" onClick={this.allAddPlaylist.bind(this)}>Play</span>
              <span className={"shareStyle Collection "+ this.collectionCheck() } onClick={this.collection.bind(this , this.state.albumInfo._id)}>Collection</span>
              <Link className="shareStyle more" to={"/artists/"+this.state.albumInfo.type+'/'+this.state.albumInfo.artists_id}>More</Link>
            </section>
          </main>
        </article>
        {this.albumContent()}
      </main>
    )
  }

  render(){
    return(
      <header className="about album">
        {this.albumIntroduction()}
      </header>
    )
  }
}

function mapStateToProps(state){
  return{
    songsList   : state.songsList.data,
    collection  : state.collection.data,
    profile     : state.login.profile
  }
}

export default connect(mapStateToProps)(AlbumAbout);
