import React              from 'react';
import { connect }        from 'react-redux';

import list               from '../../public/javascripts/list.js';

//redux action
import { playlistAction, selectListenAction,deleteListenAction }  from "../../actions/playListAction";
import {collectionAction,collectionAddAction,removePlaylistSongs,getPlaylistSortList,openPlaylistSortNote} from '../../actions/collectionAction';
import {noteAction}                                               from '../../actions/noteAction';

@connect((store) =>{
  return {
    collection        : store.collection,
    playList          : store.playList,
    note              : store.noteAction,
  };
})

class ColumnList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      token             : JSON.parse( sessionStorage.getItem('login') ) || [],
      songsCollection   : [],
      params            : 'songsCollection',
      contextMenuSwitch : false,
    }
  }

  selectSongs(id){
    if(this.state.token!=''){
      this.props.dispatch( playlistAction(id) );
    }else{
      const noteText = '請先登入會員';
      const status   = 'notLogin'
      this.props.dispatch( noteAction(noteText,status) );
    }
  }

  selectListen(item){
    this.props.dispatch( selectListenAction(item) );
    document.getElementsByClassName('react-audio-player ')[0].play();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      songsCollection : nextProps.collection.songsCollection
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

  playListDeleteSongs(item){
    this.props.dispatch( deleteListenAction(item) );
  }

  nowPlaySongs(playListId){
    if(this.props.selectListen!=undefined){
      if( playListId==this.props.selectListen._id ){
        return true;
      }else{
        return false;
      }
    }
  }

  componentDidMount() {
    list();
  }

  componentDidUpdate(prevProps, prevState) {
    list();
  }

  removePlaylistSongs(sort,songsId){
    const id  = this.props.profile.data[0]._id;
    this.props.dispatch( removePlaylistSongs(id,sort,songsId) );
  }

  addPlaylistSort(status,noteType,beforeName,songsId){
    if( this.props.profile!='' ){
      this.props.dispatch( openPlaylistSortNote(status,noteType,beforeName,songsId) );
    }else{
      const noteText = '請登入會員在進行收藏';
      const status   = 'notLogin'
      this.props.dispatch( noteAction(noteText,status) );
    }
  }

  renderSelect(){
    var returnView = '';
    switch(this.props.tdNumber){
      case '3':
          returnView = this.props.data.map((item,i)=>{
            return(
              <li className={this.nowPlaySongs( item._id )} key={item._id}>
                <ul ref={item._id} key={item._id}>
                  <li className="nu">
                    {i+1}
                    <div className="playing-icon-container">
                      <div className="playing-icon">
                        <div className="share one"></div>
                        <div className="share two"></div>
                        <div className="share three"></div>
                      </div>
                    </div>
                  </li>
                  <li className="name" onClick={this.selectListen.bind(this,item)}>{item.name}</li>
                  <li className="time">{item.time}</li>
                </ul>
                <button className="delete" onClick={this.playListDeleteSongs.bind(this,item._id)}></button>
              </li>
            );
          })
        break;

      case '4':
          returnView = this.props.data.map((item,i)=>{
            return (
              <li ref={item._id} key={item._id}>
                <ul>
                  <li className="nu">{i+1}</li>
                  <li className="name" onClick={this.selectSongs.bind(this,item._id)}>{item.name}</li>
                  <li className="time">{item.time}</li>
                  <li className="action">
                    <ul>
                      <li className={"actionShare collection add "+this.checkSongsCollection(item._id)} onClick={this.addSongsCollection.bind(this,item._id)}></li>
                      <li className={"playlist-sort "} onClick={this.addPlaylistSort.bind(this,true,"addInPlaylist","",item._id)}></li>
                    </ul>
                  </li>
                </ul>
              </li>
            );
          })
        break;

      case '5':
          returnView = this.props.data.map((item,i)=>{
            return (
              <li key={i}>
                <ul>
                  <li className="nu">{i+1}</li>
                  <li className="name" onClick={this.selectSongs.bind(this,item._id)}>{item.name}</li>
                  <li className="time">{item.time}</li>
                  <li className="action">
                    <ul>
                      <li className={"actionShare collection add "+this.checkSongsCollection(item._id)} onClick={this.addSongsCollection.bind(this,item._id)}></li>
                      <li className={"remove"} onClick={this.removePlaylistSongs.bind(this,this.props.sort,item._id)}></li>
                    </ul>
                  </li>
                </ul>
              </li>
            );
          })
        break;
    }
    return returnView;
  }

  checkSongsCollection(songsId){
    var checkVal = false;
    if(this.props.collection.songsCollection!=undefined){
      if( this.props.collection.songsCollection.data!=undefined ){
        if( this.props.collection.songsCollection.data.length>0 ){
          this.props.collection.songsCollection.data.map((item,i)=>{
            if(item._id===songsId){
              checkVal = true;
            }
          })
        }
      }
    }
    return checkVal;
  }

  addSongsCollection(songsId){
    if( this.props.profile!='' ){
      const params    = 'songsCollection';
      const memberId  = this.props.profile.data[0]._id;
      this.props.dispatch( collectionAddAction(params,memberId,songsId) );
    }else{
      const noteText = '請登入會員在進行收藏';
      const status   = 'notLogin'
      this.props.dispatch( noteAction(noteText,status) );
    }
  }

  render(){
    if(this.props.data!='' && this.props.data!=undefined){
      if( this.props.data.length>0 ){
        return(
          <ul className={"list Column model1 style1 "+this.props.type}>
            {this.renderSelect()}
          </ul>
        )
      }else{
        return(
          <section className="message">No Songs</section>
        )
      }
    }else{
      return null;
    }
  }
}

function mapStateToProps(state){
  return{
    profile         : state.login.profile,
    playList        : state.playList,
    selectListen    : state.playList.selectListen,
    collection      : state.collection,
  }
}

export default connect(mapStateToProps)(ColumnList);
