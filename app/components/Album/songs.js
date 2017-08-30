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
  componentDidMount() {
    this.props.dispatch( songsListAction(this.props));
  }

  selectRender(){
    const {songsList} = this.props;
    if( songsList.data==undefined || songsList.data.length==0 ){
      return(
        <div id="songsListNote">No Songs Data</div>
      )
    }else{
      return(
        <ColumnList data={songsList} tdNumber='4' type='songsList'/>
      )
    }
  }

  render(){
    const {songsList} = this.props;
    return(
      <div className="content left">
        <AlbumAbout data={songsList.album} />
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
