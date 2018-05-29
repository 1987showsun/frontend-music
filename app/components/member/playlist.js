import React ,{Component}     from 'react';
import {connect}  from 'react-redux';
import {Link,browserHistory}     from 'react-router';

//Component
import { openPlaylistSortNote,removePlaylistSort }             from '../../actions/collectionAction';

@connect((state,props)=>{
  return{
    profile           : state.login.profile,
    collection        : state.collection,
  }
})

export default class CollectionPlayList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      profile   : [],
      data      : []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile : (nextProps.profile.data[0]!=undefined)? nextProps.profile.data[0] : [],
      data : (nextProps.collection.playListSort.data!=undefined)? nextProps.collection.playListSort.data : [],
    })
  }

  addPlaylistSort(status,noteType,beforeName){
    this.props.dispatch( openPlaylistSortNote(status,noteType,beforeName) );
  }

  remove(sort){
    this.props.dispatch( removePlaylistSort(this.state.profile._id,sort) );
  }

  listSort(){
    let songsId = "";
    var listReturn = this.state.data.map((item,i)=>{
      return (
        <li key={i}>
          <article className="in">
            <ul className="sortTool">
              <li><button className="edit" onClick={this.addPlaylistSort.bind(this,true,"edit",item.name,songsId)}></button></li>
              <li><button className="remove" onClick={this.remove.bind(this,item.name)}></button></li>
            </ul>
            <Link to={'/user/playList/'+item.name} className="block">{item.name}</Link>
          </article>
        </li>
      );
    })

    return listReturn;
  }

  render(){
    let songsId = "";
    return (
      <div className="playlist">
        <ul className="playlistNav">
          <li>
            <div className="block" onClick={this.addPlaylistSort.bind(this,true,"add","",songsId)}></div>
          </li>
          {this.listSort()}
        </ul>
      </div>
    );
  }
}
