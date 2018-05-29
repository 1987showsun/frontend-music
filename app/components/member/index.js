import React            from 'react';
import { connect }      from "react-redux";
import $                from 'jquery';
import { Router, Route, IndexRoute, browserHistory,hashHistory } from 'react-router';

//component
import Note                                     from '../common/note';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props)=>{
  return{
    login : state.login
  }
})

export default class Index extends React.Component{

  componentDidMount() {
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  render(){
    const {login} = this.props;
    return(
      <div id="wrapper">
        <article className="scrollbar-outer">
          {this.props.children}
          <Note />
        </article>
      </div>
    );
  }
}
