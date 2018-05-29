import React,{Compoent} from 'react';
import {connect}        from 'react-redux';
import {Link}           from 'react-router';
import $                from 'jquery';

//redux action
import { areaAction }       from '../../actions/areaAction';
import { albumListAction }  from "../../actions/albumListAction";
import { getTop100Songs }   from '../../actions/songsListAction';

//Component
import BlockList   from '../module/listBlock';
import ColumnList  from '../module/listColumn';
import Footer      from '../common/Footer.js';

//javascripts
import {scrollmove} from '../../public/javascripts/share.js';

@connect((store) =>{
  return {
  };
})

class Songs extends React.Component{

  constructor(props){
    super(props);
    this.state={
      area          : [],
      data          : [],
      items         : [],
      pathname      : '',
      params        : '',
      firstRunSwitch: true,
    }
  }

  componentDidMount(){
    this.props.dispatch( areaAction() );
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      area      : nextProps.area.data,
      pathname  : nextProps.nowpage.pathname,
      params    : nextProps.params.paramName==undefined? '' : nextProps.params.paramName,
      data      : nextProps.songsList.top100Songs,
      items     : nextProps.songsList.top100Songs,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    let nowpage = this.props.nowpage.pathname,
        path    = this.state.params;

    if( this.state.params=='' && this.state.area!='' ){
      this.setState({
        params : this.state.area[0].path
      })
    }

    if( path!='' ){
      if( this.state.firstRunSwitch ){
        this.props.dispatch( getTop100Songs( path ) );
        this.setState({
          firstRunSwitch : false,
        })
      }
    }
  }

  handleChange(e){
    //搜尋
    let keyName = '';
    let nowpage = this.props.nowpage.pathname;
    switch( nowpage ){
      case 'top100Songs':
        keyName = 'name';
        break;

      default:
        keyName = 'music_name_cn';
        break;
    }

    var updatedList = this.state.data;
    updatedList = updatedList.filter(function(item){
      return (item[keyName].toLowerCase().search( e.target.value.toLowerCase() ) !== -1)
    });

    this.setState({
      [e.target.name] : e.target.value,
      items           : updatedList,
    })
  }

  getData(path){
    let nowpage = this.props.nowpage.pathname;
    this.props.dispatch( getTop100Songs( path ) );
  }

  areaNav(){
    const render = this.state.area.map((item,i)=>{
      return(
        <li key={i} className={(this.state.params==item.path)? 'active':''}>
          <Link to={`/${this.state.pathname}/${item.path}`} onClick={this.getData.bind(this,item.path)}>{item.english}</Link>
        </li>
      )
    })
    return render;
  }

  returnSelectComponent(){
    return(
      <ColumnList data={this.state.items} tdNumber='4' type='songsList'/>
    );
  }

  render(){
    return (
      <main className="content left">
        <article className="scrollbar-outer">
          <article className="in">
            <nav className="sitemap">
              <ul>
                {this.areaNav()}
              </ul>
            </nav>
            <div className="tool">
              <div className="sitemap">
                <Link to="/">Home</Link>
                <span className="nextNull">&#62;</span>
                <span>Popular Albums：<span className="nowSet">{this.state.params}</span></span>
              </div>
              <div className="search">
                <input type="search" name="search" value={this.state.search} onChange={this.handleChange.bind(this)} placeholder="search album name"/>
                <button type="search" onClick=""></button>
              </div>
            </div>
            <article className="block">
              {this.returnSelectComponent()}
            </article>
            <Footer />
          </article>
        </article>
      </main>
    );
  }
}

function mapStateToProps(state){
  return{
    nowpage     : state.nowpage,
    area        : state.area,
    nowpage     : state.allpage,
    songsList   : state.songsList,
    albumList   : state.albumList
  }
}

export default connect(mapStateToProps)(Songs);
