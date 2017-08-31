import React            from 'react';
import { connect }      from "react-redux";

import Nav              from '../common/Nav.js';
import Header           from '../common/Header.js';
import Playlist         from '../module/playlist';
import Audio            from '../module/audio';

class Layout extends React.Component{
  render(){
    const {playList} = this.props;
    const {params} = this.props;
    return(
      <div id="wrapper">
        <Nav params={params}/>
        <div className="container">
          {this.props.children}
          <div className="content right">
            <Playlist />
          </div>
        </div>
        <Audio/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    playList : state.playList
  }
}

export default connect(mapStateToProps)(Layout);
