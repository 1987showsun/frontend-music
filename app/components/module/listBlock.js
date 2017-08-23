import React from 'react';
import {Link} from 'react-router';


export default class BlockList extends React.Component{
  render(){
    const data = this.props.data['data'] || [];
    const renderArray = data.map((item,i)=>{
      return(
        <li ref={item._id} key={item._id}>
          <figure>
            <Link to={'/album/'+item._id}>
              <img src={item.albumsImg}></img>
              <figcaption>
                <h2>{item.music_name_cn}</h2>
                <h3>{item.artists}</h3>
              </figcaption>
            </Link>
          </figure>
        </li>
      )
    })

    return(
      <ul className="list Block model1 style1" data-Model="model1">{renderArray}</ul>
    )
  }
}
