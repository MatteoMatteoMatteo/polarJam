import React from 'react';
import { Switch, useLocation, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../Auth/PrivateRoute/PrivateRoute';

//pages
import S1 from '../AllSongs/S1';
import S2 from '../AllSongs/S2';
import Beats from '../AllSongs/Beats';
import Jam from '../Jam/Jam';
import Signup from './../Auth/Signup/Signup';
import Login from './../Auth/Login/Login';
import UserProfile from './../UserProfile/UserProfile';
import Browse from './../Browse/Browse';

const { v4: uuidV4 } = require('uuid');

const Pages = (props) => {
  const location = useLocation();
  var room = uuidV4();

  return (
    <Switch location={location} key={location.pathname}>
      <Redirect exact from='/' to={`/jam/?${room}`} />
      {/* <Redirect exact from='/' to={`/songs/genre1`} /> */}
      {/* <Route path={`/beats`} component={Beats} /> */}
      <Route path='/jam' component={Jam} />
      {/* <Route exact path="/lobby" component={Lobby} /> */}
      {/* <Route path='/songs/genre1' component={S1} />
      <Route path='/songs/genre2' component={S2} /> */}
      {/* <Route exact path="/song2" component={S2} />
      <Route exact path="/song3" component={S3} /> */}
      {/* <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/browse' component={Browse} />
      <PrivateRoute exact path='/profile' component={UserProfile} /> */}
    </Switch>
  );
};
export default Pages;
