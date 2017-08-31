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
      search : '',
      info   : [],
    }
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  showMainNavData(){
    console.log(this.props.params);
    const navData       = mainNavArray || [];
    const showNavData   = navData.map((item,i)=>{
      var active = '';
      if( item.path==this.props.params.paramName ){
        active = 'active';
      }
      return(
        <li className={active}><Link to={'/info/'+item.path} key={i}>{item.english}</Link></li>
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

  handleChange(e){

  }
  handleSubmit(e){

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      info : nextProps.info.data[0]
    })
  }

  memberStatus(){
    const token     = JSON.parse(sessionStorage.getItem('login'))|| '';
    if( token=='' ){
      return(
        <div className="member">
          <Link to="/member/login">LOGIN</Link>
          <span></span>
          <Link to="/member/join">JOIN</Link>
        </div>
      )
    }else{
      if(this.props.info!=''){
        return(
          <div className="member">
            <div className="signInOk img">
              <img src={this.props.info.data[0].headShot} alt="" title=""/>
            </div>
            <div className="signInOk text">
              <span className="name">
                <Link to="/m-info">{this.props.info.data[0].name}</Link>
              </span>
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
          <input type="search" name="search" value={this.state.search} onChange={this.handleChange.bind(this)} placeholder="search all" />
          <button type="search" className="search" onClick={this.handleSubmit.bind(this)}></button>
        </div>
        <div className="navBlock notPadding">
          <ul className="navbar-nav">
            {this.showMainNavData()}
          </ul>
        </div>
        <div className="navBlock">
          { this.memberStatus() }
        </div>
        <div className="navBlock notPadding">
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
