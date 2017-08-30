import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class MemberInfo extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      memberInfo : [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.memberInfo!=undefined){
      this.setState({
        memberInfo : nextProps.memberInfo.data.data
      })
    }
  }

  setContent(){
    const {memberInfo} = this.props;
    if( memberInfo.data!='' ){
      return(
        <div className="top">
          <div className="headShot">
            <img src={memberInfo.data.data[0].headShot} alt="" title=""/>
          </div>
          <div className="info">
            <ul className="list Column model1 style1">
              <li>
                <ul>
                  <li className="infoTitle">Member ID</li>
                  <li className="infoContent">{memberInfo.data.data[0]._id}</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="infoTitle">Member Status</li>
                  <li className="infoContent">{memberInfo.data.data[0].status}</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="infoTitle">Username</li>
                  <li className="infoContent">{memberInfo.data.data[0].username}</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="infoTitle">Name</li>
                  <li className="infoContent">{memberInfo.data.data[0].name}</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="infoTitle">Tel</li>
                  <li className="infoContent">{memberInfo.data.data[0].tel}</li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="infoTitle">Address</li>
                  <li className="infoContent">{memberInfo.data.data[0].address}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }

  render(){
    console.log(this.state.memberInfo);
    const {memberInfo} = this.props;
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
    memberInfo : state.login
  }
}

export default connect(mapStateToProps)(MemberInfo);
