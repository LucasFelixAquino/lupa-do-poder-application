import React, {Component} from 'react';
import SearchBar  from './SearchBar.react';

import { ReactComponent as LogoIcon } from '../static/svgs/white-logo-icon.svg';
import { ReactComponent as LogoText } from '../static/svgs/white-logo-text.svg';
import { ReactComponent as HamburgerMenu } from '../static/svgs/hamburger-menu.svg';

import { Link } from "react-router-dom";


export default class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      deviceType: this.getDeviceType(),
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.deactivateMenu = this.deactivateMenu.bind(this);
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
      return  'desktop';
    }

    return 'mobile';
  }

  changeDevice() {
    const deviceType = this.getDeviceType();
    this.setState({deviceType});
  }

  toggleMenu() {
    const active = this.state.active;
    this.setState({
      active: !active,
    })
  }

  deactivateMenu() {
    this.setState({
      active: false,
    })
  }

  render() {
    return (
      <header className="navbar">


        <button className="nav-btn-mobile" onClick={this.toggleMenu}>
          <HamburgerMenu className="hamburger-menu" />
        </button>


        <div className="logo">
          <button onClick={this.deactivateMenu}>
            <Link to='/'>
              <LogoIcon className="white-logo-icon" />
              <LogoText className="white-logo-text" />
            </Link>
          </button>
        </div>

        <nav className={"nav" + (this.state.active ? ' active' : '')}>
          <ul className="menu">
            {this.state.deviceType === 'mobile' && (
              <li className="searchbar"><SearchBar deactivateMenu={this.deactivateMenu} /></li>
            )}
            <li><button onClick={this.deactivateMenu}><Link to='/competencias'>Competências</Link></button></li>
            <li><button onClick={this.deactivateMenu}><Link to='/sobre'>Sobre</Link></button></li>
          </ul>

          {this.state.deviceType === 'desktop' && (
            <SearchBar deactivateMenu={this.deactivateMenu}  />
          )}

        </nav>



      </header>
    );
  }
}
