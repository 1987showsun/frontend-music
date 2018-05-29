import React      from 'react';
import {Link}     from 'react-router';
import {connect}  from 'react-redux';
import $          from 'jquery';

//reducer
import {collectionAction,collectionAddAction}             from '../../actions/collectionAction';
import {loginProtectedAction}                             from '../../actions/loginAction';

//Component
import ColumnList from '../module/listColumn';
import BlockList  from '../module/listBlock';
import CollectionPlayList   from './playlist';

@connect((state,props)=>{
  return{
    profile           : state.login.profile,
    collection        : state.collection,
  }
})

export default class Collection extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profileId           : '',
      params              : '',
      profile             : [],
      collection          : [],
      songsList           : [],
      PlayRecordList      : [],
      fuckSwitch          : 'true',
      theme               : ['albumCollection','songsCollection','playRecord','playList'],
    }
  }

  componentDidMount(){
    this.setState({
      params : (this.props.params.theme!=undefined)? this.props.params.theme : this.state.theme[0]
    })
    const authorization = JSON.parse(sessionStorage.getItem('login')) || '';
    if( authorization!='' ){
      const token = authorization.token;
      this.props.dispatch( loginProtectedAction(token) );
    }
  }

  componentWillReceiveProps(nextProps) {
    const params = (nextProps.params.theme!=undefined)? nextProps.params.theme : this.state.theme[0];
    this.setState({
      profile         : (nextProps.profile.data!=undefined)? nextProps.profile.data : [],
      params          : (nextProps.params.theme!=undefined)? nextProps.params.theme : this.state.theme[0],
      albumList       : (nextProps.collection.data!=undefined)? nextProps.collection.data.data : [],
      songsList       : (nextProps.collection.songsCollection!=undefined)? nextProps.collection.songsCollection.data : [],
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if( prevState.params!=this.state.params ){
      if(this.state.profile[0]!=undefined){
        const params = this.state.params;
        const _id    = this.state.profile[0]._id;
        this.props.dispatch( collectionAction(params,_id) );
      }
    }else{
      if(this.state.fuckSwitch){
        if(this.state.profile[0]!=undefined){
          const params = this.state.params;
          const _id    = this.state.profile[0]._id;
          this.props.dispatch( collectionAction(params,_id) );
        }
        this.setState({
          fuckSwitch : false,
        })
      }
    }
  }

  renderView(){
    if(this.state.params!=''){
      switch( this.state.params ){
        case this.state.theme[0] :

          if(this.state.albumList!=undefined){
            if( this.state.albumList.length>0 ){
              return (<BlockList data={this.state.albumList} model="model1" arrangement="Block" type="album" direction=""/>)
            }else{
              return (<div className="notdata">No Record</div>);
            }
          }
          break;

        case this.state.theme[1] :
          if(this.state.songsList!=undefined ){
            if(this.state.songsList.length>0){
              return (<ColumnList data={this.state.songsList} tdNumber='4' type='songsList'/>)
            }else{
              return (<div className="notdata">No Record</div>);
            }
          }
          break;

        case this.state.theme[2] :
          if( this.state.PlayRecordList!=undefined ){
            if( this.state.PlayRecordList.length>0 ){
              return <ColumnList data={this.state.PlayRecordList} tdNumber='4' type='songsList'/>
            }else{
              return (<section className="message">No Record</section>);
            }
          }
          break;

        case this.state.theme[3] :
        return <CollectionPlayList />
          break;
      }
    }
  }

  render(){
    return (
      <div className="bottom">
        {this.renderView()}
      </div>
    )
  }
}
