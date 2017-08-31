import React            from 'react';
import { connect }      from "react-redux";

//redux action
import { songsListAction }  from "../../actions/songsListAction";

//Component
import ColumnList from '../module/listColumn';
import AlbumAbout from '../module/albumAbout';

@connect((store) =>{
  return {
    songsList  : store.songsList.data
  };
})


class Songs extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      albumAbout : [],
      songsList  : []
    }
  }

  componentDidMount() {
    this.props.dispatch( songsListAction(this.props));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      albumAbout : nextProps.songsList.album,
      songsList  : nextProps.songsList.data
    })
  }

  selectRender(){
    if( this.state.songsList==[] ){
      return(
        <div id="songsListNote">No Songs Data</div>
      )
    }else{
      return(
        <ColumnList data={this.state.songsList} tdNumber='4' type='songsList'/>
      )
    }
  }

  render(){
    const {songsList} = this.props;
    return(
      <div className="content left">
        <AlbumAbout data={this.state.albumAbout} />
        {this.selectRender()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    collection : state.collection.data
  }
}

export default connect(mapStateToProps)(Songs);
