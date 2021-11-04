import React, {Component} from 'react';
import { Link } from "react-router-dom";
import RoleCard from '../components/RoleCard.react';

import api from "../services/api";

export default class Roles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      roles: [],
    }
  }

  getRolesData() {
      api.get(`roles`)
          .then((res) => {
            this.setState({
              roles: res.data.map(d => ({id: d.id, name: d.name, branch: d.branch}))
                .sort(function(a, b) {

                  if (a.branch < b.branch) return -1;
                  if (a.branch > b.branch) return 1;
                  return 0;
                })
            });
          })
        .catch((err) => {
          console.error("Couldn't get roles. " + err);
        });

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getRolesData();
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
