import React      from 'react';
import {Link}     from 'react-router';
import {connect}  from 'react-redux';
import $          from 'jquery';

import {collectionAction} from '../../actions/collectionAction';

//Component
import ColumnList3 from '../module/listColumn3';
import ColumnList4 from '../module/listColumn4';
import BlockList  from '../module/listBlock';

const theme = ['albumCollection','songsCollection','playRecord'];

@connect((store) => {
  return {
    collection  : store.collection.data,
  };
})

class Collection extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      id            : '',
      params        : '',
      callSwitch    : false,
      data          : []
    }
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

    var _params = (nextProps.params.theme!=undefined)? nextProps.params.theme : theme[0],
        _id     = nextProps.memberInfo.data.data[0]._id;

    this.setState({
      id         : _id,
      data       : (nextProps.collection.data!=undefined)? nextProps.collection.data : [],
      params     : _params,
    })
  }

  componentDidMount() {
    this.setState({
      params : theme[0]
    })
  }

  render(){
    if( this.state.params==theme[0] ){
      return (
        <div className="bottom">
          <BlockList data={this.state.data}/>
        </div>
      )
    }else{
      return (
        <div className="bottom">
          <ColumnList4 data={this.state.data} tdNumber="4" type="songsList"/>
        </div>
      )
    }
  }

  componentDidUpdate(prevProps, prevState) {

    //選單錨點
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
