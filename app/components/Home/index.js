import React            from 'react';
import { connect }      from "react-redux";
import {createStore,combineReducers,applyMiddleware} from 'redux';
import $                from 'jquery';

//redux action
import { mainBannerActions }  from "../../actions/mainBannerActions";
import { hitoAlbumAction }  from '../../actions/hitoAlbumAction';

//Component
import MainBanner from '../module/mainBanner';
import BlockList  from '../module/listBlock';
import Footer     from '../common/Footer.js';

import '../../public/stylesheets/index.scss';

@connect((store) => {
  return {
    mainBanner  : store.mainBanner.data,
    hitoAlbum   : store.hitoAlbum.data
  };
})

export default class Index extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      mainBanner: [],
      albumList : [],
    }
  }

  componentDidMount() {
    this.props.dispatch(mainBannerActions());
    this.props.dispatch(hitoAlbumAction());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mainBanner : nextProps.mainBanner.data,
      albumList  : nextProps.hitoAlbum.data
    })
  }

  render(){
    return(
      <div className="content left">
        <MainBanner data={this.state.mainBanner} />
        <BlockList  data={this.state.albumList}/>
        <Footer />
      </div>
    );
  }
}
