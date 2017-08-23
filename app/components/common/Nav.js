import React from 'react';
import {Link} from 'react-router';

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

export default class Nav extends React.Component{
  render(){
    const navData = mainNavArray || [];
    const showData = navData.map((item,i)=>{
      return(
        <li><Link to={'/info/'+item.path} key={i}>{item.english}</Link></li>
      )
    })
    return(
      <nav>
        <div className="logo">
          <Link to="/">MUZICER</Link>
        </div>
        <div className="mainNav">
          <ul className="navbar-nav">
            {showData}
          </ul>
        </div>
      </nav>
    );
  }
}
