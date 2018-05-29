import React            from 'react';
import { connect }      from "react-redux";
import {createStore,combineReducers,applyMiddleware} from 'redux';
import $                from 'jquery';
import {Link}           from 'react-router';

//redux action
import { index }    from '../../actions/index';

//Component
import MainBanner from '../module/mainBanner';
import BlockList  from '../module/listBlock';
import Footer     from '../common/Footer.js';


//CSS
import '../../public/stylesheets/index.scss';
import '../../public/stylesheets/slick.scss';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props) => {
  return {
    index      : state.index
  };
})

export default class Index extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      mainBanner     : [],
      theLatestAlbum : [],
      chinesehito    : [],
      westernhito    : [],
      japanesehito   : [],
      koreanhito     : [],
      artistshito    : [],
    }
  }

  componentDidMount() {
    this.props.dispatch( index() );
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mainBanner      : nextProps.index.kvData,
      theLatestAlbum  : nextProps.index.theLatestAlbum,
      chinesehito     : nextProps.index.chinesehito,
      westernhito     : nextProps.index.westernhito,
      japanesehito    : nextProps.index.japanesehito,
      koreanhito      : nextProps.index.koreanhito,
      artistshito     : nextProps.index.artistshito,
    })
  }

  render(){
    return(
      <main className="content left">
        <article className="scrollbar-outer">
          <article className="in">
            <MainBanner data={this.state.mainBanner}/>
            <article className="block">
              <section className="header">
                <span className="caption">New Albums</span>
              </section>
              <BlockList  data={this.state.theLatestAlbum} model="model1" arrangement="Block" type="album" direction=""/>
            </article>
            <article className="block">
              <section className="header">
                <span className="caption">Top Albums</span>
              </section>
              <article className="scrollbar-outer">
                <BlockList  data={this.state.chinesehito} model="model3" arrangement="Column" type="album" direction=""/>
                <BlockList  data={this.state.japanesehito} model="model3" arrangement="Column" type="album" direction=""/>
                <BlockList  data={this.state.westernhito} model="model3" arrangement="Column" type="album" direction=""/>
                <BlockList  data={this.state.koreanhito} model="model3" arrangement="Column" type="album" direction=""/>
              </article>
            </article>
            <article className="block">
              <section className="header">
                <span className="caption">Hot Artists</span>
              </section>
              <article className="scrollbar-outer">
                <BlockList  data={this.state.artistshito} model="model1" arrangement="Block" type="artists" direction="horizontal"/>
              </article>
            </article>
            <Footer />
          </article>
        </article>
      </main>
    );
  }
}
