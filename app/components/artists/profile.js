import React,{Component}                  from 'react';
import {connect}                          from 'react-redux';
import {Link,hashHistory,browserHistory}  from 'react-router';
import $                                  from 'jquery';

//Component
import BlockList  from '../module/listBlock';

//reducer
import {getSelectArtists,getArtistsSwitch}  from '../../actions/artistsAction';

//
import list                                 from '../../public/javascripts/list.js';
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props)=>{
  return{
    artists : state.artists
  }
})

export default class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      params          : '',
      artistsId       : '',
      artistsProfile  : [],
    }
  }

  componentDidMount() {
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      params          : nextProps.params.area,
      artistsId       : nextProps.params.id,
      artistsProfile  : (nextProps.artists.select!=undefined)? nextProps.artists.select.data : [],
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if( this.state.artistsId!=undefined ){
      if( prevState.artistsId!=this.state.artistsId ){
        this.props.dispatch( getSelectArtists(this.state.params,this.state.artistsId) );
      }
    }
  }

  profile(){
    if(this.props.params.id!=undefined){
      return true;
    }else{
      return false;
    }
  }

  closeProfile(){
    browserHistory.push('/artists/'+this.state.params);
  }

  render(){
    return(
      <div className={"profile "+this.profile()}>
        <div className="profileTool">
          <span></span>
          <button className="sharebutton prev" onClick={this.closeProfile.bind(this)}></button>
        </div>
        <div className="scrollbar-outer">
          <div className="in">
            {this.info()}
            <div className="bottom">
              <div className="pageHeader">
                <div className="pageTitle">Popular Albums</div>
              </div>
              {this.album()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  info(){
    if(this.state.artistsProfile!=''){
      const profile    = this.state.artistsProfile[0];
      const keys       = Object.keys(profile);
      const keysLength = keys.length;

      const renderView = keys.map((key,i)=>{
        const _typeof     = typeof profile[key];
        const _content    = profile[key];
        if( _typeof=='object' ){
          const _contentLength  = _content.length;
          if(_contentLength>0 && _content!=''){
            const _contentArray = _content.map((item,i)=>{
              return (<p>{item}</p>);
            });
            if( key!='community' ){
              //不是社群 Object
              return (
                <li key={i}>
                  <ul>
                    <li>{key}</li>
                    <li>{_contentArray}</li>
                  </ul>
                </li>
              );
            }else if(key=='community'){
              if( Object.keys(profile[key]).length>0 ){
                const _communityArray  = profile[key];
                const _communityLength = _communityArray.length;

                const _communityRender = _communityArray.map((item,i)=>{
                  const _keys = Object.keys(item);
                  return {
                    _keys : _keys,
                    url   : item[_keys],
                  };
                })

                return (
                  <li key={i}>
                    <a className={'community '+_communityRender[0]._keys} href={ _communityRender[0].url } target="_blank">{_communityRender[0]._keys}</a>
                  </li>
                );
              }
            }
          }
        }else if( _typeof=='string' ){
          if(key!='profile' && key !='_id' && key!='coverImage' && key!='area'){
            if(_content!=''){
              return (
                <li key={i}>
                  <ul>
                    <li>{key.replace("_", " ")}</li>
                    <li>{_content}</li>
                  </ul>
                </li>
              )
            }
          }
        }
      })

      return(
        <div className="top">
          <div className="left">
            <img src={profile.profile}></img>
          </div>
          <div className="right">
            <ul className="list">
              {renderView}
            </ul>
          </div>
        </div>
      )
    }
  }

  album(){
    if( this.props.artists.select!=undefined ){
      if( this.props.artists.select.albums.length>0 ){
        return (
          <BlockList data={this.props.artists.select.albums} model="model1" arrangement="Block" type="album" direction=""/>
        )
      }else{
        return (
          <div>No Albums</div>
        );
      }
    }
  }
}
