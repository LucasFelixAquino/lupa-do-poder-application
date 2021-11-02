import React, {Component} from 'react';
import { ReactComponent as LogoIcon } from '../static/svgs/white-logo-icon.svg';
import { ReactComponent as LogoText } from '../static/svgs/white-logo-text.svg';
import { ReactComponent as HamburgerMenu } from '../static/svgs/hamburger-menu.svg';

import { Link } from "react-router-dom";


export default class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.deactiveMenu = this.deactiveMenu.bind(this);
  }

  toggleMenu() {
    const active = this.state.active;
    this.setState({
      active: !active,
    })
  }

  deactiveMenu() {
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
          <button onClick={this.deactiveMenu}>
            <Link to='/'>
              <LogoIcon className="white-logo-icon" />
              <LogoText className="white-logo-text" />
            </Link>
          </button>
        </div>
        <nav className={"nav" + (this.state.active ? ' active' : '')}>
          <ul className="menu">
            <li><button onClick={this.deactiveMenu}><Link to='/competencias'>Competências</Link></button></li>
            <li><button onClick={this.deactiveMenu}><Link to='/sobre'>Sobre</Link></button></li>
          </ul>
        </nav>
      </header>
    );
  }
}
