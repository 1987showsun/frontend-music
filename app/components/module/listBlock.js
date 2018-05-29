import React      from 'react';
import {Link}     from 'react-router';
import list       from '../../public/javascripts/list.js';

export default class BlockList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data : [],
    }
  }

  componentDidMount(){
    list();
  }

  componentDidUpdate(prevProps, prevState) {
    list();
  }

  returnView(){
    if(this.props.data!=undefined){
      switch( this.props.arrangement ){
        case 'Block' :
          let imgSrc,name,vicName,link;
          const renderArray = this.props.data.map((item,i)=>{
            if( this.props.type=='album' ){
              link    = `/albums/${item.type}/${item._id}`;
              imgSrc  = item.albumsImg;
              name    = item.music_name_cn;
              vicName = item.artists;
            }else if( this.props.type=='artists' ){
              link    = `/artists/${item.area}/${item._id}`;
              imgSrc  = item.profile;
              name    = item.name_cn;
            }

            return(
              <li key={item._id}>
                <figure>
                  <Link to={link}>
                    <img src={imgSrc}></img>
                    <figcaption>
                      <h2>{name}</h2>
                      <h3>{vicName}</h3>
                    </figcaption>
                  </Link>
                </figure>
              </li>
            )
          })

          return renderArray;
          break;

        case 'Column' :
          const renderArray2 = this.props.data.map((item,i)=>{
            return (
              <li key={i}>
                <figure>
                  <Link to={'/albums/'+item.type+'/'+item._id}>
                    <section className="nu">{ (i.lenght>1)? i : '0'+(i+1) }</section>
                    <img src={item.albumsImg}/>
                    <figcaption>
                      <h2>{item.music_name_cn}</h2>
                      <h3>{item.artists}</h3>
                    </figcaption>
                  </Link>
                </figure>
              </li>
            );
          });
          return renderArray2;
          break;
      }
    }
  }

  render(){

    return (
      <ul className={`list ${this.props.model} ${this.props.arrangement} ${this.props.type} ${this.props.direction}`} data-Model="model1">
        {this.returnView()}
      </ul>
    );
  }
}
