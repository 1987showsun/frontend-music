import React                      from 'react';
import { connect }                from 'react-redux';
import $                          from 'jquery';

//redux action
import { playlistAction,editPlayListAction }  from "../../actions/playListAction";

//Component
import ColumnList       from './listColumn';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

class Playlist extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      token                   : JSON.parse( sessionStorage.getItem('login') ) || [],
      playlist                : [],
    }
  }

  componentDidMount() {
    this.props.dispatch( editPlayListAction() );
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      playlist : nextProps.playList.data,
    })
  }

  selectRender(){

    if(this.state.playlist==0){
      return(
        <section className="message">!! No Songs !!</section>
      )
    }else{
      return(
        <ColumnList data={this.state.playlist} tdNumber="3" type='playList'/>
      )
    }
  }

  render(){
    return (
      <article className="scrollbar-outer">
        <article className="in ">
          {this.selectRender()}
        </article>
      </article>
    )
  }
}

function mapStateToProps(state){
  return{
    playList : state.playList
  }
}

export default connect(mapStateToProps)(Playlist);
