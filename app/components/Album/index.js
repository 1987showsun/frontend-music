import React            from 'react';
import { connect }      from "react-redux";

//redux action
import { albumListAction }  from "../../actions/albumListAction";

//Component
import BlockList  from '../module/listBlock';

//public
import '../../public/stylesheets/index.scss';

@connect((store) =>{
  return {
    albumList  : store.albumList.data
  };
})

export default class Album extends React.Component{

  constructor(){
    super();
    this.state = {
      params : '',
      search : ''
    }
  }

  componentDidMount(){
    this.props.dispatch( albumListAction(this.props) );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      params : nextProps.params.paramName,
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name] : this.target.value
    })
  }

  render(){
    const {albumList} = this.props;
    return(
      <div className="content left">
        <div className="in">
          <div className="pageHeader">
            <div className="pageTitle">Popular Albums</div>
            <div className="search">
              <input type="search" value="" onChange={this.handleChange.bind(this)} placeholder="search album name"/>
              <button type="search" onClick=""></button>
            </div>
          </div>
          <BlockList data={albumList}/>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.params!=prevProps.params.paramName){
      this.props.dispatch( albumListAction(this.props) );
    }
  }
}
