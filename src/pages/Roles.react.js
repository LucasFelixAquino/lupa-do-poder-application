import React, {Component} from 'react';
import { Link } from "react-router-dom";
import RoleCard from '../components/RoleCard.react';

import api from "../services/api";

export default class Roles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      roles: [
        {id: 10, name: 'Presidente', branch: 'Executivo'},
        {id: 13, name: 'Ministro', branch: 'Executivo'},
        {id: 11, name: 'Governador', branch: 'Executivo'},
        {id: 12, name: 'Prefeito', branch: 'Executivo'},
        {id: 20, name: 'Senador', branch: 'Legislativo'},
        {id: 21, name: 'Deputado Federal', branch: 'Legislativo'},
        {id: 21, name: 'Deputado Estadual', branch: 'Legislativo'},
        {id: 22, name: 'Vereador', branch: 'Legislativo'},
      ],
    }
  }

  getRoles() {
      api.get("/roles")
        .then((res) => this.setState({
          roles: res.data,
        }))
        .catch((err) => {
          console.error("Couldn't get roles. " + err);
        });

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getRoles();
  }

  render() {
    return (
      <div className="main-wrapper roles-block">
        <h1 className="roles-title">Escolha o <span className="yellow">cargo político</span>.</h1>
          <div className="role-cards-wrapper">
            {this.state.roles.map((d, i) => (
              <RoleCard key={d.id} position={i} {...d}/>
            ))}
          </div>
      </div>
    );
  }
}
