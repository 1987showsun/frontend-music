import React from 'react';
import { connect }      from 'react-redux';

//redux action
import { playlistAction, selectListenAction }  from "../../actions/playListAction";

@connect((store) =>{
  return {
    playList  : store.playList.data
  };
})

export default class ColumnList extends React.Component{

  selectSongs(id){
    this.props.dispatch( playlistAction(id) );
  }

  selectListen(item){
    this.props.dispatch( selectListenAction(item) );
  }

  render(){
    const data = this.props.data['data'] || [];
    var showData;
    switch(this.props.tdNumber){
      case '3':
        showData = data.map((item,i)=>{
          return(
            <li>
              <ul ref={item._id} key={item._id}>
                <li className="nu">{i+1}</li>
                <li className="name" onClick={this.selectListen.bind(this,item)}>{item.name}</li>
                <li className="time">{item.time}</li>
              </ul>
            </li>
          );
        });
        break;

      case '4':
        showData = data.map((item,i)=>{
          return(
            <li>
              <ul ref={item._id} key={item._id} onClick={this.selectSongs.bind(this,item._id)}>
                <li className="nu">{i+1}</li>
                <li className="name">{item.name}</li>
                <li className="time">{item.time}</li>
                <li className="action"></li>
              </ul>
            </li>
          );
        });
        break;
    }

    return(
      <ul className={"list Column model1 style1 "+this.props.type}>
        {showData}
      </ul>
    )
  }
}
