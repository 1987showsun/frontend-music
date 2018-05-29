import React            from 'react';
import { connect }      from "react-redux";
import {Link}           from 'react-router';
import $                from 'jquery';

//redux action
import { albumListAction }  from "../../actions/albumListAction";
import { areaAction }       from '../../actions/areaAction';

//Component
import BlockList   from '../module/listBlock';
import ColumnList  from '../module/listColumn';
import Footer      from '../common/Footer.js';

//public
import '../../public/stylesheets/index.scss';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props) =>{
  return {
    area        : state.area,
    nowpage     : state.allpage,
    albumList   : state.albumList
  };
})

export default class Album extends React.Component{

  constructor(){
    super();
    this.state = {
      area          : [],
      params        : '',
      search        : '',
      albumList     : [],
      items         : [],
      fuckSwitch    : 'true',
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
      params    : (nextProps.params.paramName!=undefined)? nextProps.params.paramName : 'Chinese',
      albumList : nextProps.albumList.albumsListData,
      items     : nextProps.albumList.albumsListData
    })
  }

  handleChange(e){
    var updatedList = this.state.albumList;
    updatedList = updatedList.filter(function(item){
      return (item.music_name_cn.toLowerCase().search( e.target.value.toLowerCase() ) !== -1)
    });
    this.setState({
      [e.target.name] : e.target.value,
      items : updatedList,
    })
  }

  areaNav(){
    let pathname = this.props.nowpage.pathname;
    if(this.state.area!=undefined){
      const render = this.state.area.map((item,i)=>{
        return(
          <li key={i} className={(this.state.params==item.path)? 'active':''}>
            <Link to={"/"+pathname+"/"+item.path}>{item.english}</Link>
          </li>
        )
      })
      return render;
    }
  }

  selectRenderCompoent(){
    if( this.props.nowpage!='top100Songs' ){
      return(
        <BlockList data={this.state.items} model="model1" arrangement="Block" type="album" direction=""/>
      );
    }else{
      return null;
    }
    //<ColumnList />
  }

  render(){
    return(
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
            {this.selectRenderCompoent()}
            <Footer />
          </article>
        </article>
      </main>
    );

  }

  componentDidUpdate(prevProps, prevState) {
    let nowpage = this.props.nowpage.pathname;

    if( prevProps.nowpage.pathname!=nowpage ){
      this.props.dispatch( albumListAction(this.state.params,nowpage) );
    }else{
      if(this.state.fuckSwitch){
        this.props.dispatch( albumListAction(this.state.params,nowpage) );
        this.setState({
          fuckSwitch : false,
        })
      }
    }

    if(this.state.params!=prevState.params){
      this.props.dispatch( albumListAction(this.state.params,nowpage) );
    }else{
      if(this.state.fuckSwitch){
        this.props.dispatch( albumListAction(this.state.params,nowpage) );
        this.setState({
          fuckSwitch : false,
        })
      }
    }
  }
}
