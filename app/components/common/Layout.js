import React            from 'react';
import { connect }      from "react-redux";
import {Link}           from 'react-router';

import Nav              from '../common/Nav.js';
import ViceNav          from '../common/viceNav.js';
import Header           from '../common/Header.js';
import Playlist         from '../module/playlist';
import Audio            from '../module/audio';
import Player           from '../module/player';
import AddPlaylistSort  from '../module/addPlaylistSort';
import Lyricss          from '../module/lyrics';
import Note             from './note';

//action
import { navAction }                        from '../../actions/navAction';
import { openPlaylistSortNote }             from '../../actions/collectionAction';
import { nowPage }                          from '../../actions/allpage';

//javascripts
import {scrollmove} from '../../public/javascripts/share.js';

@connect((store) =>{
  return {
    note              : store.note,
    nav               : store.nav,
    nowpage           : store.nowpage,
  };
})

class Layout extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      nowPage           : '',
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      nowPage : nextProps.location.pathname.split('/')[1],
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if( prevState.nowPage!=this.state.nowPage ){
      this.props.dispatch( nowPage(this.state.nowPage) )
    }
  }

  sss(){
    if(this.props.nav.selectVal=='playlist'){
      return true;
    }
    return '';
  }

  render(){
    const {playList,note} = this.props;
    const {params} = this.props;
    return(
      <main id="wrapper" className="padding">
        <Nav params={params} nowPage={this.state.nowPage}/>
        <main className="container">
          {this.props.children}
          <aside className={"content right "+this.sss()}>
            <Playlist />
          </aside>
        </main>
        <Audio/>
        <Player pathname={this.props.location.pathname}/>
        <Note />
        <AddPlaylistSort />
        <Lyricss />
        <ViceNav/>
      </main>
    );
  }
}

function mapStateToProps(state){
  return{
    playList    : state.playList,
    note        : state.note,
    collection  : state.collection,
    nowpage     : state.nowpage,
    nav         : state.nav
  }
}

export default connect(mapStateToProps)(Layout);
