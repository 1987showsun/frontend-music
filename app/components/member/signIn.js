import React,{Component}                  from 'react';
import {Link,browserHistory,hashHistory}  from 'react-router';
import { connect }                        from 'react-redux';
import $                                  from 'jquery';

//reducer
import store                              from "../../store";
import {loginAction,shareLoginAction}     from '../../actions/loginAction';
import {noteAction}                       from '../../actions/noteAction';

//Component
import ShareLoginComponent from './sharelogin';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props) =>{
  return {
    login       : state.login.data,
    note        : state.noteAction,
    token       : state.login.token
  };
})

export default class SignIn extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password : '',
      facebook : [],
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  handleSubmit(){
    this.props.dispatch( loginAction(this.state) );
  }

  componentDidMount() {
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  backUp(){
    window.history.go(-1);
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.token.success ){
      browserHistory.push('/');
      const noteText = '';
      const status   = '';
      this.props.dispatch( noteAction(noteText,status) );
    }
  }

  render(){
    return(
        <div id="member">
          <div className="logo">
            <Link to="/">GINITUNE</Link>
          </div>
          <input type="mail" name="username" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="E-mail"/>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="Password"/>
          <button className="login" onClick={ this.handleSubmit.bind(this) }>Login</button>
          <button className="back" onClick={ this.backUp.bind(this) }>Back Up</button>
          <p>Don't have an account? <Link to="/member/-signup">Register here.</Link> Or login with:</p>
          <ShareLoginComponent />
        </div>
    );
  }
}
