import React                  from 'react';
import {Link,browserHistory}  from 'react-router'
import { connect }            from 'react-redux';

//reducer
 import {loginAction} from '../../actions/loginAction';

@connect((store) =>{
  return {
    login  : store.login.data
  };
})

export default class LoginPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password : '',
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

  shareLogin(type){
    const typeArray = [
      'facebook',
      'google'
    ]
    switch(type){
      case typeArray[0] :
        break;

      case typeArray[1] :
        break;
    }
  }

  backUp(){
    window.history.go(-1);
  }

  render(){
    const {login} = this.props;
    if( login.success ){
      browserHistory.push('/');
    }

    return(
      <div id="member">
        <div className="logo">
          <Link to="/">MUZICER</Link>
        </div>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="E-mail"/>
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="Password"/>
        <button className="login" onClick={ this.handleSubmit.bind(this) }>Login</button>
        <button className="back" onClick={ this.backUp.bind(this) }>Back Up</button>
        <p>Don't have an account? <Link to="/member/join">Register here.</Link> Or login with:</p>
        <ul className="shear">
          <li onClick={this.shareLogin.bind(this,'facebook')}></li>
          <li onClick={this.shareLogin.bind(this,'google')}></li>
        </ul>
      </div>
    );
  }
}
