import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory,hashHistory } from 'react-router';
import {Provider} from 'react-redux';
import store    from "./store";

import Layout   from './components/common/Layout';
import Home     from './components/Home';
import Album    from './components/Album/index';
import Songs    from './components/Album/songs';
import About    from './components/About';
import User     from './components/User';
import Contacts from './components/Contacts';
import Member   from './components/member'
import LoginPage    from './components/member/login';

export default class Routers extends React.Component{
  render(){
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="info(/:paramName)" component={Album}/>
          <Route path="about" component={About} />
          <Route path="user" component={User} />
          <Route path="contacts" component={Contacts} />
          <Route path="album/:id" component={Songs} />
        </Route>
        <Route path="member" component={Member}>
          <Route path="login" component={LoginPage} />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Routers store={store}/>
  </Provider>,
  document.getElementById('app'));
