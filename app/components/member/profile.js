import React                      from 'react';
import {connect}                  from 'react-redux';
import {Link,browserHistory}      from 'react-router';
import $                          from 'jquery';

import Sort                       from './sort';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props)=>{
  return{
    login : state.login.profile
  }
})

export default class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      profile       : [],
    }
  }

  componentDidMount() {
    if(this.props.login.data!=undefined){
      this.setState({
        profile : this.props.login.data[0],
      })
    }
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile : nextProps.login.data[0],
    })
  }

  headShot(){
    if( this.state.profile.headShot!=''&& this.state.profile.headShot!=undefined ){
      return (
        <article className="headShot">
          <img src={this.state.profile.headShot} alt="headShot" title=""/>
        </article>
      );
    }else{
      return (
        <article className="headShot notHeadShot">
          <img src="../../public/images/icon/user.svg" alt="headShot" title=""/>
        </article>
      );
    }
  }

  setContent(){
    return(
      <article className="top">
        {this.headShot()}
        <section className="info">
          <ul className="list Column model1 style1">
            <li className="username">
              <ul>
                <li className="infoTitle">Username</li>
                <li className="infoContent">{this.state.profile.username}</li>
              </ul>
            </li>
            <li className="name">
              <ul>
                <li className="infoTitle">Name</li>
                <li className="infoContent">{this.state.profile.name}</li>
              </ul>
            </li>
            <li className="tel">
              <ul>
                <li className="infoTitle">Tel</li>
                <li className="infoContent">{this.state.profile.tel}</li>
              </ul>
            </li>
            <li className="address">
              <ul>
                <li className="infoTitle">Address</li>
                <li className="infoContent">{this.state.profile.address}</li>
              </ul>
            </li>
          </ul>
        </section>
      </article>
    )
  }

  vicNav(vicParams){
    const params = this.props.params.theme || 'albumCollection';
    if( vicParams==params ){
      return 'active';
    }
  }

  render(){
    const loginStatus = JSON.parse(sessionStorage.getItem('login')) || false;
    if( !loginStatus ){
      browserHistory.push('/');
    }

    return(
      <main className="content left">
        <article className="scrollbar-outer">
          <article className="member">
            {this.setContent()}
            <article className="bottom">
              <article className="top">
                <ul id="navigation">
                  <li className={this.vicNav('albumCollection')}>
                    <Link to="/user/albumCollection" >Album Collection</Link>
                  </li>
                  <li className={this.vicNav('songsCollection')}>
                    <Link to="/user/songsCollection" >Songs Collection</Link>
                  </li>
                  <li className={this.vicNav('playRecord')}>
                    <Link to="/user/playRecord" >Play Record</Link>
                  </li>
                  <li className={this.vicNav('playList')}>
                    <Link to="/user/playList" >PlayList</Link>
                  </li>
                </ul>
              </article>
              {this.props.children}
            </article>
          </article>
        </article>
        <Sort playListSort={this.props.params.playListSort} pathname={this.props.location.pathname}/>
      </main>
    );
  }
}
