import React,{Component}                    from 'react';
import {connect}                            from 'react-redux';
import {Link}                               from 'react-router';

//component
import { noteAction }                       from '../../actions/noteAction';

@connect((store) =>{
  return {
    note              : store.note,
  };
})

class Note extends React.Component{

  closeWindow(){
    const noteText = '';
    const status   = '';
    this.props.dispatch( noteAction(noteText,status) );
  }

  returnView(note){
    const status = ['notLogin','addMember']
    switch( note.status ){
      case status[0] :
        return(
          <div className="action">
            <Link to="/member/-signin" onClick={this.closeWindow.bind(this)}>SignIn</Link>
            <Link to="/member/-signup" onClick={this.closeWindow.bind(this)}>SignUp</Link>
            <button className="closeWindow" onClick={this.closeWindow.bind(this)}>ClOSE</button>
          </div>
        )
        break;

      case status[1] :
        return(
          <div className="action">
            <button className="closeWindow" onClick={this.closeWindow.bind(this)}>ClOSE</button>
          </div>
        )
        break;
    }
  }

  render(){
    const {note} = this.props;
    if( note.data!='' ){
      return (
        <article id="note">
          <article className="null" onClick={this.closeWindow.bind(this)}></article>
          <article className="in">
            <div className="text">
              {note.data}
            </div>
            {this.returnView(note)}
          </article>
        </article>
      )
    }else{
      return null;
    }
  }
}

function mapStateToProps(state){
  return{
    note        : state.note,
  }
}

export default connect(mapStateToProps)(Note);
