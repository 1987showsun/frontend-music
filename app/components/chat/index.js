import React,{Component} from 'react';
import {connect}         from 'react-redux';
import io                from 'socket.io-client';

let socket  = io('http://localhost:4000');
let message = [];

import Message           from './message';
import Chatform          from './form';

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profile : [],
      message : []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile : nextProps.profile
    })
  }

  componentDidMount(){
    let message = this.state.message;
    socket.on('chat2', function(msg){
      message.push(msg)
      this.setState({
        message : message,
      })
    }.bind(this))
  }

  render(){
    return (
      <main className="content left">
        <Message message={this.state.message}/>
        <Chatform />
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login : state.login.profile
  }
}

export default connect(mapStateToProps)(Chat);
