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

  render(){
    const {playList} = this.props;
    return(
      <ColumnList data={playList} tdNumber="3" type='playList'/>
    )
  }
}

function mapStateToProps(state){
  return{
    playList : state.playList
  }
}

export default connect(mapStateToProps)(Playlist)
