import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $          from 'jquery';

//component
import Footer     from '../common/Footer.js';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

export default class About extends React.Component{
  render(){
    return(
      <main className="content left">
        <article className="scrollbar-outer">
          <article className="in">
            <div className="pageHeader">
              <div className="pageTitle">About GINITUNE</div>
            </div>
            <article className="block">
              <div id="about" className="content">
                <p>GINITUNE, Asia's leading music streaming service, was established in 2017 by a group of Taiwanese software programmers with a shared passion for technology and music. With the support from more than 500 international major and local independent music labels, GINITUNE features 40 million legal tracks, including the most comprehensive Asia-Pop music library, and is currently available in Taiwan.</p>
                <p>The expansion to TAIWAN in 2017 has resulted in steadily increasing subscriptions. Recognizing this success, Japanese telecom giant KDDI Group acquired a majority share of GINITUNE’s outstanding stocks in December, Singapore’s sovereign wealth fund. With its advanced product technology, strategic vision and strong local partnerships, GINITUNE is aggressively expanding into international markets.</p>
              </div>
            </article>
            <Footer />
          </article>
        </article>
      </main>
    )
  }

  componentDidMount(){
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }
}
