import React, {Component} from 'react';

import { Link } from "react-router-dom";


export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <nav className="footer-nav">
          <ul>
            <li><Link to='/competencias'>Competências</Link></li>
            <li><Link to='/sobre'>Sobre</Link></li>
          </ul>
        </nav>

        <div className="footer-copyright">
          <span>© 2021 Lupa do Poder.</span>
          <span>Todos os direitos reservados.</span>
        </div>
      </footer>
    );
  }
}
