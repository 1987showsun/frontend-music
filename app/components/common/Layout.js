import React            from 'react';
import { connect }      from "react-redux";

import Nav              from '../common/Nav.js';
import Header           from '../common/Header.js';
import Playlist         from '../module/playlist';
import Audio            from '../module/audio';

export default class Layout extends React.Component{
  render(){
    return(
      <div id="wrapper">
        <Nav />
        <div className="container">
          {this.props.children}
          <div className="content right">
            <Playlist />
          </div>
        </div>
        <Audio />
      </div>
    );
  }
}
