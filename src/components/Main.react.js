import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home.react';
import Roles from '../pages/Roles.react';
import Role from '../pages/Role.react';
import Politician from '../pages/Politician.react';

export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deviceType: this.getDeviceType(),
    };

    this.changeDevice = this.changeDevice.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.changeDevice);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeDevice);
  }

  getDeviceType() {
    if (window.innerWidth >= 768) {
      console.log('Desktop')
      return  'desktop';
    }

    return 'mobile';
  }

  changeDevice() {
    const deviceType = this.getDeviceType();
    this.setState({deviceType});
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (<Home deviceType={this.state.deviceType}/>)}></Route>
        <Route exact path='/competencias' render={() => (<Roles deviceType={this.state.deviceType}/>)}></Route>
        <Route exact path='/competencias/:id' render={(d) => (<Role id={d.match.params.id} deviceType={this.state.deviceType}/>)}></Route>
        <Route exact path='/politicos/:id' render={(d) => (<Politician id={d.match.params.id} deviceType={this.state.deviceType}/>)}></Route>
      </Switch>
    );
  }

}
