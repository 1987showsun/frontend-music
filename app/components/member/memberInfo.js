import React      from 'react';
import {connect}  from 'react-redux';
import {Link,browserHistory}     from 'react-router';

class MemberInfo extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      login : [],
    }
  }

  componentDidMount() {
    const {login} = this.props;
    if( login.data.data!=undefined ){
      this.setState({
        login : login.data.data[0]
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('123');
    this.setState({
      login : nextProps.login.data.data[0]
    })
  }

  setContent(){
    return(
      <div className="top">
        <div className="headShot">
          <img src={this.state.login.headShot} alt="" title=""/>
        </div>
        <div className="info">
          <ul className="list Column model1 style1">
            <li>
              <ul>
                <li className="infoTitle">Member ID</li>
                <li className="infoContent">{this.state.login._id}</li>
              </ul>
            </li>
            <li>
              <ul>
                <li className="infoTitle">Member Status</li>
                <li className="infoContent">{this.state.login.status}</li>
              </ul>
            </li>
            <li>
              <ul>
                <li className="infoTitle">Username</li>
                <li className="infoContent">{this.state.login.username}</li>
              </ul>
            </li>
            <li>
              <ul>
                <li className="infoTitle">Name</li>
                <li className="infoContent">{this.state.login.name}</li>
              </ul>
            </li>
            <li>
              <ul>
                <li className="infoTitle">Tel</li>
                <li className="infoContent">{this.state.login.tel}</li>
              </ul>
            </li>
            <li>
              <ul>
                <li className="infoTitle">Address</li>
                <li className="infoContent">{this.state.login.address}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  render(){
    const loginStatus = JSON.parse(sessionStorage.getItem('login')) || false;
    if( !loginStatus ){
      browserHistory.push('/');
    }

    return(
      <div className="content left">
        <div className="member">
          {this.setContent()}
          <div className="bottom">
            <div className="top">
              <ul id="navigation">
                <li>
                  <Link to="/m-info/albumCollection">Album Collection</Link>
                </li>
                <li>
                  <Link to="/m-info/songsCollection">Songs Collection</Link>
                </li>
                <li>
                  <Link to="/m-info/playRecord">Play Record</Link>
                </li>
              </ul>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    login : state.login
  }
}

export default connect(mapStateToProps)(MemberInfo);
