import React            from 'react';
import { connect }      from 'react-redux';
import $                from 'jquery';

//redux action
import { songsListAction }                      from '../../actions/songsListAction';
import { collectionAction,collectionAddAction } from '../../actions/collectionAction';
import {getMvAction}                            from '../../actions/mvAction';

//Component
import ColumnList from '../module/listColumn';
import AlbumAbout from '../module/albumAbout';
import Mv         from '../module/listVideoBlock';
import Footer     from '../common/Footer.js';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props) =>{
  return {
    songsList       : state.songsList.data,
    collection      : state.collection.data,
    profile         : state.login.profile,
    mv              : state.mv,
    nowpage         : state.allpage.nowpage,
  };
})


export default class Songs extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      videoId         : '',
      member_id       : '',
      albumAbout      : [],
      songsList       : [],
      params          : 'songsCollection',
      songsCollection : [],
      mv              : [],
    }
  }

  componentDidMount() {
    this.props.dispatch( songsListAction(this.props));
    this.props.dispatch( getMvAction(this.props));
    if( this.props.params.videoId!=undefined ){
      this.setState({
        videoId : this.props.params.videoId,
      })
    }
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      albumAbout      : nextProps.songsList.album,
      songsList       : nextProps.songsList.data,
      mv              : nextProps.mv.data,
    })
  }

  componentWillUpdate(nextProps, nextState) {
    const params    = this.state.params;
    if( nextProps.profile.data!=undefined ){
      if( this.state.member_id!=nextProps.profile.data[0]._id ){
        const _id = nextProps.profile.data[0]._id;
        this.setState({
          member_id : _id
        })
        this.props.dispatch( collectionAction(params,_id) );
      }
    }
  }

  selectRender(){
    if( this.state.songsList==[] ){
      return(
        <div id="songsListNote">No Songs Data</div>
      )
    }else{
      return(
        <ColumnList data={this.state.songsList} tdNumber='4' type='songsList'/>
      )
    }
  }

  checkMvHaveData(){
    if( this.state.mv!='' ){
      return (
        <div>
          <div className="pageHeader">
            <div className="pageTitle">Album Mv</div>
          </div>
          <Mv pathname={this.props.location.pathname} videoId={this.state.videoId}/>
        </div>
      )
    }else{
      return null;
    }
  }

  render(){
    return(
      <main className="content left">
        <article className="scrollbar-outer">
          <article className="in ">
            <AlbumAbout data={this.state.albumAbout} />
            {this.selectRender()}
            {this.checkMvHaveData()}
            <Footer />
          </article>
        </article>
      </main>
    );
  }
}
