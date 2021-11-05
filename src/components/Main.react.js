import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home.react';
import Roles from '../pages/Roles.react';
import Role from '../pages/Role.react';
import Politician from '../pages/Politician.react';

export default class Main extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (<Home />)}></Route>
        <Route exact path='/competencias' render={() => (<Roles />)}></Route>
        <Route exact path='/competencias/:id' render={(d) => (<Role id={d.match.params.id} />)}></Route>
        <Route exact path='/politicos/:id' render={(d) => (<Politician key={d.match.params.id} id={d.match.params.id} />)}></Route>
      </Switch>
    );
  }

}
