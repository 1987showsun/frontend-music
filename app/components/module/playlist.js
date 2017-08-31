import React            from 'react';
import { connect }      from 'react-redux';

//redux action
import { playlistAction,editPlayListAction }  from "../../actions/playListAction";

//Component
import ColumnList       from './listColumn';

class Playlist extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      playlist : [],
    }
  }

  componentDidMount() {
    this.props.dispatch( editPlayListAction() );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      playlist : nextProps.playList.data,
    })
  }

  selectRender(){
    if(this.state.playlist==[]){
      return(
        <div id="playListNote">!! No Songs !!</div>
      )
    }else{
      return(
        <ColumnList data={this.state.playlist} tdNumber="3" type='playList'/>
      )
    }
    //<ColumnList data={this.state.playlist} tdNumber="3" type='playList'/>
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
