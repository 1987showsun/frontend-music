import React,{Component}  from 'react';
import {connect}          from 'react-redux';
import {Link}             from 'react-router';

//reducer
import {selectViceNav}    from '../../actions/navAction';

//component

@connect((store)=>{
  return{

  }
})

class ViceNav extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectViceAction : '',
      profile          : [],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectViceAction : nextProps.nav.selectVal,
      profile          : (nextProps.profile!=undefined)? nextProps.profile : [],
    })
  }

  action(selectVal){
    let selectViceAction = '';
    if( this.state.selectViceAction!=selectVal ){
      selectViceAction = selectVal;
    }else{
      selectViceAction = '';
    }
    this.props.dispatch( selectViceNav(selectViceAction) );
  }

  returnCss(status){
    if(this.props.nav.selectVal==status){
      return true;
    }
  }

  member(){
    if( this.state.profile!=undefined && this.state.profile!='' ){
      let profileHeadShot = '';
      if( this.state.profile[0].headShot!='' && this.state.profile[0].headShot!=undefined){
        profileHeadShot = this.state.profile[0].headShot;
      }else{
        profileHeadShot = 'public/images/icon/viceuser.svg';
      }
      return(
        <Link to="/user/" onClick={this.action.bind(this,'')}>
          <img src={profileHeadShot} className="memberImg"/>
        </Link>
      )
    }else{
      return(
        <Link to="/member/-signin" onClick={this.action.bind(this,'')}>
          <img src="public/images/icon/user.svg" />
          Member
        </Link>
      );
    }
  }

  render(){
    return(
      <nav className="vice">
        <ul className="">
          <li>
            <Link to="/" className="home" onClick={this.action.bind(this,'')}>
              <img src="public/images/icon/home.svg" />
              Home
            </Link>
          </li>
          <li className={this.returnCss('nav')}>
            <span onClick={this.action.bind(this,"nav")}>
              <img src="public/images/icon/menu.svg" />
              Nav
            </span>
          </li>
          <li className={this.returnCss('player')}>
            <span onClick={this.action.bind(this,"player")}>
              <img src="public/images/icon/music.svg" />
              Audio
            </span>
          </li>
          <li className={this.returnCss('playlist')}>
            <span onClick={this.action.bind(this,"playlist")}>
              <img src="public/images/icon/list.svg" />
              Playlist
            </span>
          </li>
          <li className={ this.state.profile!=''? 'memberLi' : '' }>
            {this.member()}
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return{
    nav       : state.nav,
    profile   : state.login.profile.data,
    login     : state.login
  }
}

export default connect(mapStateToProps)(ViceNav);
