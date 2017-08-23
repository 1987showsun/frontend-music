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

import $mainBanner from '../../public/javascripts/mainBanner.js';
import '../../public/stylesheets/index.scss';

@connect((store) => {
  return {
    mainBanner  : store.mainBanner.data,
    hitoAlbum   : store.hitoAlbum.data
  };
})

export default class Index extends React.Component{

  componentDidMount() {
    this.props.dispatch(mainBannerActions());
    this.props.dispatch(hitoAlbumAction());
    $mainBanner();
  }

  render(){
    const {mainBanner,hitoAlbum} = this.props;

    return(
      <div className="content left">
        <MainBanner data={mainBanner} />
        <BlockList data={hitoAlbum}/>
        <Footer />
      </div>
    );
  }
}
