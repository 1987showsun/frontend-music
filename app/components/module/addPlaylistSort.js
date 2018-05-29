import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

//action
import { openPlaylistSortNote,addPlaylistSort,editPlaylistSort,addSelectPlaylistSong,removePlaylistSongs,removeSelectPlaylistSongs,getPlaylistSortList }  from '../../actions/collectionAction';

@connect((store)=>{
  return{
    collection : store.collection
  }
})

class AddPlaylistSort extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      sortName      : '',
      playListSort  : [],
      addStatus     : false,
      beforeName    : '',
      songsId       : '',
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sortName     : nextProps.collection.beforeName,
      playListSort : nextProps.collection.playListSort,
      addStatus    : (nextProps.collection.playListSort.addStatus!=undefined)? nextProps.collection.playListSort.addStatus : false,
      beforeName   : (nextProps.collection.beforeName!=undefined)? nextProps.collection.beforeName : '',
      songsId      : nextProps.collection.songsId,
    })
  }

  createNewPlaylist(profileId,sortName,beforeName,noteType){
    switch(noteType){
      case 'add':
        this.props.dispatch( addPlaylistSort( profileId,sortName ) );
        break;

      case 'edit':
        this.props.dispatch( editPlaylistSort( profileId,sortName,beforeName) );
        break;

      case 'addInPlaylist':
        break;
    }
  }

  addPlaylistSort(status){
    this.props.dispatch( openPlaylistSortNote(status) );
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.addStatus!=this.state.addStatus){
      this.setState({
        addStatus : false
      })
      this.props.dispatch( openPlaylistSortNote(false) );
    }
  }

  noteText(noteType){
    let title         = '',
        placeholder   = '';

    switch(noteType){
      case 'add':
        title       = 'Enter name of the playlist';
        placeholder = 'Please input playlist name';
        break;

      case 'edit':
        title       = 'Update Playlist';
        placeholder = 'Please input update playlist name';
        break;

      case 'addInPlaylist':
        title       = 'Playlist Sort';
        placeholder = '';
        break;

    }
    return{
      title       : title,
      placeholder : placeholder
    }
  }

  addPlaylistSong(selectItem){

    let profileId            = this.props.profile.data[0]._id,
        selectSongsId        = this.state.songsId,
        selectSort           = selectItem.name,
        selectItemList       = selectItem.list,
        selectItemListLength = selectItemList.length,
        statusArray          = ['add','remove'],
        selectStatus         = statusArray[0];

    if(selectItemListLength>0){
      for(var i=0 ; i < selectItemListLength ; i++){
        if( selectItemList[i]==selectSongsId ){
          selectStatus = statusArray[1];
        }
      }
    }

    switch(selectStatus){
      case statusArray[0]:
        this.props.dispatch( addSelectPlaylistSong(profileId,selectSort,selectSongsId) )
        break;

      case statusArray[1]:
        this.props.dispatch( removeSelectPlaylistSongs(profileId,selectSort,selectSongsId) )
        break;
    }
  }

  checkSongsWhetherTheIncluded(data){
    if(data!=undefined){
      for(var i=0 ; i < data.list.length ; i++){
        if( data.list[i]==this.state.songsId ){
          return 'checked';
        }
      }
    }
  }

  selectView(noteType){
    let profileId   = this.props.profile.data[0]._id,
        sortName    = this.state.sortName,
        beforeName  = this.state.beforeName;

    switch(noteType){
      case 'addInPlaylist':
        if( this.state.playListSort.data!=undefined ){

          const playListSort = this.state.playListSort.data;
          return(
            <div className={"in "+noteType}>
              <div className="title">{this.noteText(noteType).title}</div>
              <ul className="nav">
                {
                  playListSort.map((item,i)=>{
                    return (
                      <li key={i} className={this.checkSongsWhetherTheIncluded(item)} onClick={this.addPlaylistSong.bind(this,item)}>
                        <span className="checkout"></span>
                        {item.name}
                      </li>
                    );
                  })
                }
              </ul>
              <button className="close" onClick={this.addPlaylistSort.bind(this,false)}></button>
            </div>
          );
        }
        break;

      default :
        return(
          <article className="in">
            <p>{this.noteText(noteType).title}</p>
            <input type="text" name="sortName" value={this.state.sortName} onChange={this.handleChange.bind(this)} placeholder={this.noteText(noteType).placeholder}/>
            <button onClick={this.addPlaylistSort.bind(this,false)} className="button cancel">Cancel</button>
            <button onClick={this.createNewPlaylist.bind(this,profileId,sortName,beforeName,noteType)} className="button create">Create</button>
            <button className="close" onClick={this.addPlaylistSort.bind(this,false)}></button>
          </article>
        );
        break;
    }
  }

  render(){
    if( this.props.collection.windowStatus ){
      return(
        <div className="addPlaylistSort">
          <div className="null" onClick={this.addPlaylistSort.bind(this,false)}></div>
          {this.selectView(this.props.collection.noteType)}
        </div>
      );
    }else if( !this.props.collection.windowStatus ){
      return null;
    }

  }
}

function mapStateToProps(state){
  return{
    profile       : state.login.profile,
    collection    : state.collection
  }
}

export default connect(mapStateToProps)(AddPlaylistSort);
