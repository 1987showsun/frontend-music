import React            from 'react';
import { connect }      from 'react-redux';
import $                from 'jquery';
import { Link }         from 'react-router';

import $mainBanner    from '../../public/javascripts/mainBanner.js';

@connect((store) => {
  return {
  };
})

class MainBanner extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data : [],
      settings1 : {
        centerMode     : true,
        dots           : true,
        infinite       : true,
        autoplay       : true,
        speed          : 500,
        slidesToShow   : 1,
        slidesToScroll : 1
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    $mainBanner();
  }

  hrefReturn(item){
    let _sort = item.sort,
        _type = item.type,
        _href = '';

    switch(_sort){
      case 'albums':
        _href = '/'+_sort+'/'+_type+'/'+item.correspondId;
        break;

      case 'news'  :
        _href = '/'+_sort+'/'+_type+'/'+item.correspondId;
        break;
    }
    return _href;
  }

  render(){
    const showData = this.props.data.map((item,i)=>{
      return (
        <li key={i}>
          <Link to={this.hrefReturn(item)}>
            <img src={item.file} alt={item.title} title={item.title} />
          </Link>
        </li>
      )
    })

    return (
      <div className="sliderAction" id="mainBanner">
        <div className="in">
          <ul>{showData}</ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
  }
}

export default connect(mapStateToProps)(MainBanner);
