import React from 'react';

import $mainBanner from '../../public/javascripts/mainBanner.js';

export default class MainBanner extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data : []
    }
  }
  componentDidMount() {
    $mainBanner();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data : nextProps.data
    })
  }

  render(){
    const showData = this.state.data.map((item,i)=>{
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
