import React,{Compoent} from 'react';
import {connect}        from 'react-redux';

//actions
import {chatEmit} from '../../actions/chat';

class Chatform extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      author : "",
      text   : ""
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let author = this.state.author,
        text   = this.state.text;

    this.props.dispatch( chatEmit(author,text) );

    this.setState({
      author : "",
      text   : "",
    })


  }

  render(){
    return (
      <form className='comment-input' onSubmit={this.handleSubmit.bind(this)}>
        <input className='author' type='text' placeholder='名字' name="author" value={this.state.author} onChange={this.handleChange.bind(this)} />
        <input className='text' type='text' placeholder='留言' name="text" value={this.state.text} onChange={this.handleChange.bind(this)} />
        <input className='submit' type='submit' value='送出' />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return{

  }
}

export default connect(mapStateToProps)(Chatform);
