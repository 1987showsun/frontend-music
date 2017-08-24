import React from 'react';

import $mainBanner from '../../public/javascripts/mainBanner.js';

export default class MainBanner extends React.Component{

  constructor(){
    super();
    this.state = {
      data : []
    }
  }
  componentDidMount() {
    $mainBanner();
  }

  render(){
    const data = this.props.data['data'] || [];
    const showData = data.map((item,i)=>{
      return (
        <li>
          <img src={item.file} alt={item.title} title={item.title} />
        </li>
      )
    })
    return (
      <div className="block sliderAction" id="mainBanner">
        <div className="in">
          <ul>{showData}</ul>
        </div>
      </div>
    );
  }
}
