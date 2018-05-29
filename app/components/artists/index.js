import React,{Component}              from 'react';
import {connect}                      from 'react-redux';
import {Link,hashHistory}             from 'react-router';
import $                              from 'jquery';

//component
import Profile    from './profile';
import Footer     from '../common/Footer.js';

//reducer
import { artistsArea,getArtists,searchArtists } from '../../actions/artistsAction';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props)=>{
  return{
    artists : state.artists
  }
})

export default class ArtistsIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      search        : '',
      area          : [],
      active        : '',
      updataSwitch  : true,
      artists       : [],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      area    : nextProps.artists.area.data,
      active  : (nextProps.params.area!=undefined)? nextProps.params.area : nextProps.artists.area.data[0].path,
      artists : (nextProps.artists.artists!=undefined)? nextProps.artists.artists.data : [],
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if( prevState.active!=this.state.active ){
      var updatedList = [];
      this.props.dispatch( getArtists(this.state.active) );
      this.props.dispatch( searchArtists(updatedList) );
    }else{
      if( this.state.updataSwitch ){
        this.props.dispatch( getArtists(this.state.active) );
        this.setState({
          updataSwitch : false
        })
      }
    }
  }

  componentDidMount() {
    this.props.dispatch( artistsArea() );
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  nowPosition(path){
    if( this.state.active!='' ){
      if(this.state.active==path){
        return 'active';
      }
    }
  }

  areaNav(){
    const renderArea = this.state.area.map((item,i)=>{
      return(
        <li className={this.nowPosition(item.path)} key={item._id}><Link to={"/artists/"+item.path}>{item.english}</Link></li>
      )
    })
    return renderArea;
  }

  handleChange(e){
    var updatedList = this.state.artists;
    updatedList = updatedList.filter(function(item){
      return (item.name_cn.toLowerCase().search( e.target.value.toLowerCase() ) !== -1)
    });
    this.props.dispatch( searchArtists(updatedList) );
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  render(){
    return (
      <main id="artists" className="content left">
        <article className="scrollbar-outer">
          <article className="in">
            <nav className="sitemap">
              <ul>
                {this.areaNav()}
              </ul>
            </nav>
            <div className="tool">
              <div className="sitemap">
                <Link to="/">Home</Link>
                <span className="nextNull">&#62;</span>
                <span>Artists area：<span className="nowSet">{this.state.active}</span></span>
              </div>
              <div className="search">
                <input type="search" name="search" value={this.state.search} onChange={this.handleChange.bind(this)} placeholder="search album name"/>
                <button type="search" onClick=""></button>
              </div>
            </div>
            {this.props.children}
            <Footer />
          </article>
        </article>
        <Profile params={this.props.params}/>
      </main>
    )
  }
}
