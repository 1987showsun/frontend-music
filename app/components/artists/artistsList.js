import React,{Component}  from 'react';
import {connect}          from 'react-redux';
import {Link}             from 'react-router';

import list       from '../../public/javascripts/list.js';

@connect((state,props)=>{
  return{
    artists : state.artists
  }
})

export default class ArtistsList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      list    : [],
      active  : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    var afterList = [];
    if( nextProps.artists.artists!=undefined ){
      afterList = nextProps.artists.artists.data;
      if( nextProps.artists.searchArtists!=undefined && nextProps.artists.searchArtists.length>0 ){
        afterList = nextProps.artists.searchArtists;
      }
    }

    this.setState({
      list    : afterList,
      active  : (this.props.params.area!=undefined)? this.props.params.area : nextProps.artists.area.data[0].path
    })
  }

  componentDidUpdate(prevProps, prevState) {
    list();
  }

  renderView(){
    const renderView = this.state.list.map((item,i)=>{
      return(
        <li key={item._id}>
          <figure>
            <Link to={'/artists/'+this.state.active+'/'+item._id}>
              <img src={item.profile}></img>
              <figcaption>
                <h2>{item.name_cn}</h2>
              </figcaption>
            </Link>
          </figure>
        </li>
      )
    })
    return renderView;
  }

  render(){
    if(this.state.list!=undefined){
      if(this.state.list.length>0){
        return (
          <ul className={"list Block model1 style1 artists"}>
            {this.renderView()}
          </ul>
        )
      }else{
        return (<section className="message">No Artists</section>);
      }
    }else{
      return (<section className="message">No Artists</section>);
    }
  }
}
