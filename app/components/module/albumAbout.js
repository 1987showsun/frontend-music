import React,{Component}      from 'react';
import {Link}                 from 'react-router';
import { connect }            from 'react-redux';

import {collectionAction,collectionAddAction} from '../../actions/collectionAction';

const params = 'albumCollection';

@connect((store) => {
  return {
    collection  : store.collection.data,
  };
})

class AlbumAbout extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      member_id : '',
      unfolded  : false
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if( nextProps.login.data!=undefined ){
      if( this.state.member_id!=nextProps.login.data[0]._id ){
        this.setState({
          member_id : nextProps.login.data[0]._id
        })
        const _id = nextProps.login.data[0]._id;
        this.props.dispatch( collectionAction(params,_id) );
      }
    }
  }

  collection(selectId){
    if(this.props.collection!=''){
      const {login} = this.props;
      if(login!=undefined){
        const memberId = login.data[0]._id;
        this.props.dispatch( collectionAddAction(params,memberId,selectId) );
      }
    }
  }

  collectionCheck(){
    if(this.props.collection!=''){
      const {songsList}     = this.props;
      const data            = this.props.collection.data;
      const currentAlbumId  = songsList.album[0]._id;
      for(var i=0 ; i < data.length ; i++) {
        if( data[i]._id == currentAlbumId ){
          return true;
        }
      }
    }
  }

  Unfolded(){
    var _switch = this.state.unfolded;
    if( !this.state.unfolded ){
      _switch = true;
    }else{
      _switch = false;
    }
    this.setState({
      unfolded : _switch
    })
  }

  albumIntroduction(){
    const data              = this.props.data || [];
    const collectionStatus  = this.collectionCheck();

    if( data!='' ){
      return(
        <div>
          <div className="cover">
            <img src={data[0].albumsImg} alt="" title="" />
          </div>
          <div className="introduction">
            <ul className="list Column model2 style1 ">
              <li className="album">{data[0].music_name_cn}</li>
              <li className="artists">{data[0].artists}</li>
              <li className="time">
                <ul>
                  <li>Release date：</li>
                  <li>{data[0].publish_time}</li>
                </ul>
              </li>
              <li className="inc">
                <ul>
                  <li>Release Inc：</li>
                  <li>{data[0].inc}</li>
                </ul>
              </li>
              <li className="tag">
                <ul>
                  <li>Album type：</li>
                  <li>{data[0].tag}</li>
                </ul>
              </li>
            </ul>
            <div className="action">
              <span className="play">Play</span>
              <span className={"shareStyle Collection "+collectionStatus} onClick={this.collection.bind(this,data[0]._id)}>Collection</span>
              <Link className="shareStyle more" to={"/artists/"+data[0].artists_id}>More</Link>
            </div>
          </div>
          <div className={"narrative "+this.state.unfolded}>
            <div className="in" dangerouslySetInnerHTML={{__html: data[0].content}}></div>
            <div className="action">
              <button className="unfolded" onClick={this.Unfolded.bind(this)}>more</button>
            </div>
          </div>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="about album">
        {this.albumIntroduction()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    songsList   : state.songsList.data,
    collection  : state.collection.data._id,
    login       : state.login.data
  }
}

export default connect(mapStateToProps)(AlbumAbout);
