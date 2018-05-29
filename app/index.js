import React,{Component}  from 'react';
import ReactDOM           from 'react-dom';
import {Provider}         from 'react-redux';
import store              from "./store";
import { Router, Route, IndexRoute, browserHistory,hashHistory } from 'react-router';

//Compoent
import Layout       from './components/common/Layout';
import Home         from './components/Home/index';
import Album        from './components/Album/index';
import SongsIndex   from './components/songs/index';
import Songs        from './components/Album/songs';
import About        from './components/About';
import Contacts     from './components/Contacts';
import Member       from './components/member/index';
import Signin       from './components/member/signIn';
import Signup       from './components/member/signUp';
import Profile      from './components/member/profile';
import Collection   from './components/member/collection';
import ArtistsIndex from './components/artists/index';
import ArtistsList  from './components/artists/artistsList';
import BlockList    from './components/module/listBlock';
import ColumnList   from './components/module/listColumn';
import Privacy      from './components/member/privacy';
import Chat         from './components/chat';

export default class Routers extends React.Component{
  render(){
    return(
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="about" component={About} />

          <Route path="contacts" component={Contacts} />

          <Route path="chat" component={Chat} />

          <Route path="albums" component={Album} >
            <IndexRoute component={Album} />
            <Route path=":paramName" component={BlockList} />
          </Route>
          <Route path="albums/:paramName/:id" component={Songs} />
          <Route path="albums/:paramName/:id/:videoId" component={Songs} />

          <Route path="top50" component={Album} >
            <IndexRoute component={Album} />
            <Route path=":paramName" component={BlockList} />
          </Route>
          <Route path="top50/:paramName/:id" component={Songs} />

          <Route path="top100Songs" component={SongsIndex} >
            <IndexRoute component={SongsIndex} />
            <Route path=":paramName" component={ColumnList} />
          </Route>

          <Route path="user" component={Profile}>
            <IndexRoute component={Collection} />
            <Route path=":theme" component={Collection}>
              <Route path=":playListSort" component={Collection}/>
            </Route>
          </Route>

          <Route path="/artists" component={ArtistsIndex}>
            <IndexRoute component={ArtistsList} />
            <Route path=":area" component={ArtistsList}>
              <Route path=":id" component={ArtistsList}/>
            </Route>
          </Route>

          <Route path="/privacy" component={Privacy}/>
        </Route>

        <Route path="member" component={Member}>
          <Route path="-signin" component={Signin}/>
          <Route path="-signup" component={Signup}/>
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
