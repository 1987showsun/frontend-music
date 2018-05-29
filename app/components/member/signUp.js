import React,{Component}            from 'react';
import {Link}                       from 'react-router';
import {connect}                    from 'react-redux';
import $                            from 'jquery';


//reducer
import {joinMemberAction,getAllMemberName}      from '../../actions/loginAction';
import {noteAction}                             from '../../actions/noteAction';

//Component
import ShareLoginComponent                      from './sharelogin';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props)=>{
  return{
    login       : state.login,
    note        : state.noteAction,
  }
})

export default class SignUp extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username  : '',
      password  : '',
      name      : '',
      tel       : '',
      email     : '',
      address   : '',
      headShot  : '',
      checkUsername : '',
    }
  }

  componentDidMount() {
    this.props.dispatch( getAllMemberName() );
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })

    if( [e.target.name]=='email' ){
      if( this.props.login.username!=undefined ){
        const username        = this.props.login.username;
        const usernameLength  = username.length;
        for(var i=0 ; i < usernameLength ; i++){
          if( username[i]==e.target.value ){
            this.setState({
              checkUsername : false,
            })
            return false;
          }
          if( i==usernameLength-1 ){
            this.setState({
              checkUsername : true,
            })
          }
        }
      }
    }
  }

  handleSubmit(e){
    e.preventDefault();

    let userCheck = false,
        passCheck = false,
        nameCheck = false,
        noteText,
        ststus    = 'addMember';

    if( this.state.email.indexOf('@')>=0 ){
      const mailServer        = this.state.email.split('@')[1].split('.');
      const mailServerLength  = mailServer.length;
      if(mailServerLength>=2){
        userCheck = true;
      }else{
        userCheck = false;
      }
    }

    if( this.state.password.length>=8 ){
      passCheck = true;
    }else{
      passCheck = false;
    }

    if( this.state.name!='' ){
      nameCheck = true;
    }else{
      nameCheck = false;
    }

    if( userCheck && passCheck && nameCheck ){
      if( this.state.checkUsername ){
        var data = [{
          "username"  : this.state.email,
          "password"  : this.state.password,
          "name"      : this.state.name,
          "tel"       : this.state.tel,
          "email"     : this.state.email,
          "address"   : this.state.address
        }]
        this.props.dispatch( joinMemberAction(data) );
      }else{
        noteText = 'The email has already been taken.';
        ststus    = 'addMember';
        this.props.dispatch( noteAction(noteText,ststus) );
      }
    }else{
      if( !userCheck ){
        noteText = 'The email must be a valid email address.';
      }else if( !passCheck ){
        noteText = 'The password must be at least 8 characters.';
      }else if( !nameCheck ){
        noteText = 'The Anonymous field is required.';
      }
      this.props.dispatch( noteAction(noteText,ststus) );
    }
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.login!=undefined ){
      if( nextProps.login.success ){
        location.href = '/';
      }
    }
  }

  backUp(){
    window.history.go(-1);
  }

  render(){
    return(
        <div id="member">
          <div className="logo">
            <Link to="/">GINITUNE</Link>
          </div>
          <form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
            <input className={this.state.checkUsername} type="email" name="email" value={this.state.mail} onChange={this.handleChange.bind(this)} placeholder="E-mail"/>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="Password"/>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="Anonymous"/>
            <input type="tel" name="tel" value={this.state.tel} onChange={this.handleChange.bind(this)} placeholder="Tel"/>
            <input type="address" name="address" value={this.state.address} onChange={this.handleChange.bind(this)} placeholder="Address" />
            <button className="login" type="submit">Submit</button>
          </form>
          <button className="back" onClick={ this.backUp.bind(this) }>Back Up</button>
          <p>or</p>
          <ShareLoginComponent />
        </div>
    )
  }
}
