import React,{Component}                  from 'react';
import {connect}                          from 'react-redux';
import {Link,browserHistory,hashHistory}  from 'react-router';
import { FacebookLogin }                  from 'react-facebook-login-component';
import store                              from "../../store";

//reducer
import {loginAction,shareLoginAction} from '../../actions/loginAction';
import {noteAction} from '../../actions/noteAction';

@connect((state,props) =>{
  return {
    login       : state.login.data,
    note        : state.noteAction,
    token       : state.login.token
  };
})

export default class ShareLogin extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password : '',
      facebook : [],
      test : 'false'
    }
  }

  componentDidMount() {
    this.responseFacebook();
  }

  responseFacebook(response){
    store.dispatch( shareLoginAction(response) );
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
      <ul className="shear">
        <li className="facebook">
          <FacebookLogin socialId="100703890470016"
            language="zh_TW"
            fields="id,name,email,picture,cover,age_range,link,locale,friends"
            scope="user_friends,public_profile,email"
            responseHandler={this.responseFacebook}
            xfbml={true}
            version="v2.5"
            className="facebook-login"
            buttonText="f"/>
        </li>
      </ul>
    )
  }
}
