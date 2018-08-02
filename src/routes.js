// File - src/routes.js

import React from 'react';
import { Route, Switch } from 'react-router';
 
// Module root components
import Home from './index';
import Show from './member';

export default (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/show" component={Show}></Route>
  </Switch>
);