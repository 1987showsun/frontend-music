import React,{Component} from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component{
  render(){
    return(
      <footer>
        <article>
          <ul>
            <li><Link to="/about">About GINITUNE</Link></li>
            <li><Link to="">Terms of Policy</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="">Contact</Link></li>
          </ul>
        </article>
        <article className="copyright">Copyrigth © 2017 GINITUNE, LLC</article>
      </footer>
    );
  }
}
