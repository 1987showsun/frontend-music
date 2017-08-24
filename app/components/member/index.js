import React            from 'react';
import { connect }      from "react-redux";


class Member extends React.Component{
  render(){
    const {login} = this.props
    return(
      <div id="wrapper">
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    login : state.login
  }
}

export default connect(mapStateToProps)(Member);
