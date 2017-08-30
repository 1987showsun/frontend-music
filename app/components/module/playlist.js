import React            from 'react';
import { connect }      from 'react-redux';

//redux action
import { playlistAction,editPlayListAction }  from "../../actions/playListAction";

//Component
import ColumnList       from './listColumn';

class Playlist extends React.Component{

  getInitialState() {
    return {
      playlist : [],
    };
  }

  componentDidMount() {
    this.props.dispatch( editPlayListAction() );
  }

  selectRender(){
    const {playList} = this.props;
    if(playList.data.length==0){
      return(
        <div id="playListNote">!! No Songs !!</div>
      )
    }else{
      return(
        <ColumnList data={playList} tdNumber="3" type='playList'/>
      )
    }
  }

  render(){
    return this.selectRender();
  }
}

function mapStateToProps(state){
  return{
    playList : state.playList
  }
}

export default connect(mapStateToProps)(Playlist);
