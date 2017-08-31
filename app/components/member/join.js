import React      from 'react';
import {Link}     from 'react-router';
import {connect}  from 'react-redux';

//reducer
import {joinMemberAction} from '../../actions/loginAction';

@connect((store)=>{
  return{
    login  : store.login.data
  }
})

class Join extends React.Component{

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

    }
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })

    if( [e.target.name]=='username' ){
      //檢查帳號
    }
  }

  handleSubmit(){
    var data = [{
      "username"  : this.state.username,
      "password"  : this.state.password,
      "name"      : this.state.name,
      "tel"       : this.state.tel,
      "email"     : this.state.email,
      "address"   : this.state.address
    }]

    this.props.dispatch( joinMemberAction(data) );
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
    if( nextProps.login!=undefined ){
      if( nextProps.login.success ){
        location.href = '/'
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
          <Link to="/">MUZICER</Link>
        </div>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange.bind(this)} placeholder="Username"/>
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="Password"/>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="Anonymous"/>
        <input type="tel" name="tel" value={this.state.tel} onChange={this.handleChange.bind(this)} placeholder="Tel"/>
        <input type="email" name="email" value={this.state.mail} onChange={this.handleChange.bind(this)} placeholder="E-mail"/>
        <input type="address" name="address" value={this.state.address} onChange={this.handleChange.bind(this)} placeholder="Address"/>
        <button className="login" onClick={ this.handleSubmit.bind(this) }>Login</button>
        <button className="back" onClick={ this.backUp.bind(this) }>Back Up</button>
        <p>or</p>
        <ul className="shear">
          <li onClick={this.shareLogin.bind(this,'facebook')}></li>
          <li onClick={this.shareLogin.bind(this,'google')}></li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    login : state.login.data
  }
}

export default connect(mapStateToProps)(Join);
