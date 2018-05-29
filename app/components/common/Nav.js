import React      from 'react';
import {Link}     from 'react-router';
import {connect}  from 'react-redux';
import $          from 'jquery';

//reducer
import {loginProtectedAction} from '../../actions/loginAction';
import { getPlaylistSortList,openPlaylistSortNote }             from '../../actions/collectionAction';
import {selectViceNav}    from '../../actions/navAction';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

const mainNavArray = [
  {
    "path" : "albums",
    "traditional"   : "熱門專輯",
    "simplified"    : "热门专辑",
    "english"       : "Popular Albums"
    },
  {
    "path" : "top50",
    "traditional"   : "50大排行最佳專輯",
    "simplified"    : "50大排行最佳專輯",
    "english"       : "Top 50 Albums"
    },
  {
    "path" : "top100Songs",
    "traditional"   : "100大排行最佳歌曲",
    "simplified"    : "100大排行最佳歌曲",
    "english"       : "Top 100 Songs"
    },
  {
    "path" : "artists",
    "traditional"   : "藝人",
    "simplified"    : "蓺人",
    "english"       : "Artists"
    }
]

const vicNavArray = [
  {
    "path" : "about",
    "traditional"   : "關於GINI TUNE",
    "simplified"    : "関於GINI TUNE",
    "english"       : "About GINI TUNE"
    }
]

@connect((store) =>{
  return {
    profile     : store.login.profile,
    collection  : store.collection
  };
})

class Nav extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      search      : '',
      profile     : [],
      collection  : [],
      playListSort: [],
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  showMainNavData(){
    const navData       = mainNavArray || [];
    const showNavData   = navData.map((item,i)=>{
      return(
        <li className={(this.props.nowPage==item.path)? 'active' : '' } key={i}><Link to={'/'+item.path} onClick={this.ddd.bind(this)}>{item.english}</Link></li>
      )
    })
    return showNavData;
  }

  showVicData(){
    const vicNavData = vicNavArray || [];
    const showVicData  = vicNavData.map((item,i)=>{
      return(
        <li key={i}><Link to={item.path} onClick={this.ddd.bind(this)}>{item.english}</Link></li>
      )
    })
    return showVicData;
  }

  signOut(){
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('playlist');
    window.location.href = '/';
  }

  handleChange(e){

  }
  handleSubmit(e){

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile      : ( nextProps.profile.data!=undefined )?nextProps.profile.data[0] : [],
      playListSort : (nextProps.collection.playListSort.data!=undefined)? nextProps.collection.playListSort.data:[]
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const token     = JSON.parse(sessionStorage.getItem('login'))|| '';
    if( token!='' ){
      if(prevState.profile!=this.state.profile){
        if( this.state.profile._id!=undefined ){
          const sort = this.props.params.playListSort || '';
          this.props.dispatch( getPlaylistSortList(this.state.profile._id,sort) )
        }
      }
    }
  }

  member(){
      let profileHeadShot = '';
      if( this.props.profile.data[0].headShot!='' && this.props.profile.data[0].headShot!=undefined){
        profileHeadShot = this.props.profile.data[0].headShot;
      }else{
        profileHeadShot = 'public/images/icon/viceuser.svg';
      }
      return(
        <div className="signInOk img">
          <img src={profileHeadShot} className="memberImg"/>
        </div>
      )
  }

  memberStatus(){
    const token     = JSON.parse(sessionStorage.getItem('login'))|| '';
    if( token=='' ){
      return(
        <div className="member">
          <Link to="/member/-signin">SignIn</Link>
          <span></span>
          <Link to="/member/-signup">SignUp</Link>
        </div>
      )
    }else{
      if(this.props.profile!=''){
        return(
          <div className="member">
            {this.member()}
            <div className="signInOk text">
              <span className="name">
                <Link to="/user/">{this.props.profile.data[0].name}</Link>
              </span>
            </div>
            <div className="tool">
              <button className="switch" title="sign out" onClick={this.signOut.bind(this)}></button>
            </div>
          </div>
        )
      }
    }
  }

  addPlaylistSort(status,noteType,beforeName){
    this.props.dispatch( openPlaylistSortNote(status,noteType,beforeName) );
  }

  componentDidMount(){
    const authorization = JSON.parse(sessionStorage.getItem('login')) || '';
    if( authorization!='' ){
      const token = authorization.token;
      this.props.dispatch( loginProtectedAction(token) );
    }
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  ddd(){
    this.props.dispatch( selectViceNav(''));
  }

  playlist(){
    const token     = JSON.parse(sessionStorage.getItem('login'))|| '';
    if( token=='' ){
      return null
    }else{
      let songsId = '';
      return(
        <article className="navBlock">
          <section className="title">
            <span className="text">PLAYLISTS</span>
            <div className="add" onClick={this.addPlaylistSort.bind(this,true,"add","",songsId)}></div>
          </section>
          <ul className="playListSort">
            {
              this.state.playListSort.map((item,i)=>{
                return (<li key={i}><Link to={"/user/playList/"+item.name} onClick={this.ddd.bind(this)}>{item.name}</Link></li>);
              })
            }
          </ul>
        </article>
      )
    }
  }

  sss(){
    if(this.props.nav.selectVal=='nav'){
      return true;
    }
    return '';
  }

  render(){
    return(
      <nav className={"main "+this.sss()}>
        <article className="scrollbar-outer">
          <article className="in">
            <header className="logo">
              <Link to="/" onClick={this.ddd.bind(this)}>
                <img src="../public/images/icon/logo.png"/>
              </Link>
            </header>
            <article className="navBlock">
              <input type="search" name="search" value={this.state.search} onChange={this.handleChange.bind(this)} placeholder="search all" />
              <button type="search" className="search" onClick={this.handleSubmit.bind(this)}></button>
            </article>
            <article className="navBlock notPadding">
              <ul className="navbar-nav">
                {this.showMainNavData()}
              </ul>
            </article>
            <article className="navBlock memberSign">
              { this.memberStatus() }
            </article>
            <article className="navBlock notPadding">
              <ul className="navbar-nav">
                {this.showVicData()}
              </ul>
            </article>
            {this.playlist()}
          </article>
        </article>
      </nav>
    );
  }
}


function mapStateToProps(state){
  return{
    profile     : state.login.profile,
    collection  : state.collection,
    nav         : state.nav
  }
}

export default connect(mapStateToProps)(Nav);
