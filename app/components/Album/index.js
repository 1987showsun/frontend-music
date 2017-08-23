import React from 'react';
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

  render(){
    const {albumList} = this.props;
    return(
      <div className="content left">
        <BlockList data={albumList}/>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.params!=prevProps.params.paramName){
      this.props.dispatch( albumListAction(this.props) );
    }
  }
}
