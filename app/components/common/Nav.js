import React      from 'react';
import {Link}     from 'react-router';
import {connect}  from 'react-redux';

//reducer
import {loginProtectedAction} from '../../actions/loginAction';

const mainNavArray = [
  {
    "path" : "Chinese",
    "traditional"   : "華語",
    "simplified"    : "华语",
    "english"       : "Chinese"
    },
  {
    "path" : "Cantonese",
    "traditional"   : "粵語",
    "simplified"    : "粵语",
    "english"       : "Cantonese"
    },
  {
    "path" : "Western",
    "traditional"   : "西洋",
    "simplified"    : "西洋",
    "english"       : "Western"
    },
  {
    "path" : "Japanese",
    "traditional"   : "日語",
    "simplified"    : "日语",
    "english"       : "Japanese"
    },
  {
    "path" : "Korean",
    "traditional"   : "韓語",
    "simplified"    : "韩语",
    "english"       : "Korean"
    }
]

const vicNavArray = [
  {
    "path" : "Chinese",
    "traditional"   : "關於MUZIC BOX",
    "simplified"    : "関於MUZIC BOX",
    "english"       : "About MUZIC BOX"
    }
]

@connect((store) =>{
  return {
    info  : store.login.data
  };
})

class Nav extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      search : ''
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  handleSubmit(){
    //this.props.dispatch( loginAction(this.state) );
  }

  showMainNavData(){
    const navData   = mainNavArray || [];

    const showNavData  = navData.map((item,i)=>{
      return(
        <li><Link to={'/info/'+item.path} key={i}>{item.english}</Link></li>
      )
    })
    return showNavData;
  }

  showVicData(){
    const vicNavData = vicNavArray || [];
    const showVicData  = vicNavData.map((item,i)=>{
      return(
        <li><Link to={'/info/'+item.path} key={i}>{item.english}</Link></li>
      )
    })
    return showVicData;
  }

  memberStatus(){
    const token     = JSON.parse(sessionStorage.getItem('login'))|| '';
    if( token=='' ){
      return(
        <div className="member">
          <Link to="/member/login">LOGIN</Link>
          <span></span>
          <Link to="/member/enter">JOIN</Link>
        </div>
      )
    }else{
      const {info}   = this.props;
      if(info!=''){
        return(
          <div className="member">
            <div className="signInOk img"><img src={info.data[0].headShot} alt="" title=""/></div>
            <div className="signInOk text">
              <span className="name">
                <Link to="/m-info">{info.data[0].name}</Link>
              </span>
              <span className="level">{info.data[0].level}</span>
            </div>
          </div>
        )
      }
    }
  }

  componentDidMount(){
    const authorization = JSON.parse(sessionStorage.getItem('login')) || '';
    if( authorization!='' ){
      const token = authorization.token;
      this.props.dispatch( loginProtectedAction(token) );
    }
  }

  render(){
    return(
      <nav>
        <div className="logo">
          <Link to="/">MUZIC BOX</Link>
        </div>
        <div className="navBlock">
          <input type="search" name="search" value={this.state.search} onChange={this.handleChange.bind(this)} placeholder="search all"/>
          <button type="search" className="search" onClick={this.handleSubmit.bind(this)}></button>
        </div>
        <div className="navBlock">
          <ul className="navbar-nav">
            {this.showMainNavData()}
          </ul>
        </div>
        { this.memberStatus() }
        <div className="navBlock">
          <ul className="navbar-nav">
            {this.showVicData()}
          </ul>
        </div>
      </nav>
    );
  }
}


function mapStateToProps(state){
  return{
    info : state.login.info
  }
}

export default connect(mapStateToProps)(Nav);
