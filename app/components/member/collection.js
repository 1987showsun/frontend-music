import React      from 'react';
import {Link}     from 'react-router';
import {connect}  from 'react-redux';
import $          from 'jquery';

import {collectionAction} from '../../actions/collectionAction';

//Component
import ColumnList from '../module/listColumn';
import BlockList  from '../module/listBlock';

const theme = ['albumCollection','songsCollection','playRecord'];

@connect((store) => {
  return {
    collection  : store.collection.data,
  };
})

class Collection extends React.Component{

  getInitialState() {
    return {
      params        : '',
      collection    : [],
      data          : [],
    };
  }

  dispatchAction(_params,_id){
    this.props.dispatch( collectionAction( _params,_id ) );
  }

  theme(){

    const _render         = '';
    const {memberInfo}    = this.props;
    const _params         = this.props.params.theme || theme[0];

    if(memberInfo.data!=''){
      const _id           = memberInfo.data.data[0]._id;
      this.dispatchAction( _params,_id );
    }
  }

  componentWillReceiveProps(nextProps) {
    const _data  = nextProps.collection.data || [];
    this.setState({
      collection : nextProps.collection,
      data       : _data,
      params     : nextProps.params,
    })
  }

  componentDidMount() {
    this.theme();
  }

  render(){
    if( this.props.collection!='' ){
      if( this.props.params.theme==theme[0] ){
        return (
          <div className="bottom">
            <BlockList data={this.props.collection}/>
          </div>
        )
      }else{
        return (
          <div className="bottom">
            <ColumnList data={this.props.collection} tdNumber="4" type="songsList"/>
          </div>
        )
      }
    }else{
      return (null);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.collection == prevProps.collection ){
      this.theme();
    }
    $('#navigation').find('>li').removeClass('active');
    if( prevProps.params==this.state.params ){
      theme.map((item,i)=>{
        if( item==this.state.params.theme ){
          $('#navigation').find('>li').eq(i).addClass('active');
        }
      })
    }
  }
}

//取 Store 值
function mapStateToProps(state){
  return{
    memberInfo : state.login
  }
}

export default connect(mapStateToProps)(Collection);
