import React            from 'react';
import { connect }      from "react-redux";

//redux action
import { songsListAction }  from "../../actions/songsListAction";

//Component
import ColumnList from '../module/listColumn';

@connect((store) =>{
  return {
    songsList  : store.songsList.data
  };
})


export default class Songs extends React.Component{

  componentDidMount() {
    this.props.dispatch( songsListAction(this.props));
  }

  render(){
    const {songsList} = this.props;
    return(
      <div className="content left">
        <ColumnList data={songsList} tdNumber='4' type='songsList'/>
      </div>
    );
  }
}
