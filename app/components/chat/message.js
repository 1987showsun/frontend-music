import React,{Compoent}  from 'react';
import {connect}         from 'react-redux';

export default class MessageList extends React.Component{
  render(){
    return(
      <ul>
        {
          this.props.message.map((item,i)=>{
            return(<li key={i}>{item}</li>)
          })
        }
      </ul>
    )
  }
}
