import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {mvWindowAction,mvSelectAction} from '../../actions/mvAction';

@connect((store)=>{
  return{
    mv : store.mv
  }
})

class VideoList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      windowStatus  : false,
      mv            : [],
      videoId       : '',
      reloadSwitch  : true,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mv      : nextProps.mv.data,
      videoId : nextProps.videoId,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const videoId = this.state.videoId;
    if(videoId!=undefined && videoId!=''){
        if( prevState.videoId!=videoId ){
          this.props.dispatch( mvWindowAction(true) );
          this.props.dispatch( mvSelectAction(videoId) );
        }else{
          if( this.state.reloadSwitch ){
            this.props.dispatch( mvWindowAction(true) );
            this.props.dispatch( mvSelectAction(videoId) );
            this.setState({
              reloadSwitch : false,
            })
          }
        }
    }
  }

  windowStatus(videoId){
    this.props.dispatch( mvWindowAction(true) );
    this.props.dispatch( mvSelectAction(videoId) );
  }

  returnView(){
    const returnView = this.props.mv.data.map((item,i)=>{
      return(
        <li key={i}>
          <Link to={this.props.pathname+'/'+item._id}>
            <figure onClick={this.windowStatus.bind(this,item._id)}>
              <img src={item.poster} title={item.name} alt={item.name}/>
              <figcaption>
                <h2>{item.name}</h2>
                <h3>{item.artists}</h3>
              </figcaption>
            </figure>
          </Link>
        </li>
      );
    })
    return returnView;
  }

  render(){
    return(
      <ul className="list Block model1 style1 video">
        {this.returnView()}
      </ul>
    );
  }
}

function mapStateToProps(state){
  return{
    mv : state.mv
  }
}

export default connect(mapStateToProps)(VideoList);
